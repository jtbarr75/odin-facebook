import React from 'react'
import Errors from './Errors'
import Like from './Likes/Like'
import Post from './Post'
import PostForm from './PostForm'
import axios from 'axios'

class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }

    this.addPost = this.addPost.bind(this)
  }

  componentDidMount() {
    const url = "/api/v1/posts.json"
    axios.get(url)
      .then(response => {
        this.setState({  
          posts: response.data
        });
        
      })
      .catch(error => console.log(error))
  }

  addPost(post) {
    this.setState({
      posts: [post, ...this.state.posts]
    })
  }

  render() {
    const { posts } = this.state;
    let postsList;
    if (posts) {
      postsList = posts.map((post, index) => {
        return (
          <Post key={index} post={post} currentUser={this.props.currentUser}/>
        )
      })
    }
    
    return (
      <div className="container">
        <PostForm currentUser={this.props.currentUser} addPost = {this.addPost}/>
        {postsList}
      </div>
    )
  }
}

export default Timeline