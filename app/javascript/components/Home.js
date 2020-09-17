import React from 'react';
import Nav from './Nav';
import Timeline from './Timeline';
import axios from 'axios'


class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Nav />
        <Timeline />
      </div>
    )
  }
}

export default Home