import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';

//Module requires
import MainComponent from './components/main/main'
import App from './route/route';
//CSS requires
require('./css/index.css');



//Create a component


ReactDOM.render(<App />, document.getElementById('todo-wrapper'));
