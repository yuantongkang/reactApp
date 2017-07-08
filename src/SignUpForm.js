import React, { Component } from 'react';
import { Icon, Button, Input } from 'antd';

function switchDialogState(props, e) {
  props.onSwitch(e)
  console.log(arguments)

}




export default function SignUpForm(props) {

  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
      <h1>注册</h1>
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
      <Input
        className='row'
        placeholder="输入邮箱"
        prefix={<Icon type="mail" />}
        onChange={props.onChange.bind(null, 'email')}

        value={props.formData.email}
      />
      <div className="row actions">
        <Button type="primary " size="large" htmlType="submit">注册{console.log(props.onChange)}</Button>

      </div>
      <div className='SignIn'> <span>已经注册？<a onClick={switchDialogState.bind(null, props)}><span>请登录</span></a></span></div>
    </form>
  )
}

