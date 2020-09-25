import React from 'react'
import Posts from './Posts/Posts'

class Timeline extends React.Component {
  render() {

    return (
      <Posts currentUser={this.props.currentUser} hasPostForm="true"/>
    )
  }
}

export default Timeline