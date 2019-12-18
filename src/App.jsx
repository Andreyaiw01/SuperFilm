import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Calendar from './components/Calendar';
import List from './components/List';

export default class App extends React.Component {
 
  render(){
    return (
      <div className='App'>
        <div className='main'>
          <Route exact path="/" component={Calendar}/>
          <Route exact path="/list/:date" component={List}/>
        </div>
      </div>
    );
  }

}

