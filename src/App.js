import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import UserDialog from './UserDialog';
import './UserDialog.css';
import { getCurrentUser, signOut, TodoModel } from './leanCloud';
import { Button, Radio } from 'antd';
import CompletedItem from "./completedItem";
import AllItem from "./AllItem"
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
      completed: false
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }

  render() {
    let list = null;

    let all = this
      .state
      .todoList
      .map((item, index) => {
        console.log(item, index)
        return (
          <li key={index}>
            <AllItem
              todo={item}
              onToggle={this
                .toggle
                .bind(this)}
              onDelete={this
                .delete
                .bind(this)} /> {console.log(this)}
          </li>
        )
      })
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
                .bind(this)} /> {console.log(this)}
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
                .bind(this)} />
          </li>
        )
      })
    if (this.state.completed == true) {
      console.log(arguments)
      list = completedTodos
    } else if (this.state.completed == false) {
      list = todos
    } else {
      list = all
    }
    console.log(todos)

    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办 {this.state.user.id
          ?
          <Button type="danger" onClick={this
            .signOut
            .bind(this)}>注销</Button>

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
              .bind(this)} />
        </div>
        <ol className="todoList">
          {list}
        </ol>
        {this.state.user.id
          ? null
          : <UserDialog
            onSignUp={this
              .onSignUp
              .bind(this)}
            onSignIn={this
              .onSignIn
              .bind(this)} />}
        <RadioGroup
          onChange={this.changeTodoState.bind(this)}
          className="todostate"
        >
          <RadioButton value="active">ACTIVE</RadioButton>
          <RadioButton value="completed">COMPLETED</RadioButton>
          <RadioButton value="all">ALL</RadioButton>
        </RadioGroup>
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
  changeTodoState(event, todo) {
    if (event.target.value === "active") {
      this.setState({ completed: false })
      console.log(event.target.value)
    } else if (event.target.value === "completed") {
      console.log(event.target.value)
      this.setState({ completed: true })
    } else if (event.target.value === "all") {
      console.log(event.target.value)
      this.setState({ completed: "all" })
    }
  }
  componentDidUpdate() { }
  toggle(e, todo) {
    let oldStatus = todo.status
      todo.status = todo.status === 'completed' ? '' : 'completed'
     TodoModel.update(todo, () => {
       this.setState(this.state)
     }, (error) => {
       todo.status = oldStatus
       this.setState(this.state)
     })
  }
  changeTitle(event) {
    this.setState({ newTodo: event.target.value, todoList: this.state.todoList })
    //  console.log(event.target.value) localStore.save('todoList',
    // this.state.todoList)
  }
  addTodo(event) {
    let newTodo = {
      title: event.target.value,
      status: null,
      deleted: false

    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }

  delete(event, todo) {
    TodoModel.destroy(todo.id, () => {
       todo.deleted = true
       this.setState(this.state)
     })
  }
  resume(event, todo) {
    todo.deleted = false
    this.setState(this.state)
  }
}


export default App;

