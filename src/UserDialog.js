import React, { Component } from 'react';
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud';
import SignInOrSignUp from './SignInOrSignUp';
import ForgotPasswordForm from './ForgotPasswordForm';
export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        user: {},
        email: '',
        username: '',
        password: '',
      }
    }
  }

  signUp(e) {
    e.preventDefault()
    let { email, username, password } = this.state.formData
    let success = (user) => {
      let isLeagal = this.checkFormData.call(this, email, username, password) 
      if (isLeagal === false) {
        return
      }
      this.props.onSignUp.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 202:
          alert('用户名已被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email, username, password, success, error)
  }
  signIn(e) {
    e.preventDefault()
    let { username, password } = this.state.formData
    console.log({ username, password })
    let success = (user) => {
      this.props.onSignIn.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名与密码不匹配')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
  changeFormData(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  checkFormData(email, username, password) {
    let regUsername = new RegExp("\\w{3,10}")
    let regPassword = new RegExp("\\w{6,20}")

    if (!regUsername.test(username)) {
      alert('用户名长度为3-10个字符')
      return false
    } else if (!regPassword.test(password)) {
      alert('密码长度为6-20个字符')
      return false
    }
    return true
  }
  render() {

    return (
      <div className="UserDialog-Wrapper">
        <div className='UserDialog'>
          {
            this.state.selectedTab === 'signInOrSignUp' ?
              <SignInOrSignUp
                formData={this.state.formData}
                onSignIn={this.signIn.bind(this)}
                onSignUp={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}
              /> :
              <ForgotPasswordForm
                formData={this.state.formData}
                onSubmit={this.resetPassword.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onSignIn={this.returnToSignIn.bind(this)}
              />
          }
        </div>
      </div>
    )
  }
  showForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  returnToSignIn() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
  resetPassword(e) {
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
}
