import React, { Component } from 'react';
import { Icon ,Button,  Input} from 'antd';

export default function SignInFrom (props){
    return (<form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
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
        <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
      </div>
    </form>
    )
}




