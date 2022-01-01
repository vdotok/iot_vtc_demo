/* eslint-disable */
import React,{  useEffect, useState , useContext } from 'react';
import './style.css';
import thr from '../../assets/images/thermometer.png';
import { UserContext } from '../../contexts/usersContext';
import loader from '../../assets/images/loader.gif';
import { connect } from 'react-redux';
import humidity from '../../assets/images/humidity.png';
import { constants } from '../../constants/constants';

import { Line } from "react-chartjs-2";

const GraphContainer = (props) => {

  const {isloading} = useContext(UserContext);

useEffect(()=>{
  console.log('i amrededssd',props.newreducer);

  setState2({
    labels: props.newreducer.humarr,
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
        data: props.newreducer.newobj[constants.hum_channel_name]
      }
    ]
  })
  setState({
    labels: props.newreducer.myarr,
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
        data: props.newreducer.newobj[constants.tmp_channel_name]
      }
    ]
  })
  if(props.newreducer.newobj[constants.hum_channel_name]){
    setHum( props.newreducer.newobj[constants.hum_channel_name][props.newreducer.newobj[constants.hum_channel_name].length -1]);
  }
  if(props.newreducer.newobj[constants.tmp_channel_name]){
    setTmp(props.newreducer.newobj[constants.tmp_channel_name][props.newreducer.newobj[constants.tmp_channel_name].length -1])
  }

},[props.newreducer.newobj[constants.hum_channel_name] ,props.newreducer.newobj[constants.tmp_channel_name] ])

    const [state , setState] = useState({
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: props.newreducer.newobj[constants.tmp_channel_name]
          }
        ]
      });
      const [state2 , setState2] = useState({
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: props.newreducer.newobj[constants.hum_channel_name]
          }
        ]
      });
      const [tmp , setTmp] = useState();
      const [hum , setHum] = useState();

    return (
          <div className="cardsContainer">
            <div className="singleCardContainer">
              <div className="iconContainer">
                <img src={thr} alt="" className="cardIcon" />
              </div>
              <div className="cardContnetContainer">
                <p className="cardText">{tmp ? tmp : 30}°C</p>
                <p className="cardSubText">Temperature</p>
              </div>
              <div className="graphclass">
              {isloading ? <img src={loader} alt="" /> :
                <Line
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    /> 
                  }
              </div>
            </div>
            <div className="singleCardContainer">
              <div className="iconContainer">
                <img src={humidity} alt="" className="cardIcon" />
              </div>
              <div className="cardContnetContainer">
                <p className="cardText">{hum ? hum : 50}%</p>
                <p className="cardSubText">Humidity</p>
              </div>
              <div className="graphclass">
              {isloading ? <img src={loader} alt="" /> :
                <Line
                    data={state2}
                    options={{
                        title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    /> 
                  }
              </div>
            </div>
        </div>
    )
  }
function map(state) {
  return state;
}
export default connect(map)(GraphContainer);