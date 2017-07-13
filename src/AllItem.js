import React, { Component } from 'react';
import './TodoItem.css';
import { Button } from 'antd';

export default class AllItem extends Component {
  render() {
    return (
      <div className="TodoItem All">
        {/* <input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle.bind(this)} /> */}
        <span className="title">{this.props.todo.title}</span>
      </div>
    )
  }
  toggle(e) {
    this.props.onToggle(e, this.props.todo)
    console.log(e)
  }
  // delete(e) {
  //   this.props.onDelete(e, this.props.todo) 
  //   console.log(this.props.todo) 
  // }
}
