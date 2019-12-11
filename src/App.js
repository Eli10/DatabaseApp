import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/static/NavigationBar';
import * as pages from './components';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userID: null,

    }
    this.setUserID = this.setUserID.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      userID: null,
    })
  }

  setUserID = (userID) => {
    if(userID !== this.state.userID)
      this.setState({
        loggedIn: true,
        userID,
      })
  }

  render(){
    return (
      <Router>
          <NavigationBar loggedIn={this.state.loggedIn} logout={this.logout}/>
        <div className="App-header">
          <Switch>
            <Route exact path="/" component={pages.HomePage}/>
            <Route exact path="/signup" component={pages.SignUpPage}/>
            <Route exact path="/login" component={pages.LoginPage}>
              <pages.LoginPage setUserID={this.setUserID}/>
            </Route>

            <Route exact path="/map" component={pages.MapPage}/>
            <Route exact path="/all-restaurants" component={pages.RestaurantsPage}/>

            <Route exact path="/user">
              {this.state.loggedIn ? 
                <pages.UserPage loggedIn={this.state.loggedIn} userID={this.state.userID}/> : 
                <Redirect to="/login" />}
            </Route>

            <Route exact path="/restaurant/:id" component={pages.RestaurantPage}/>

            {/* To Do Forms */}
            <Route exact path="/create-restaurant" component={pages.CreateRestaurantPage}/>
            <Route exact path="/edit/restaurant/:id" component={pages.EditRestaurantPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
