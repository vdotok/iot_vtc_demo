/* eslint-disable */
import React,{  useState , useContext } from 'react';
import './style.css';
import { UserContext } from '../../contexts/usersContext';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import settings from '../../assets/images/settings.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Header = (props) => {
  const { sendAPIMessage} = useContext(UserContext);
  const [temptimer , setTempTimer] = useState();
  const [humtimer , setHumTimer] = useState();
  const [locationtimer , setLocationTimer] = useState();
 
  const handleTemp = (e) => {
    setTempTimer(e.target.value);
  }
  const handleHum = (e) => {
    setHumTimer(e.target.value);
  }
  const handleLocation = (e) => {
    setLocationTimer(e.target.value);
  }
    const sendTempMessage = () => {
      let arr = 
        {
          id: 'tmp-i' , val: temptimer
        };
        sendAPIMessage(arr);
    }
    const sendHumidityMessage = () => {
      let arr =
        {
          id: 'hum-i' , val: humtimer
        };
        sendAPIMessage(arr);
    }
    const sendLocationMessage = () => {
      let arr = 
        {
          id: 'gps-i' , val: locationtimer
        };
        sendAPIMessage(arr);
    }
    return (
        <div className="row header">
            <img src={logo} alt="" className="logo" />
            <Popup trigger={<img src={settings} alt="" className="settingsLogo"/> } position="left top">
              <div style={{padding:"5px"}}>
                <h6>Temperature of each {temptimer} seconds</h6>
                {/* <select className="selectTimer" value={temptimer} onChange={e => handleTemp(e)}>
                  <option value="5">5s</option>
                  <option value="10">10s</option>
                  <option value="15">15s</option>
                  <option value="20">20s</option>
                </select> */}
                <p>Enter in seconds</p>
                <input className="form-input" value={temptimer} onChange={e=>handleTemp(e)} />
                <button style={{marginTop:"8px" , marginBottom:"5px"}} onClick={sendTempMessage} className="btn btn-success" >Submit</button>
              </div>
              <div style={{padding:"5px"}}>
                <h6>Humidity of each {humtimer} seconds</h6>
                {/* <select className="selectTimer" value={humtimer} onChange={e => handleHum(e)}>
                  <option value="5">5s</option>
                  <option value="10">10s</option>
                  <option value="15">15s</option>
                  <option value="20">20s</option>
                </select> */}
                 <p>Enter in seconds</p>
                <input className="form-input" value={humtimer} onChange={e=>handleHum(e)} />
                <button style={{marginTop:"8px" , marginBottom:"5px"}} onClick={sendHumidityMessage} className="btn btn-success" >Submit</button>
              </div>
              <div style={{padding:"5px"}}>
                <h6>Location of each {locationtimer} seconds</h6>
                {/* <select className="selectTimer" value={locationtimer} onChange={e => handleLocation(e)}>
                  <option value="5">5s</option>
                  <option value="10">10s</option>
                  <option value="15">15s</option>
                  <option value="20">20s</option>
                </select> */}
                 <p>Enter in seconds</p>
                <input className="form-input" value={locationtimer} onChange={e=>handleLocation(e)} />
                <button style={{marginTop:"8px" , marginBottom:"5px"}} onClick={sendLocationMessage} className="btn btn-success" >Submit</button>
              </div>
            </Popup>
        </div>
    )
  }
function map(state) {
    return state;
  }
  export default connect(map)(Header);
