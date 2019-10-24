import React, { Component } from 'react'

export default class AddTodo extends Component {
    state = {
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.addTodo(this.state)
      this.setState({
          content: ''
      })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Add new todo:
                        <input type='text' id="content" value={this.state.content} onChange={this.handleChange}/>
                    </label>
                   
                </form>
            </div>
        )
    }
}