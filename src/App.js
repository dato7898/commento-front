import React, { Component } from 'react';
import './App.css';
import CommentoApp from './component/CommentoApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <CommentoApp />
      </div>
    );
  }
}

export default App;