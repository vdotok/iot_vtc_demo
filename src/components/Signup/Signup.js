import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import logo2 from '../../assets/images/logo2.png';
import fetchData  from  '../../fetchdata';
import '../styles.css';

var FData = new fetchData();
const Signup = (props) => {
    console.log("signup" , props.user_data);
    const [email, setEmail]                 = useState();
    const [name, setName]                   = useState();
    const [msg , setMessage]                = useState();
    const [password , setPassword]          = useState();
    const history = useHistory();
    const handleSubmit  = (e) => {
        console.log("function called")
        var isValid = true;
        if(!name){
          isValid = false;
          document.getElementById("username_error").style.display = "block";
        }
        else{
          document.getElementById("username_error").style.display = "none";
        }
        if(!password){
          isValid = false;
          document.getElementById("password_error").style.display = "block";
        }
        else{
          document.getElementById("password_error").style.display = "none";
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            isValid = false;
            document.getElementById("email_error").style.display = "block";
        }
        else{
            document.getElementById("email_error").style.display = "none";
        }
        var formData = {
            'email'                     : email,
            'username'                  : name,
            'password'                  : password
        };
        if(isValid === true){
          console.log(formData);
          FData.getUserData(formData).then(data => {
            if(data.status === 200){
                history.push('./sign-in');
            }
            else{
                setMessage(data.message);
                document.getElementById("message").style.display = "block";

            }
          })
    
        }
        e.preventDefault();
      }
    return (
    <div className="containerWrapper">
        <img src={logo2} alt="" className="logo" />
        <div className="innerWrapper">
          <h6 className="wrapperHeading">Sign Up to your account</h6>
          <div className="inputsContainer form-group">
            <span style={{display:"none"}} className="text-danger" id="message">{msg}</span> 
            <input onChange={e=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Your email" />
            <span style={{display:"none"}} className="text-danger" id="email_error">Please Enter Valid Email.!!</span> 
            <input onChange={e=>setName(e.target.value)} type="text" className="form-control" placeholder="Your name" />
            <span style={{display:"none"}} className="text-danger" id="username_error">Please Enter Name.!!</span> 
           <input
              type="password"
              onChange={e=>setPassword(e.target.value)}
              className="form-control"
              placeholder="Create Password"
            />
            <span style={{display:"none"}} className="text-danger" id="password_error">Please Enter Password.!!</span> 
          </div>
          <div className="buttonsContainer">
            <button type="submit" className="btn signButton" onClick={e => {handleSubmit(e)}}>SIGN UP</button>
            <h5 className="bottomLink"><a href="./sign-in">SIGN IN</a></h5>
          </div>
        </div>
      </div>
    )
  }
  function map(state) {
    return state;
  }
  export default connect(map)(Signup);