import React, { Component } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { loadExtendscript, evalExtendscript } from 'cep-interface';
import './App.css';

loadExtendscript('index.jsx');
loadExtendscript("json2.js");

class App extends Component {
  constructor(props) {
    super(props);
    this.check_result = [];
    this._columns = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'flag', name: 'Flag', fieldName: 'flag', minWidth: 100, maxWidth: 200, isResizable: true }
    ];
    this.state = {
      items: this.check_result,
      label: 'a'
    };
  }

  push_button() {
    try {
      evalExtendscript("hello();").then((value) => { alert(value) });
    } catch (error) {
      alert(error);
    }
  }

  click_create_layers() {
    try {
      evalExtendscript("create_layers();");
    } catch (error) {
      alert([
        error,
        error.message,
        error.line
      ].join("\n"));
    }
  }

  click_check_layers() {
    try {
      evalExtendscript("check_layers();").then((value) => {
        this.setState({items: value})
      });
    } catch (error) {
      alert([
        error,
        error.message,
        error.line
      ].join("\n"));
    }
  }

  async click_flat_layers() {
    try {
      await evalExtendscript("flat_layers();")
    } catch (error) {
      alert(error);
    }
  }

  a_button() {
    try {
      this.setState({ items: [{ key: 1, name: 'abc', flag: 'false' }, { key: 2, name: 'def', flag: 'true' }] });
    } catch (error) {
      alert(error);
    }

  }

  render() {
    return (
      <div>
        <div>
          <PrimaryButton onClick={this.click_create_layers.bind(this)}>Create Layer Template</PrimaryButton>
          <PrimaryButton onClick={this.click_check_layers.bind(this)}>Check Layers</PrimaryButton>
          <PrimaryButton onClick={this.click_flat_layers.bind(this)}>Flat Layers</PrimaryButton>
          <PrimaryButton onClick={this.push_button.bind(this)}>Test Button</PrimaryButton>
          <PrimaryButton onClick={this.a_button.bind(this)}>{this.state.label}</PrimaryButton>
        </div>
        <div>
          <DetailsList
            items={this.state.items}
            columns={this._columns}
          />
        </div>
      </div>

    );
  }
}

export default App;
