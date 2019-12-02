import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import * as pages from './components';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="App-header">
          <Switch>
            <Route exact path="/" component={pages.HomePage} />
            <Route exact path="/signup" component={pages.SignUpPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
