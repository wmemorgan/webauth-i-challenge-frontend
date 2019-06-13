import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'

import Login from './components/AuthComponents/Login'
import UserList from './components/UserComponents/UserList'

class Routes extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      userList: [],
      errorMessage: ''
    }
  }

  getData = async () => {
    try {
      let endpoint = '/users'
      let data = await axios.get(endpoint)
      this.setState({
        status: data.status,
        userList: data.data
      })
    }
    catch (err) {
      console.error(err.response)
      this.setState({
        status: err.status,
        errorMessage: err.response.data.message
      })
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <>
        <Route path='/login' component={Login} />
        <Route 
          exact path='/'
          render={props => <UserList {...props} {...this.state} />}
        />
      </>
    )
  }
}

export default withRouter(Routes)