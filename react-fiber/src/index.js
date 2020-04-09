import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import ExampleApplication from './aminatiom'

var start = new Date().getTime();

function update() {
  ReactDOM.render(<ExampleApplication elapsed={new Date().getTime() - start} />, document.getElementById('root'));
  requestAnimationFrame(update);
}

// ReactDOM.render(<ExampleApplication elapsed={new Date().getTime() - start} />, document.getElementById('root'));
requestAnimationFrame(update);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
