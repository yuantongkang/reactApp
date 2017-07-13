import React, { Component } from 'react';
import { Icon, Button, Input } from 'antd';

function switchDialogState(props, e) {
  props.onSwitch(e)
  console.log(arguments)
}
function checkFormData(email, username, password) {
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



export default function SignUpForm(props) {

  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
      <h1>注册</h1>
      <Input
        className='row'
        placeholder="输入邮箱"

        prefix={<Icon type="mail" />}
        onChange={props.onChange.bind(null, 'email')}

        value={props.formData.email}
      />
      <Input
        className='row'
        placeholder="输入用户名"
        prefix={<Icon type="user" />}
        onChange={props.onChange.bind(null, 'username')}

        value={props.formData.username}
      />
      <Input
        className='row'
        placeholder="输入密码"
        prefix={<Icon type="lock" />}
        onChange={props.onChange.bind(null, 'password')}

        type='password'
        value={props.formData.password}
      />
      <div className="row actions">
        <Button type="primary " size="large" htmlType="submit">注册{console.log(props.formData)}</Button>

      </div>
      <div className='SignIn'> <span>已经注册？<a onClick={switchDialogState.bind(null, props)}><span>请登录</span></a></span></div>
    </form>
  )
}

