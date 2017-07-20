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
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        console.log(todos)
        this.setState(stateCopy)
      })
    }
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      // todoList: []
      todoList: [],
      completed: false
    }

  }

  render() {

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
    let list = null;
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
          <RadioButton value="active">待做</RadioButton>
          <RadioButton value="completed">已完成</RadioButton>
          <RadioButton value="all">全部</RadioButton>
        </RadioGroup>
      </div>
    )
  }

  onSignUp(user) {
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        console.log(todos)
        this.setState(stateCopy)
      })
    }
  }
  signOut() {
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  onSignIn(user) {
    TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        console.log(todos)
        this.setState(stateCopy)
      })  
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = getCurrentUser()
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
      status: "",
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      console.log(arguments)
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
    //  todo.deleted = true
    //  this.setState(this.state)
    //  let newTodo = {
    //   title: event.target.value,
    //   status: "",
    //   deleted: true
    // }
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  resume(event, todo) {
    TodoModel.resume(todo.id, () => {
      todo.deleted = false
      this.setState(this.state)
    })
  }

}


export default App;

