import React, { Component } from 'react';
import './TodoInput.css';
import { Input } from 'antd';
export default function TodoInput(props) {
    return <Input type="text" value={props.content}
      className="TodoInput"
      onChange={changeTitle.bind(null,props)}
      onKeyPress={submit.bind(null,props)} 
      placeholder="请输入待办"/>
  }
  


function submit(props,e) {
    if (e.key === 'Enter') {
                          
      if (e.target.value.trim() !== '') {
        props.onSubmit(e)
      }else {alert("please input you todoList")}
    }
  }
function changeTitle(props,e) {
    props.onChange(e)
  }