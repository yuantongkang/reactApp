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
              onSwitch={this.switch.bind(this)}
            />
            : null}
        </div>
      </div>
    )
  }
}