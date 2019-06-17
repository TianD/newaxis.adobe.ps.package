import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
try {
  ReactDOM.render(<App />, document.getElementById('root'));
} catch (error) {
  alert(error);
  ReactDOM.render(<div>{error}</div>, document.getElementById('root'));
}
