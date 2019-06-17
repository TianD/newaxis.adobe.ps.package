import React, { Component } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { loadExtendscript, evalExtendscript } from 'cep-interface';
import './App.css';

loadExtendscript('index.jsx');

class App extends Component {
  constructor(props) {
    super(props);
  }

  push_button() {
    try {
      evalExtendscript("hello();");
    } catch (error) {
      alert(error);
    }
  }

  create_layers() {
    try {
      evalExtendscript("create_layers();");
    } catch (error) {
      alert(error);      
    }
  }
  
  check_layers() {
    try {
      evalExtendscript("check_layers();");
    } catch (error) {
      alert(error);      
    }
  }

  publish_layers() {
    try {
      evalExtendscript("publish_layers();");
    } catch (error) {
      alert(error);      
    }
  }

  render() {
      return (
        <div>
          <div>
          <PrimaryButton onClick={this.create_layers}>Create Layer Template</PrimaryButton>
          <PrimaryButton onClick={this.check_layers}>Check Layers</PrimaryButton>
          <PrimaryButton onClick={this.publish_layers}>Publish Layers</PrimaryButton>
          <PrimaryButton onClick={this.push_button}>Test Button</PrimaryButton>
          </div>
        </div>
      );
  }
}

export default App;
