import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import UserDialog from './UserDialog';
import './UserDialog.css';
import {getCurrentUser, signOut} from './leanCloud';
import {Button, Radio} from 'antd';
import CompletedItem from "./completedItem";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser || {},
      newTodo: '',
      // todoList: []
      todoList: [],
      completed:false
    }
  }
  render() {
    let todos = this
      .state
      .todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        console.log(item, index)
        return (
          <li key={index}>
            <TodoItem
              todo={item}
              onToggle={this
              .toggle
              .bind(this)}
              onDelete={this
              .delete
              .bind(this)}/> {console.log(this)}
          </li>
        )
      })
    let completedTodos = this
      .state
      .todoList
      .filter((item) => item.deleted)
      .map((item, index) => {
        console.log(item, index)
        return (
          <li key={index}>
            < CompletedItem 
              todo={item}
              onToggle={this
              .toggle
              .bind(this)}
              onResume={this
              .resume
              .bind(this)}/> 
          </li>
        )
      })
    console.log(todos)

    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办 {this.state.user.id
            ? <button onClick={this
                .signOut
                .bind(this)}>登出</button>
            : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput
            content={this.state.newTodo}
            onChange={this
            .changeTitle
            .bind(this)}
            onSubmit={this
            .addTodo
            .bind(this)}/>
        </div>
        <ol className="todoList">
          {this.state.completed? completedTodos :todos }
        </ol>
        {this.state.user.id
          ? null
          : <UserDialog
            onSignUp={this
            .onSignUp
            .bind(this)}
            onSignIn={this
            .onSignIn
            .bind(this)}/>}
        <div>
          <RadioGroup 
            onChange = {this.changeTodoState.bind(this)}
          >
            <RadioButton value="all">ALL</RadioButton>
            <RadioButton value="completed">COMPLETED</RadioButton>
          </RadioGroup>

        </div>
      </div>
    )
  }
  onSignUp(user) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut() {
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  onSignIn(user) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  changeTodoState(event,todo){
    if(event.target.value === "all"){
      this.setState({completed:false})
      console.log(event.target.value)
    }else if(event.target.value === "completed"){
      console.log(event.target.value)
      this.setState({completed:true})
    }
  }
  componentDidUpdate() {}
  toggle(e, todo) {
    todo.status = todo.status === 'completed'
      ? ''
      : 'completed'
    this.setState(this.state)
    //localStore.save('todoList', this.state.todoList)
  }
  changeTitle(event) {
    this.setState({newTodo: event.target.value, todoList: this.state.todoList})
    //  console.log(event.target.value) localStore.save('todoList',
    // this.state.todoList)
  }
  addTodo(event) {
    this
      .state
      .todoList
      .push({id: idMaker(), title: event.target.value, status: null, deleted: false})
    this.setState({newTodo: '', todoList: this.state.todoList})
    // localStore.save('todoList', this.state.todoList)
    // console.log(this.state.todoList)
  }
  delete(event, todo) {
    todo.deleted = true
    this.setState(this.state)
  }
  resume(event, todo) {
    todo.deleted = false
    this.setState(this.state)
  }
}


export default App;

let id = 0

function idMaker() {
  id = 1
  return id
}
