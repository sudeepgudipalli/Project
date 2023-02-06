const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt');
const User = require('./Schema/user');
const Info = require('./Schema/research');
const app = express();

const token_expire = 1*24*60*60;
const createToken=(id,admin)=>{return jwt.sign({id,admin},'Welcome to URA',{expiresIn:token_expire});}

const mongoURL = "mongodb+srv://sudeep:sudeep@cluster0.8mykldi.mongodb.net/test";

mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Database Connected')).catch(e=>console.log(e));

app.listen(3001,()=>{console.log("Server Started")});

app.use(cors({origin:["http://localhost:3000"],methods:["GET","POST"],credentials:true}))

app.use(cookie());
app.use(express.json());

// Sign Up
app.post('/signup',async (req,res)=>{
        const handleError=(err)=>{
            let errors = {email:"",name:"",pass:""};
            if(err.name === "ValidationError"){
                Object.keys(err.errors).forEach((key) => {
                    errors[key] = err.errors[key].message;
                  });
            }
            if(err.code === 11000){
                errors.email = "Email is already Registered.";
            }
            return errors;
        }
        try{
            const user = await User.create(req.body);
            const token = createToken(user._id,user.admin);
            res.cookie("jwt",token,{
                withCredentials:true,
                httpOnly:false,
                maxAge: token_expire*1000
            });
            res.status(201).json({user:user._id,status:"Registered"});
        }catch(err){
            console.log(err);
            const errors = handleError(err);
            res.json({errors,created:false});
        }
});

//Log In
app.post('/login',async (req,res)=>{
    const errors = {email:"",pass:""};
    let {email,pass} = req.body;
    User.findOne({'email':email},async(err,user)=>{
        if(user){
            const checkPassword = await bcrypt.compare(pass,user.pass);
            if(checkPassword){
                const token  = createToken(user._id,user.admin);
                res.cookie("jwt",token,{
                    withCredentials:true,
                    httpOnly:false,
                    maxAge:token_expire*1000
                })
                res.status(200).json({status:"Login"});
            }
            else{
                if(pass === "") errors.pass = "Password is Required";
                else errors.pass = "Incorrect Password";
                res.status(200).json(errors);
            }
        }   
        else{
            if(email==="") errors.email = "Email is Required";
            else errors.email = "Email is not registered";
            res.status(200).json(errors);
        }
    })
});

//Table Search and all...
app.post('/getinfo',async(req,res)=>{
    const {name,tag,state,uni_name} = req.body;
    const data = await Info.find({'name':{$regex:name,$options:"i"},
        'tag':{$regex:tag,$options:"i"},
        'state':{$regex:state,$options:"i"},
        'uni_name':{$regex:uni_name,$options:"i"}
    });
    res.json(data);
});

//Getting Specific Research Info (Link from Table)
app.post('/research',async(req,res)=>{
    const data = await Info.findOne({_id:req.body._id})
    res.json(data);
})