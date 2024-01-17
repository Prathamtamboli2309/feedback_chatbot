// Assuming lang.json is in the same directory as your HTML/JS file
const langFilePath = '/js/data.json';
var maindata;

fetch(langFilePath)
  .then(response => response.json())
  .then(data => {
    // Work with your data here
    maindata={...data}
    // console.log(maindata)
    firstBotMessage();    
  })
  .catch(error => {
    console.log('Error loading lang.json:', error);
  });




//generate random id
function randomid(length=10){
    return Math.random().toString(36).substring(2,length+2);
}

//button data array
var share;
var response;

function validcontact(phoneNumber){
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned phone number contains only digits
    if (/^\d+$/.test(cleanedPhoneNumber)) {
    // Check if it has a specific length (e.g., 10 digits)
        if (cleanedPhoneNumber.length === 10) {
        return true;
        } else {
        
        return true;
        }
    } else {
        return true;
    }
}
function validemail(email){
    var regex=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}
var summary_data={}
var lang="";

function getBotResponse(input) {

    var question=document.getElementById(`textbot${value}`).textContent;
    console.log(input)    
    var input2=input.toLowerCase();

    if (input2=="english" || input2=="hindi") {
        summary_data["id"]=randomid()
        summary_data["language"]=input2;     
        lang=input2;
        return [maindata.languages[lang]["report"],maindata.languages[lang]['questions'][0]];        

    }else if(input==maindata.languages[lang]['report'][0] || input==maindata.languages[lang]['report'][1]){

        summary_data["Report"]=input;
        // document.getElementById("textInput").disabled=true;
        return [maindata.languages[lang]['distict'],maindata.languages[lang]['questions'][1]];

    }else if(question==maindata.languages[lang]['questions'][1] && maindata.languages[lang]["distict"].includes(input)){
        
        summary_data["district"]=input;
        return [maindata.languages[lang]['subdistrict'][summary_data["district"]],maindata.languages[lang]['questions'][2]];
    
    } else if (question==maindata.languages[lang]['questions'][2] && input2!="") {
        
        summary_data["subdistrict"]=input;
       
        return [true,maindata.languages[lang]['questions'][3]]

    }else if (input2 != "" && question==maindata.languages[lang]['questions'][3]) {

        summary_data["name"]=input;
        return [true,maindata.languages[lang]['questions'][4]];

    }else if((input2 != "" && question==maindata.languages[lang]['questions'][4])||(input2 != "" && question==maindata.languages[lang]['questions'][5]) ){

        
        if(validcontact(input)){

           
            summary_data["Contact"]=input;
            return [true,maindata.languages[lang]['questions'][6]]
            
        }else{
            
            return [true,maindata.languages[lang]['questions'][5]]

        }
    }else if(input2!="" && question==maindata.languages[lang]['questions'][6] || (input2 != "" && question==maindata.languages[lang]['questions'][5])){

            summary_data["Residental_Address"]=input;
            return [maindata.languages[lang]["response"],maindata.languages[lang]['questions'][7]]
            
    }else if(input==maindata.languages[lang]["response"][0] && question==maindata.languages[lang]['questions'][7]){
        console.log(input)            
        return [true,maindata.languages[lang]['questions'][8]];
    }else if(input2!="" && question==maindata.languages[lang]['questions'][8]){
        if(validemail(input)){
            console.log("ho")
        summary_data["Email"]=input2;
        return [true,maindata.languages[lang]['questions'][9]]

        }else{

        return [true,maindata.languages[lang]['questions'][8]]

        }
    
    }else if(input==maindata.languages[lang]["response"][1] && question==maindata.languages[lang]['questions'][7]){
        
        return [true,maindata.languages[lang]['questions'][9]]

    
    }else if(summary_data["Report"]==maindata.languages[lang]["report"][0] && question==maindata.languages[lang]['questions'][9] && input2!=""){
        
        summary_data["description"]=input;
        
        senddatacomplaint(summary_data);     
        return [true,maindata.languages[lang]['questions'][11]];

    }else if(summary_data["Report"]==maindata.languages[lang]["report"][1] && question==maindata.languages[lang]['questions'][9] && input2!=""){
        
        summary_data["description"]=input;
        
        return [maindata.languages[lang]["Review"],maindata.languages[lang]['questions'][10]];

    }else if(question==maindata.languages[lang]['questions'][9] && input2!="" && summary_data["Report"]==maindata.languages[lang]["report"][0]){

        
        summary_data["description"]=input;
        // summary_data["Description"]=input;
        senddatacomplaint(summary_data);        
        console.log(summary_data)
        return [true,maindata.languages[lang]['questions'][11]]
    }else if(question==maindata.languages[lang]['questions'][10] && summary_data["Report"]==maindata.languages[lang]["report"][1]){

        
        // summary_data["Description"]=input;
        
        summary_data["Review"]=input
        console.log("hello i am at review")
        senddatareview(summary_data);
        return [true,maindata.languages[lang]['questions'][11]]
    }
    else{
    }
    
}

