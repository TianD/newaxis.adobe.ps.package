import React, { Component } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { loadExtendscript, evalExtendscript } from 'cep-interface';
import './App.css';

loadExtendscript('index.jsx');

class App extends Component {
  constructor(props) {
    super(props);
    this.check_result = [];
    this._columns = [
      { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    ];
    this.state = {
      items: []
    };
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
      alert([
        error,
        error.message,
        error.line
      ].join("\n"));
    }
  }

  check_layers() {
    try {
      evalExtendscript("check_layers();").then((value) => {
        if (value) {
          this.setState({ items: value });
        }
        else {
          this.setState({ items: { 'layerName': 'OK' } });
        }
      });
    } catch (error) {
      alert([
        error,
        error.message,
        error.line
      ].join("\n"));
    }
  }

  publish_layers() {
    try {
      alert(this);
      evalExtendscript("publish_layers();");
    } catch (error) {
      alert(error);
    }
  }

  render() {
    let { items } = this.state;
    return (
      <Fabric>
        <div>
          <PrimaryButton onClick={this.create_layers}>Create Layer Template</PrimaryButton>
          <PrimaryButton onClick={this.check_layers}>Check Layers</PrimaryButton>
          <PrimaryButton onClick={this.publish_layers}>Publish Layers</PrimaryButton>
          <PrimaryButton onClick={this.push_button}>Test Button</PrimaryButton>
        </div>
        <DetailsList
          items={items}
          columns={this._columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        />
      </Fabric>
    );
  }
}

export default App;
