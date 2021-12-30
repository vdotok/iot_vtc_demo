import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import logo2 from '../../assets/images/logo2.png';
import fetchData  from  '../../fetchdata';
import '../styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var FData = new fetchData();
const notify = () => toast("Login Successfully!");

const Signin = (props) => {
    const [email, setEmail]                 = useState();
    const [password , setPassword]          = useState();
    const [msg , setMessage]                = useState();
    const history = useHistory();
    const handleSubmit  = (e) => {
        console.log("function called")
        var isValid = true;
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
            'password'                  : password
        };
        if(isValid === true){
          console.log(formData);
          FData.LoginData(formData).then(data => {
            
            if(data.status === 200){
                props.dispatch({type:"USER",userData:data});
                    notify();
                history.push('./dashboard')
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
        <>
        <ToastContainer />
        <div className="containerWrapper">
            <img src={logo2} alt="" className="logo" />
            <div className="innerWrapper">
            <h6 className="wrapperHeading">Sign In</h6>
            <div className="inputsContainer form-group">
            <span style={{display:"none"}} className="text-danger" id="message">{msg}</span> 
                <input onChange={e=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Your email" />
                <span style={{display:"none"}} className="text-danger" id="email_error">Please Enter Valid Email.!!</span> 
                <input
                onChange={e=>setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Create Password"
                />
                <span style={{display:"none"}} className="text-danger" id="password_error">Please Enter Password.!!</span> 
                {/* <input
                type="text"
                disabled="true"
                style={{opacity: "0"}}
                className="form-control"
                placeholder="Your name"
                /> */}
            </div>
            <div className="buttonsContainer">
                <button type="submit" className="btn signButton" onClick={e => {handleSubmit(e)}}>SIGN IN</button>
                <h5 className="bottomLink"><a href="./sign-up">SIGN UP</a></h5>
            </div>
            </div>
        </div>
        </>
    )
  }
  function map(state) {
    return state;
  }
  export default connect(map)(Signin);