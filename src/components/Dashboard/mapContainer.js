/* eslint-disable */
import React,{  useState , useEffect , useContext} from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps"
import { constants } from '../../constants/constants';
import { UserContext } from '../../contexts/usersContext';
import './style.css';


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 31.5160, lng: 74.3305 }}
  >
    {props.newreducer.newobj[constants.gps_channel_name] ? props.newreducer.newobj[constants.gps_channel_name].map((el , index)=> {
    return(
      <Marker
      position={{ lat: el.lat, lng: el.lng }}
      key = {index}
      />
    )
    }):null}


     <Polyline
        path={ props.newreducer.newobj[constants.gps_channel_name]?props.newreducer.newobj[constants.gps_channel_name]:[]}
        geodesic={true}
        options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2
            
        }}
            />
  </GoogleMap>
));

const MapContainer = (props) => {

  const { isloading , noGPS} = useContext(UserContext);
  const [long, setLong ] = useState();
  const [lat , setLat]   = useState();
  useEffect(() => {
    console.log('props in userrrr-->',props);
      if(props.newreducer.newobj[constants.gps_channel_name]){
        let element = props.newreducer.newobj[constants.gps_channel_name][props.newreducer.newobj[constants.gps_channel_name].length - 1];
        console.log("eeeeeeeeee" , element);
        if(element !== undefined){
          setLong(element.long);
          setLat(element.lat);
        }
      }
  }, [props.newreducer.newobj[constants.gps_channel_name]])
    return (
        <div className="mapContainerr">
          {noGPS ? <h1 style={{    color: "white",marginTop: "13%",fontFamily: "monospace"}}>GPS NOT FOUND!</h1> :
          <div style={{ height: '100vh', width: '100%' }}>
          <MapWithAMarker
            newreducer={props.newreducer}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIdFegRbfOurYRvDN8oQNJRmpKgIj48ZY&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> 
          </div>
          }
            {/* <div style={{height: "100%" ,width: "100%"}} id="map"></div> */}
        </div>
    )
  }
function map(state) {
    return state;
  }
  export default connect(map)(MapContainer);