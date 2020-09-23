import React from 'react'
import Posts from './Posts/Posts'
import PostForm from './Posts/PostForm'
import axios from 'axios'

class Timeline extends React.Component {
  render() {

    return (
      <div className="container">
        <Posts currentUser={this.props.currentUser} hasPostForm="true"/>
      </div>
    )
  }
}

export default Timeline