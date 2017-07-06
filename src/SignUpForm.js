import React, {Component} from 'react';
import { Icon ,Button,  Input} from 'antd';
export default class SignUpForm extends Component {
  render () {
    return (
      <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
        
         <Input
        className = 'row'
        placeholder="输入用户名"
        prefix={<Icon type="user" />}
        onChange={this.props.onChange.bind(null, 'username')}
        ref={node => this.userNameInput = node}
        value={this.props.formData.username}
      />
         <Input
        className = 'row'
        placeholder="输入密码"
        prefix={<Icon type="password" />}
        onChange={this.props.onChange.bind(null, 'password')}
        ref={node => this.userNameInput = node}
        value={this.props.formData.password}
      />
        
        <div className="row">
          <Icon type="mail" style={{fontSize:16}}/><label>邮箱</label>
          <input type="text" value={this.props.formData.email}
            onChange={this.props.onChange.bind(null, 'email')}/>
        </div>
         
        <div className="row">
          <Icon  style={{fontSize:16}}type="lock" /><label>密码</label>
          <input type="password" value={this.props.formData.password}
            onChange={this.props.onChange.bind(null, 'password')}/>
        </div>
        <div className="row actions">
          <Button type="primary "  htmlType="submit">注册</Button>
        </div>
      </form>
    )
  }
}