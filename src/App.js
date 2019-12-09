import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/static/NavigationBar';
import * as pages from './components';


class App extends React.Component {
  render(){
    return (
      <Router>
          <NavigationBar/>
        <div className="App-header">
          <Switch>
            <Route exact path="/" component={pages.HomePage} />
            <Route exact path="/signup" component={pages.SignUpPage}/>
            <Route exact path="/login" component={pages.LoginPage}/>
            <Route exact path="/map" component={pages.MapPage}/>
            <Route exact path="/restaurant/:id" component={pages.RestaurantPage}/>

            {/* To Do Forms */}
            <Route exact path="/Create-restaurant" component={pages.CreateRestaurantPage}/>
            <Route exact path="/edit/restaurant/:id" component={pages.HomePage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
