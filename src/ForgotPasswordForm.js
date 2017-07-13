import React, {Component} from 'react';
import './ForgotPasswordForm.css';
import { Input , Button,Icon} from 'antd'
export default class ForgotPasswordForm extends Component {
  render () {
    return (
      <div className="forgotPassword">
        <h3>
          重置密码
        </h3>
        <form className="forgotPasswordForm" onSubmit={this.props.onSubmit}> {/* 登录*/}
          <div className="row">
          
            <Input  type="text" value={this.props.formData.email}
              onChange={this.props.onChange.bind(null, 'email')}
              prefix={<Icon type="mail" />}
              placeholder="请输入注册时的邮箱地址"/>
              
          </div>
          <div className="row actions">
            < Button type="submit" htmlType="submit" className = "button">发送重置邮件</ Button>
          </div>
          <a href="#" onClick={this.props.onSignIn}>返回登录</a>
        </form>
      </div>
    )
  }
}