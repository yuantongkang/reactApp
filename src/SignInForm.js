import React, { Component } from 'react';
import { Icon ,Button,  Input} from 'antd';
function switchDialogState(props,e){
    props.onSwitch(e)
    console.log(arguments)
    
  }

export default function SignInFrom (props){
    return (<form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
      <h1>登录</h1>
      
      <Input
        className = 'row'
        placeholder="输入用户名"
        prefix={<Icon type="user" />}
        onChange={props.onChange.bind(null, 'username')}
       
        value={props.formData.username}
      />
         <Input
        className = 'row'
        placeholder="输入密码"
        prefix= {<Icon type="lock" />}
        onChange={props.onChange.bind(null, 'password')}
        
        type = 'password'
        value={props.formData.password}
      />
      <div className="row actions">
        <Button type="primary "  htmlType="submit">登录{console.log(props.onChange)}</Button>
      </div>
      <div><a href="#" onClick={props.onForgotPassword}>忘记密码了？</a><a>or &nbsp;</a><a onClick={switchDialogState.bind(null,props)}>注册</a></div>
    </form>
    )
}




