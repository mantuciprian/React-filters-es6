import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';
import MainComponent from '.././components/main/main';

class App extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={MainComponent}></Route>
              
            </Router>
        );
    }
}
module.exports=App