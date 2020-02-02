import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Todo from './Todo'
import loadingGif from './loading.gif'

class App extends Component {

  constructor() {
    super()

    this.state = {
      todo: '',
      todos: [],
      editing: false,
      todoIndex: null,
      loading: true,
    }

    //API URL
    this.apiUrl = 'https://5e367357f7e55d0014ad516a.mockapi.io'
  }

  componentWillMount() {
    //fetch todos
    console.log("will mount")

  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`)
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false,
      })
    }, 1000)
    //console.log(response.data)
  }

  handleChange(event) {
    this.setState({
      todo: event.target.value
    })
  }

  async delTodo(index) {
    console.log(index)
    this.setState({
      loading: true,
    })
    const todos = this.state.todos

    const response = await axios.delete(`${this.apiUrl}/todos/${todos[index].id}`)

    delete todos[index]

    this.setState({
      todos: todos,
      loading: false,
    })

  }

  actionTodo() {
    !this.state.editing? this.addTodo() : this.updateTodo(this.state.todoIndex)
  }

  async addTodo() {
    this.setState({
      loading: true,
    })

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.todo
    })

    const oldTodos = this.state.todos
    oldTodos.push(response.data)

    this.setState({
      todos: oldTodos,
      todo: '',
      loading:false,
    })
  }

  editTodo(index) {
    const todo = this.state.todos[index]

    this.setState({
      editing: true,
      todo: todo.name,
      todoIndex: index,
    })
  }

  async updateTodo() {
    this.setState({
      loading: true,
    })
    const todo = this.state.todos[this.state.todoIndex]
    todo.name = this.state.todo

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: todo.name
    })
    console.log(response.data)

    const oldTodos = this.state.todos
    oldTodos[this.state.todoIndex] = todo

    this.setState({
      todos: oldTodos,
      todo: '',
      todoIndex: null,
      editing: false,
      loading: false,
    })
  }

  render () {
    return (
      <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              React Todos
            </p>
          </header>

          <div className="px-4 pxy-4 my-1">
            <input type="text" className="form-control" name="todo" onChange={this.handleChange.bind(this)} placeholder="Enter todo" value={this.state.todo} />

            <button className="btn btn-info btn-block my-2" disabled={!this.state.todo ? true : false} onClick={!this.state.editing? this.addTodo.bind(this) : this.updateTodo.bind(this)}>{!this.state.editing? 'Add todo' : 'Update todo'}</button>
            
          </div>

          {
            this.state.loading &&

            <img src={loadingGif} alt="" />
          }

          {
            (!this.state.editing || this.state.loading) &&

            <ul className="list-group">
              {
                this.state.todos.map((item, index) => {
                  return (
                      <Todo item={item} key={item.id} editTodo={this.editTodo.bind(this, index)} delTodo={this.delTodo.bind(this, index)} />
                  );
                })
              }
            </ul>
          }

        </div>
    )
  }
}

export default App;
