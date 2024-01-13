require('dotenv').config();
const express=require("express")
const mysql=require("mysql")
const path=require("path");
const app=express()
const json=require("json")
const cors=require("cors");
const corsOptions={
    origin:'*',
    Credential:true,
    optionSuccessStatus:200,
}

app.use(express.json())
app.use(cors(corsOptions))
const con=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
})

app.use(express.static("public"));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use(express.static(path.join(__dirname,'views')));
app.set('views','./views');
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.sendFile('/index.html');
});



con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected");
    }
})

app.post('/complaintpost',(req,res)=>{
    const id=req.body.id;
   
    const district=req.body.district;
    const subdistrict=req.body.subdistrict;
    const name=req.body.name;
    const email=req.body.email;
    const contact=req.body.contact;
    const description=req.body.description;
   
    const feedbackdate=req.body.feedbackdate;
    const Residental_Address=req.body.Residental_Address;
    
    con.query("insert into Feedback_Complaint values(?,?,?,?,?,?,?,?,?)",[id,district,subdistrict,name,email,contact,description,feedbackdate,Residental_Address],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("posted")
        }
    })
})

app.post('/reviewpost',(req,res)=>{
    const id=req.body.id;
    const district=req.body.district;
    const subdistrict=req.body.subdistrict;
    const name=req.body.name;
    const email=req.body.email;
    const contact=req.body.contact;
    const description=req.body.description;
    const feedbackdate=req.body.feedbackdate;
    const Residental_Address=req.body.Residental_Address;
    const Review=req.body.Review;

    con.query("insert into Feedback_review values(?,?,?,?,?,?,?,?,?,?)",[id,district,subdistrict,name,email,contact,description,Review,feedbackdate,Residental_Address],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("posted")
        }
    })
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("port 3000");
    }
})

