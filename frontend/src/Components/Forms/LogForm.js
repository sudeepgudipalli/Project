import React,{useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function LogForm(){
    const Navigate = useNavigate();
    const [log,setLog] = useState({
        email:"",
        pass:""
    });
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:3001/login',{...log},{withCredentials:true})
            if(data.email){
                document.getElementById('emailred').innerHTML = data.email;
            }
            if(data.pass){
                document.getElementById('passred').innerHTML = data.pass;
            }
            if(data.status === "Login"){
                Navigate('/dashboard');
            }
        }catch(err){
            console.log(err);
        }
    }
    return(
        <form className="logbox" onSubmit={(e)=>handleSubmit(e)}>
            <label>E-mail :</label>
            <input type="email" className="form-control" id="Username" placeholder="Enter E-mail..." onChange={(e)=>setLog({...log,email:e.target.value})}/>
            <p id="emailred" className="outred fs-6 fw-lighter"></p>
            <label>Password :</label>
            <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setLog({...log,pass:e.target.value})}/>
            <p id="passred" className="outred fs-6 fw-lighter"></p>
            <div className="acc">
                <p className="h6 fw-lighter">Don't have an Account?<Link className="h6 fw-lighter" to="/signup"> Sign Up</Link></p>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn log" type="submit">Log In</button>
            </div>
        </form>
    );
}