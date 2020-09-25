import React from 'react';
import Timeline from './Timeline';
import axios from 'axios';


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
      <Timeline currentUser={currentUser}/>
    )
  }
}

export default Home