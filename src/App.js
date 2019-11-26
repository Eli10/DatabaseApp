import React from 'react';

import LoginBox from './components/LoginBox';
import SignUpBox from './components/SignUpBox';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: "Login"
    }
    this.setPage = this.setPage.bind(this);
  }
  setPage = (page) => {
    this.setState({
      page,
    })
  }

  renderPage = () => {
    if(this.state.page === 'Login')
     return <LoginBox setPage={this.setPage}/>
    else if(this.state.page === 'SignUp')
      return <SignUpBox setPage={this.setPage}/>
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          {this.renderPage()}
        </header>
      </div>
    );
  }
}

export default App;
