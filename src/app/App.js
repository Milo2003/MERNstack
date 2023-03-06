import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      tasks: [],
      _id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(e) {
    if (this.state._id) {
      console.log(this.state._id);
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(data => {
          M.toast({ html: 'Task Updated' });
          this.setState({ name: '', description: '', _id: '' });
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          M.toast({ html: 'tarea guardada' });
          this.setState({ name: '', description: '' });
          this.fetchTasks();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data });
      });
  }

  deleteTask(id) {
    if (confirm('Are you sure you want to delete it?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          M.toast({ html: 'Task Deleted' });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: data.name,
          description: data.description,
          _id: data._id,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN Stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-conten">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          onChange={this.handleChange}
                          name="name"
                          type="text"
                          placeholder="Task Title"
                          value={this.state.name}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          onChange={this.handleChange}
                          name="description"
                          placeholder="Task Description"
                          className="materialize-textarea"
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>
                    <button className="btn light-blue darken-4">SEND</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue"
                            onClick={() => this.editTask(task._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: '4px' }}
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
