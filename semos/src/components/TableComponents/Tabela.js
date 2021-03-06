import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { writeUsersToStore, addUserToStore, removeUserFromStore } from '../../redux/actions/writeUsersToStore'

class Tabela extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: null
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                // zamena za dispatch
                this.props.writeUsersToStore(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addUser = () => {
        this.setState({
            showModal:
                <div className='my-modal'>
                    <div className='form-container'>
                        <div className='text-container'>Add new user</div>
                        <input id='name' type='text' className='form-control' placeholder='name' />
                        <input id='username' type='text' className='form-control' placeholder='username' />
                        <input id='email' type='text' className='form-control' placeholder='email' />
                        <input id='address' type='text' className='form-control' placeholder='address' />
                        <button id='save' className='btn btn-success'
                            onClick={this.saveUser}>Save</button>
                        <button id='close' className='btn btn-secondary'
                            onClick={() => this.setState({ showModal: null })}>Close</button>
                    </div>
                </div>
        })
    }

    editUser = (user) => {
        this.setState({
            showModal:
                <div className='my-modal'>
                    <div className='form-container'>
                        <div className='text-container'>Edit user</div>
                        <input id='name' type='text' className='form-control' defaultValue={user.name} />
                        <input id='username' type='text' className='form-control' defaultValue={user.username} />
                        <input id='email' type='text' className='form-control' defaultValue={user.email} />
                        <input id='address' type='text' className='form-control' defaultValue={
                            user.address.city + ' ' + user.address.street + ' ' + user.address.suite} />
                        <button id='save' className='btn btn-success'
                            onClick={() => this.saveUser(user.id)}>Save</button>
                        <button id='close' className='btn btn-secondary'
                            onClick={() => this.setState({ showModal: null })}>Close</button>
                    </div>
                </div>
        })
    }

    deleteUser = (user) => {
        this.props.removeUserFromStore(user)
    }

    saveUser = (id) => {
        const newUser = {
            id: id,
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        }
        this.props.addUserToStore(newUser)
        this.setState({ showModal: null })
    }

    render() {
        let header = null
        let usersList = null
        if (this.props.users) {
            usersList = this.props.users.map((user) => {
                return <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                        {`${user.address.street} ${user.address.suite}`}
                    </td>
                    <td>
                        <button id='edit' className='btn btn-light' onClick={() => this.editUser(user)}>
                            Edit
                        </button>
                        <button id='delete' className='btn btn-danger'
                            onClick={() => this.deleteUser(user)}>
                            Delete
                        </button>
                    </td>
                </tr>
            })
        }
        return (
            <React.Fragment>
                <button id='add' className='btn btn-success' onClick={this.addUser}>
                    Add new user
                </button>
                <table className='table table-dark'>
                    {this.state.showModal}
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Username </th>
                            <th> Email </th>
                            <th> Address </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userTableReducer.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        writeUsersToStore: (data) => dispatch(writeUsersToStore(data)),
        addUserToStore: (data) => dispatch(addUserToStore(data)),   //za poveke parametri ...params
        removeUserFromStore: (data) => dispatch(removeUserFromStore(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabela)