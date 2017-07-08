import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import LoginForm from './LoginForm';

export default class SignInOrSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'signIn'
    }
  }

  switch(e) {
    if (this.state.selected == 'signIn') {
      this.setState({
        selected: 'signUp'
      })
    } else { this.setState({ selected: 'signIn' }) }
  }

  render() {
    return (
      <div className="signInOrSignUp">
        <nav>
          <label>
            <input type="radio" value="signUp"
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)}
            /> 注册</label>
          <label>
            <input type="radio" value="signIn"
              checked={this.state.selected === 'signIn'}
              onChange={this.switch.bind(this)}
            /> 登录</label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ?
            <SignUpForm formData={this.props.formData}
              onSubmit={this.props.onSignUp}
              onChange={this.props.onChange}
              onSwitch={this.switch.bind(this)}
            />
            : null}
          {this.state.selected === 'signIn' ?
            <SignInForm formData={this.props.formData}
              onChange={this.props.onChange}
              onSubmit={this.props.onSignIn}
              onForgotPassword={this.props.onForgotPassword}
            />
            : null}
        </div>
      </div>
    )
  }
}