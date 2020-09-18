import React from 'react'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: this.props.currentUser.signedIn ? 'home' : 'login',
      currentUser: this.props.currentUser
    }
    this.changePage = this.changePage.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }

  changePage(newPage) {
    this.setState({
      page: newPage
    })
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    })
  }

  render() {
    switch(this.state.page) {
      case 'home':
        return <Home currentUser={this.state.currentUser} changePage={this.changePage} setCurrentUser={this.setCurrentUser}/>
      case 'login':
        return <Login changePage={this.changePage} setCurrentUser={this.setCurrentUser}/>
      case 'signup':
        return <Signup changePage={this.changePage} setCurrentUser={this.setCurrentUser}/>
    }
      
  }
}

export default App