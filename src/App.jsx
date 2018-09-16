import React, { Component } from 'react';
import './App.css';
import NetWorth from './components/NetWorth'

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <NetWorth />
      </div>
    );
  }
}

export default App;
