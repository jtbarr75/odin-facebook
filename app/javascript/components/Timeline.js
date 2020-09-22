import React from 'react'
import Posts from './Posts/Posts'
import PostForm from './Posts/PostForm'
import axios from 'axios'

class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }

    this.addPost = this.addPost.bind(this)
    this.removePost = this.removePost.bind(this)
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

  removePost(post) {
    let postsCopy = [...this.state.posts].filter(p => p.id != post.id);
    this.setState({posts: postsCopy});
  }

  render() {

    return (
      <div className="container">
        <PostForm currentUser={this.props.currentUser} addPost = {this.addPost}/>
        <Posts currentUser={this.props.currentUser} posts={this.state.posts} removePost={this.removePost}/>
      </div>
    )
  }
}

export default Timeline