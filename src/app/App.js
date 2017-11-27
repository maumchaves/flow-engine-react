import React from 'react';
import FlowEngine from './FlowEngine';

export default class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { };
  }
  
  render() {
    return (
      <div className="container">
        <FlowEngine/>
      </div>
    );
  }
}