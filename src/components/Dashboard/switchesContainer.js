/* eslint-disable */
import React,{ Component , useEffect, useState , useContext } from 'react';
import { UserContext } from '../../contexts/usersContext';
import Switch from "react-switch";
import loader from '../../assets/images/loader.gif';
import { connect } from 'react-redux';
import './style.css';
const SwitchesContainer = (props) => {
    const [switch1val , setSwitch1val ] = useState(props.newreducer.switch1);
    const [switch2val , setSwitch2val ] = useState(props.newreducer.switch2);
    const [switch3val , setSwitch3val ] = useState(props.newreducer.switch3);
    const [switch4val , setSwitch4val ] = useState(props.newreducer.switch3);
    const {sendAPIMessage , isloading} = useContext(UserContext);
    useEffect(() => {
     setSwitch1val(props.newreducer.switch1)
    }, [props.newreducer.switch1])
    useEffect(() => {
      setSwitch2val(props.newreducer.switch2)
     }, [props.newreducer.switch2])
     useEffect(() => {
      setSwitch3val(props.newreducer.switch3)
     }, [props.newreducer.switch3])
     useEffect(() => {
      setSwitch4val(props.newreducer.switch4)
     }, [props.newreducer.switch4])
    const setS1Val = () => {

      //props.dispatch({type: 'switch1' , payload: !props.newreducer.switch1 });
      let val = 0;
      if(props.newreducer.switch1 === false){
        val = 1;
      }
      else{
        val = 0;
      }
      var formData = {
        'id': 'btn-a',
        'val': val
      };
      sendAPIMessage(formData);
    }
    const setS2Val = () => {
      // setSwitch2val(!switch2val);
      //props.dispatch({type: 'switch2' , payload: !props.newreducer.switch2 });
      let val = 0;
      if(props.newreducer.switch2 === false){
        val = 1;
      }
      else{
        val = 0;
      }
      var formData = {
        'id': 'btn-b',
        'val': val
      };
      sendAPIMessage(formData);

    }
    const setS3Val = () => {
      // setSwitch3val(!switch3val);
      //props.dispatch({type: 'switch3' , payload: !props.newreducer.switch3 });
      let val = 0;
      if(props.newreducer.switch3 === false){
        val = 1;
      }
      else{
        val = 0;
      }
      var formData = {
        'id': 'btn-c',
        'val': val
      };
      sendAPIMessage(formData);

    }
    const setS4Val = () => {
      // setSwitch4val(!switch4val);
      //props.dispatch({type: 'switch4' , payload: !props.newreducer.switch4 });
      let val = 0;
      if(props.newreducer.switch4 === false){
        val = 1;
      }
      else{
        val = 0;
      }
      var formData = {
        'id': 'btn-d',
        'val': val
      };
      sendAPIMessage(formData);

    }
    return (
        <div className="row switches">
          <div className="controlcontainer">
            <div className="switchContainer">
            {isloading ? <img style={{width:"30px" , height:"30px" }} src={loader} alt="" /> :
            <Switch
              checked={switch1val}
              onChange={setS1Val}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            }

              {/* <input type="checkbox" value={switch1val}  onChange={setS1Val}  /> */}
              <p className="customSwitchLabel">LED 1</p>
            </div>
          </div>
          <div className="controlcontainer">
            <div className="switchContainer">
            {isloading ? <img style={{width:"30px" , height:"30px" }} src={loader} alt="" /> :
            <Switch  checked={switch2val} onChange={setS2Val}  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"/>}
              {/* <input type="checkbox" value={true}  onChange={setS2Val}/> */}
              <p className="customSwitchLabel">LED 2</p>
            </div>
          </div>
          <div className="controlcontainer">
            <div className="switchContainer">
            {isloading ? <img style={{width:"30px" , height:"30px" }} src={loader} alt="" /> :
            <Switch  checked={switch3val} onChange={setS3Val}  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"/>}

              {/* <input type="checkbox" value={switch3val}  onChange={setS3Val} /> */}
              <p className="customSwitchLabel">LED 3</p>
            </div>
          </div>
          <div className="controlcontainer">
            <div className="switchContainer">
            {isloading ? <img style={{width:"30px" , height:"30px" }} src={loader} alt="" /> :
            <Switch  checked={switch4val} onChange={setS4Val}  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"/>}

              {/* <input type="checkbox" value={switch4val}  onChange={setS4Val}  /> */}
              <p className="customSwitchLabel">LED 4</p>
            </div>
          </div>
        </div>
    )
  }
function map(state) {
  return state;
}
export default connect(map)(SwitchesContainer);