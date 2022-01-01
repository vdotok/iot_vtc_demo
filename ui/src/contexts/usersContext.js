/* eslint-disable */

import React , {createContext , useState , useEffect} from 'react';
import {constants} from '../constants/constants';
import { connect } from 'react-redux';
import fetchData from '../fetchdata';
export const UserContext = createContext();

var FData = new fetchData();
const  UserContextProvider = (props) => {
    console.log("user context props" , props);
    const [client , setInstanceClient] = useState({});
    const [noGPS , setNoGPS] = useState(false);
    const [isloading , setIsLoading] = useState(true);
    const [connectState, setConnectSate] = useState(false);
    const [groups , setGroups ] = useState([]);
    const [alreadySubscribed] = useState([]);
    useEffect(() => {
      console.log("this is connect state", connectState, props, client)
      if (!connectState) {
        socketConnection();
      }
    }, [connectState , props.groups]);
    const setTopics = () => {
      let ob = props.newreducer.newobj;
      props.groups.forEach((g) => {
        ob[g.channel_name] = []
      });
      props.dispatch({ type: 'newdispatch', groupsobj: {...ob} });
    }
    const  IsJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const Set_IOTMessage = (response) => {
      var payload = new TextDecoder().decode(response.payload);
      console.log('this is in iot function-->',response.topic,'msg--->',payload);
      // let msg;
      // if(IsJsonString(response)){
      //   msg = JSON.parse(response);
      // }else{
      //   msg = response;
      // }
      // console.log("**this is msg" , response,currTopic );
      //console.log("array count" , arr.length);
      let newobjj = props.newreducer.newobj;
      if(response.topic == constants.btn1_channel_name ){
        var status;
        if(payload == 1){
          status = true;
        }
        else{
          status = false;
        }
        props.dispatch({type: 'switch1' , payload: status });

      }
      else if( response.topic == constants.btn2_channel_name){
        var status;
        if(payload == 1){
          status = true;
        }
        else{
          status = false;
        }
        props.dispatch({type: 'switch2' , payload: status });
      }
      else if(response.topic == constants.btn3_channel_name ){
        var status;
        if(payload == 1){
          status = true;
        }
        else{
          status = false;
        }
        props.dispatch({type: 'switch3' , payload: status });
      }
      else if(response.topic == constants.btn4_channel_name){
        var status;
        if(payload == 1){
          status = true;
        }
        else{
          status = false;
        }
        props.dispatch({type: 'switch4' , payload: status });
      }
      else if(response.topic == constants.gps_channel_name){
        let arr = [...newobjj[response.topic]];  
        console.log('**this is new payload-->',payload);
        let lat = payload.split(',')[0];
        let long = payload.split(',')[1];
        console.log('**thisskjusuuuuuuuuuuuuuuoad-->',lat , long);
        
        if(lat == 0.000000  && long == 0.000000){
          //setNoGPS(true);
          let obj =  {};
          obj['lat'] = 31.5160;
          obj['lng'] = 74.3305;
            if(arr.length >= 10){
              arr.splice(0, 1);
              arr.push(obj);
            }
            else{
              arr.push(obj);
            } 
            newobjj[response.topic]=[...arr];
          }


        else{
          setNoGPS(false);
          console.log('g p s ');
          let obj =  {};
          obj['lat'] = parseFloat(lat);
          obj['lng'] = parseFloat(long);
            if(arr.length >= 10){
              arr.splice(0, 1);
              arr.push(obj);
            }
            else{
              arr.push(obj);
            } 
            newobjj[response.topic]=[...arr];
        }
      }
      else if(response.topic == constants.tmp_channel_name){
        var d = new Date();var h = d.getHours();var m = d.getMinutes();
        h>12 ? h = h-12 : h
        m<10 ? m = "0"+m : m;
        let msgtime = h+":"+m;
        let timearray = props.newreducer.myarr;
        if(timearray.length >= 8){
          timearray.splice(0, 2);
          timearray.push(msgtime);
        }
        else{
          timearray.push(msgtime);
        } 
        props.dispatch({type: 'timearray' , timesarray: timearray });

        let arr = [...newobjj[response.topic]];  
        console.log('**this is new payload-->',payload);
          if(arr.length >= 8){
            arr.splice(0, 1);
            arr.push(parseInt(payload));
          }
          else{
            arr.push(parseInt(payload));
          } 
          newobjj[response.topic]=[...arr]
        }
        else{
          var d = new Date(); 
          var h = d.getHours(); 
          var m = d.getMinutes();
          console.log('**this is new array-->' , "timeewwwwwww" , h,m);
          if(h > 12) {
            h = h-12;
          }
          m<10 ? m = "0"+m : m;
          let msgtime = h+":"+m;
          console.log("msg time " , msgtime);
          let hum_array = props.newreducer.humarr;
          if(hum_array.length >= 8){
            hum_array.splice(0, 1);
            hum_array.push(msgtime);
          }
          else{
            hum_array.push(msgtime);
          } 
          props.dispatch({type: 'humarray' , humtimearray: hum_array })
  
  
  
          let arr = [...newobjj[response.topic]];  
          console.log('**this is new payload-->',payload);
            if(arr.length >= 8){
              arr.splice(0, 1);
              arr.push(parseInt(payload));
            }
            else{
              arr.push(parseInt(payload));
            } 
            newobjj[response.topic]=[...arr]
          }
          console.log('**this is updated object-->',newobjj);
          props.dispatch({type: 'newdispatch' , groupsobj: {...newobjj} })
        }
    const socketConnection = async () => {
      console.log("socket conection called");
      var connectCount = 0;
      let url = window.location.protocol === 'https:' ? "wss://"+props.user_data.messaging_server_map.host  : "ws://"+props.user_data.messaging_server_map.host;
      let port = window.location.protocol === 'https:' ? "443" : "8080";
      let connectionData = {
        "host": url,
        "port": port,
        "auth_token": props.user_data.auth_token,
        "credentials": { username: props.user_data.ref_id, password: props.user_data.authorization_token },
        "clientId": props.user_data.user_id,
        "reConnectivity": true,
        "projectID": "170JRJUI",
        "secret": ""
      }
      console.log("auth tokenn", props.user_data.authorization_token);
      var Client = new MVDOTOK.Client(connectionData);
      setInstanceClient(Client);
      Client.Authentication(props.user_data);
      await Client.Register(props.user_data.ref_id.toString(), props.user_data.authorization_token.toString());
      setTopics();
  
      Client.on("authenticated", async (response) => {
        // props.dispatch({type:"RoomMessages",RoomMessages:message});
        // Client.SendMessage(message); 
        console.log("911 in authentication ")
        await Client.Register(props.user_data.ref_id.toString(), props.user_data.authorization_token.toString());
  
      });
      Client.on("connect", (response) => {
        connectCount = connectCount + 1;
        console.log("this is count", connectCount);
        if (connectCount == 1) {
          props.groups.forEach((element) => {
            console.log("already sub" , alreadySubscribed);
            if(alreadySubscribed.indexOf(element.channel_key) === -1)
            {
              console.log("these are all groups", element.channel_name);
              let tempData = {
                "key": element.channel_key,
                "channel": element.channel_name
              }
              alreadySubscribed.push(element.channel_key);
              Client.Subscribe(tempData)
            }
            else
            {
              console.log('You have already subscribed to : ', element.channel_key);
              //setIsLoading(false)
            }

  
          });
        }
        setConnectSate(true);
  
      });
  
      Client.on("disconnect", (response) => {
        //on disconnecting 
        console.log("on disconnect");
        //    setConnectSate(false)  
        connectCount = 0
  
      });
  
      Client.on("subscribed", (response) => {
        console.log("on subscribed");
        setIsLoading(false)
      });


      Client.on("messagesent", (response) => {
        console.log("message sent", response, message);
      })
  
  
      Client.on("online", (response) => {
        //when someone gets online 
        console.log("on online"); 
      });
  
      Client.on("offline", (response) => {
        //on someone gets offline 
        console.log("on offline");
  
      });
  
      Client.on("message", (response) => {
          console.log("on message====>" , response);
          console.log("this is topic:", response.topic);

          // setCurrTopic(response.topic);
          var payload = new TextDecoder().decode(response.payload);
          console.log("this is payload:", payload)
        //sendReceipt(response);
        // Set_IOTMessage(payload,response.topic);


        Set_IOTMessage(response);
        // setCurrentMessage(response);
        // if(response.content && response.type != 'typing'){Set_Message(response);} 
        // if(response.type == 'typing'){ SetSubcriberMessage(response);}   
 
      });
  
      Client.on("create", (response) => {
        //on creating a channel 
        console.log("on create")
  
      });
  
  
    }
  
    const sendAPIMessage = (message) => {
      console.log("cccccccccvvv11111" , message );
  
      let messageOBJ = message.val.toString();
      console.log('before sending->', messageOBJ ,constants.btn1_channel_name,constants.btn1_channel_key )
      let btn1 = {
        topic: constants.btn1_channel_name,
        to: constants.btn1_channel_name,
        key: constants.btn1_channel_key,
        from: props.user_data.ref_id,
      };
      let btn2 ={
        topic: constants.btn2_channel_name,
        to: constants.btn2_channel_name,
        key: constants.btn2_channel_key,
        from: props.user_data.ref_id,
      }
      let btn3 = {
        topic: constants.btn3_channel_name,
        to: constants.btn3_channel_name,
        key: constants.btn3_channel_key,
        from: props.user_data.ref_id,
      };
      let btn4 ={
        topic: constants.btn4_channel_name,
        to: constants.btn4_channel_name,
        key: constants.btn4_channel_key,
        from: props.user_data.ref_id,
      }
      let hum = {
        topic: constants.hum_channel_name,
        to: constants.hum_channel_name,
        key: constants.hum_channel_key,
        from: props.user_data.ref_id,
      };
      let tmp ={
        topic: constants.tmp_channel_name,
        to: constants.tmp_channel_name,
        key: constants.tmp_channel_key,
        from: props.user_data.ref_id,
      }
      let gps = {
        topic: constants.gps_channel_name,
        to: constants.gps_channel_name,
        key: constants.gps_channel_key,
        from: props.user_data.ref_id,
      };
      console.log("clieeeeeeent", client);
      if(client.SendRawMessage){
        if(message.id == 'btn-a'){
          console.log("sending" , messageOBJ , btn1)
          client.SendRawMessage(messageOBJ , btn1);
        }
        else if(message.id == 'btn-b'){
          client.SendRawMessage(messageOBJ , btn2);
        }
        else if(message.id == 'btn-c'){
          client.SendRawMessage(messageOBJ , btn3);
        }
        else if(message.id == 'hum-i'){
          client.SendRawMessage(message.val , hum);
        }
        else if(message.id == 'gps-i'){
          client.SendRawMessage(message.val, gps);
        }
        else if(message.id == 'tmp-i') {
          client.SendRawMessage(message.val , tmp);
        }       
        else{
          client.SendRawMessage(messageOBJ , btn4);
        }
      }
  
    }
    return (
        <UserContext.Provider value={{isloading , sendAPIMessage , noGPS }} >
            {props.children}
        </UserContext.Provider>
    )
}
function map(state) {
    return state;
  }
export default connect(map)(UserContextProvider);