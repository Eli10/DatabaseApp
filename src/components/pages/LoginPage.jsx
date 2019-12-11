import React, {Component} from 'react';
import LoginBox from '../Forms/LoginBox';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <LoginBox setUserID={this.props.setUserID}/>
      </div>

    )
  }
}

export default LoginPage;