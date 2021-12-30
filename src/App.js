import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import { connect } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import {React} from "react";

const App = (props) => {
  return (
    <div className="App">
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            {props.user_data.length !== 0 ? <Dashboard /> : <Signin />}
          </Route>
          <Route path="/sign-up" exact>
            <Signup />
          </Route>
          <Route path="/sign-in" exact>
            <Signin />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function map(state) {
  return state;
}
export default connect(map)(App);
