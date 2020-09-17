import React from 'react';
import Nav from './Nav';
import Timeline from './Timeline';
import axios from 'axios'


class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser
    }
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div>
        <Nav currentUser={currentUser} changePage={this.props.changePage} setCurrentUser={this.props.setCurrentUser}/>
        <Timeline currentUser={currentUser}/>
      </div>
    )
  }
}

export default Home