//alertbox function
function showCustomAlert() {
    document.getElementById("custom_alert").innerText=`Your data has been submitted! Your Post Id is "${summary_data["id"]}".Thank You`
    var customAlert = document.getElementById("custom-alert");
    customAlert.classList.add("show");
}

// Collapsible
var date;
console.log(date);
function getTime() {
    let today = new Date();
    console.log(today)
    summary_data["Feedback_Date"]=`"${today}"`;
    hours = today.getHours();
    minutes = today.getMinutes();
    console.log(today.getDate())

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}
let value=0;
// Gets the first message
function firstBotMessage() {
    let firstMessage = ""
    let today = new Date();
    date=today;
    if(today.getHours() <12 ){
        firstMessage="Good morning!"
    }else if(today.getHours()< 17){
        firstMessage="Good afternoon!"
    }else if(today.getHours()<24){
        firstMessage="Good Evening!"
    }
    
    document.getElementById("botStarterMessage").innerHTML = `<p class="botText" ><span id="textbot${value}">${firstMessage}<br>Please Select A language</span></p>`;
    
    var time=getTime()
    btn_select(["English","Hindi"])
    let chat=document.getElementById("chat-timestamp")
    chat.append(time);
}

// firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    
    let botResponse = getBotResponse(userText);
   
    if(botResponse[0]==true){
        value++;
        let botHtml = `<p class="botText"><span id="textbot${value}">` + botResponse[1] + '</span></p>';
        $("#chatbox").append(botHtml);

        // document.getElementsByClassName("chatbox").scrollIntoView;

       scroll();
    }else{
        value++;
        let botHtml = `<p class="botText"><span id="textbot${value}">` + botResponse[1] + '</span></p>';
        $("#chatbox").append(botHtml);

       scroll();
    
        btn_select(botResponse[0]);
    }
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);

   scroll();

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)
    
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);

   scroll();

    // Uncomment this if you want the bot to respond to this buttonSendText event
    setTimeout(() => {
        getHardResponse(sampleText);
    }, 1000)
}

function sendButton() {
    if($("#textInput").val()!=""){

        getResponse();
    }
}


$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        if($("#textInput").val()!=""){

            getResponse();
        }   
    }
});



function btn_select(data){
    let content=""
    //share data into button
    for(var i=0;i<data.length;i++){
        content+=`<button class="button_style" value="${data[i]}">${data[i]}</button>`
    }

    let button_menu=`<p class="userText" id="input_box"><span>${content}<span></p>`
    $("#chatbox").append(button_menu)


   scroll();
    
    //clicked and get vaule
    var btns=document.querySelectorAll(".button_style");
    
    btns.forEach((i)=> {
        i.addEventListener("click",async function(e){
            var textofbtn= e.target.value;
    
            displaydata(textofbtn)        
        })
    });
    
    
}

function displaydata(data){
    document.getElementById("input_box").remove()
    let textans=`<p class="userText"><span id="btn_ans">${data}<span></p>`
    $("#chatbox").append(textans)


   scroll();
   
    getHardResponse(data);   
}


function senddatacomplaint(summary_data){
    var url="http://localhost:3000/complaintpost";

    fetch(url,{
        method:"POST",
        headers:{
            "Accept":'application/json',
            'Content-Type':'application/json',

        },
        body:JSON.stringify({
            "id":summary_data["id"],
            "contact": summary_data["Contact"],
            "description": summary_data["description"],
            "district": summary_data["district"],
            "email": summary_data["Email"],
            "feedbackdate": summary_data["Feedback_Date"],
            "name": summary_data["name"],
            "subdistrict": summary_data["subdistrict"],
            "Residental_Address":summary_data["Residental_Address"],

           
        })
    })
    .then(response=>console.log("post") )
     showCustomAlert()
}

function senddatareview(summary_data){
    var url="http://localhost:3000/reviewpost";

    fetch(url,{
        method:"POST",
        headers:{
            "Accept":'application/json',
            'Content-Type':'application/json',

        },
        body:JSON.stringify({
            "id":summary_data["id"],
            "contact": summary_data["Contact"],
            "description": summary_data["Description"],
            "district": summary_data["district"],
            "email": summary_data["Email"],
            "feedbackdate": summary_data["Feedback_Date"],
            "name": summary_data["name"],
            
            "subdistrict": summary_data["subdistrict"],
            
            "Residental_Address":summary_data["Residental_Address"],
            "Review":summary_data["Review"]
           
        })
    })
    .then(response=>console.log("post") )
     showCustomAlert()

}

function scroll(){
    const chatbox=document.getElementById("chatbox");
    if(chatbox.scrollHeight >0){
        chatbox.scrollTop=chatbox.scrollHeight;
    }
}
