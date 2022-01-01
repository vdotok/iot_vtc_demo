/* eslint-disable */

import React,{ Component , useState , useEffect } from 'react';
import './style.css';
import { Line, Bar } from "react-chartjs-2";
import Header from './Header';
import GraphContainer from './graphContainer';
import MapContainer from './mapContainer';
import { connect } from 'react-redux';
import fetchData from '../../fetchdata';
import SwitchesContainer from './switchesContainer';
import UserContextProvider from "../../contexts/usersContext";
var FData = new fetchData();
const Dashboard = (props) => {
  useEffect(() => {
    let conn = { auth_token: props.user_data.auth_token };
    FData.GetAllGroups(conn).then(data => {
      props.dispatch({ type: 'AllGroups', AllGroups: data.groups });
    })
  }, [])

    return (
          <div className="mainContainer">
            <UserContextProvider >
              <Header/>
              <div className="contentWrapper">
                  <GraphContainer/>
                  <MapContainer/>
                  <SwitchesContainer/>
              </div>
            </UserContextProvider>
          </div>
    )
  }
function map(state) {
  return state;
}
export default connect(map)(Dashboard);