import React, { Component } from 'react';
import './TodoItem.css';
import { Button } from 'antd';

export default class CompletedItem extends Component {
  render() {
    return (
      <div className="TodoItem">
        {/* <input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle.bind(this)} /> */}
        <span className="title">{this.props.todo.title}</span>
        <Button onClick={this.resume.bind(this)}>复原</Button>
       
      </div>
    )
  }
  toggle(e) {
    this.props.onToggle(e, this.props.todo)
    console.log(e)
  }
  resume(e) {
    this.props.onResume(e, this.props.todo) 
    console.log(this.props.todo) 
  }
}
