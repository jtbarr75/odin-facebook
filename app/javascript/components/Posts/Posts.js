import React from "react"
import Post from './Post'

class Posts extends React.Component {
  render () {
    const { posts } = this.props;
    let postsList;
    if (posts) {
      postsList = posts.map((post, index) => {
        return (
          <Post key={index} post={post} currentUser={this.props.currentUser} removePost={this.props.removePost}/>
        )
      })
    }
    return (
      <div className="row justify-content-center">
        {postsList} 
      </div>
    )
  }
}

export default Posts
