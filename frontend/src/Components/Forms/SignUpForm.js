import React, {useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignUpForm(){
  const Navigate = useNavigate();
  const [sign,setDetails] = useState({
    name:"",
    email:"",
    pass:"",
    followed_ids:[],
    admin:false
  });
  const generate = (err)=>{
    console.log(err);
    if(err === "Username is Required"){
      document.getElementById('userred').innerHTML = err;
    }
    else if(err === "Password is Required"){
      document.getElementById('passred').innerHTML = err;
    }
    else if(err ==="Email is Required"){
      document.getElementById('emailred').innerHTML = err;
    }
    else if(err === "Email is already Registered."){
      document.getElementById('emailred').innerHTML = "Email is Registered.";
    }
  }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    document.getElementById('userred').innerHTML ="";
    document.getElementById('emailred').innerHTML ="";
    document.getElementById('passred').innerHTML ="";
    try{
      const {data}= await axios.post("http://localhost:3001/signup",{...sign},{withCredentials:true});
      console.log(data);
      if(data){
        if(data.errors){
          const {email, pass, name} = data.errors;
          if(email) generate(email);
          if(pass) generate(pass);
          if(name) generate(name);
        }
      }
      if(data){
        if(data.status === "Registered"){
          Navigate('/dashboard');
        }
      }
    }catch(err){
      console.log(err);
    }
  }
 return(
    <form className="signbox" onSubmit={(e)=>handleSubmit(e)}>
        <label>Enter Email :</label>
        <input type="email" className="form-control" id="Email" placeholder="Enter E-mail..." onChange={(e)=>setDetails({...sign,email:e.target.value})}/>
        <p id="emailred" className="outred fs-6 fw-light m-0"></p>
        <label>Enter Username :</label>
        <input type="text" className="form-control" id="Username" placeholder="Enter Username..." onChange={(e)=>setDetails({...sign,name:e.target.value})}/>
        <p id="userred" className="outred fs-6 fw-light m-0"></p>
        <label>Enter Password :</label>
        <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setDetails({...sign,pass:e.target.value})}/>
        <p id="passred" className="outred fs-6 fw-light m-0"></p>
        <div className="acc pb-2">
            <Link className="h6 fw-lighter" to="/login">Already have an Account?</Link>
        </div>
        <div className="d-flex justify-content-end">
            <button className="sign fs-6" type="submit" >Sign Up</button>
        </div>
    </form>
    );
}
// export default class SignUpForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: "",
//       email: "",
//       pass: "",
//       followed_ids: [],
//       admin: false
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     const {user,email,pass,followed_ids,admin} = this.state;
//     fetch("http://localhost:3001/register", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         user,
//         email,
//         pass,
//         followed_ids,
//         admin
//       }),
//     })
//       .then((res) => res.json());
//   }
//   render() {
//     return (
//     <form className="signbox" onSubmit={this.handleSubmit}>
//         <label>Enter Email :</label>
//         <input type="email" className="form-control" id="Email" placeholder="Enter E-mail..." onChange={(e)=>this.setState({email:e.target.value})} autoComplete="off"/>
//         <label>Enter Username :</label>
//         <input type="text" className="form-control" id="Username" placeholder="Enter Username..." onChange={(e)=>this.setState({user:e.target.value})} autoComplete="off"/>
//         <label>Enter Password :</label>
//         <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>this.setState({pass:e.target.value})} autoComplete="off"/>
//         <p id="outred"></p>
//         <div className="acc pb-2">
//             <Link className="h6 fw-lighter pe-4" to="/login">Already have an Account?</Link>
//         </div>
//         <div className="d-flex justify-content-end">
//             <button className="sign fs-6" type="submit" >Sign Up</button>
//         </div>
//     </form>
//     );
//   }
// }