import React, { Component } from 'react';

import './App.scss';

import Datepicker from './components/Datepicker'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Datepicker/>
      </div>
    );
  }
}

export default App;
