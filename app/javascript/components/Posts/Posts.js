import React from "react"
import Post from './Post'
import PostForm from './PostForm'
import axios from 'axios'

class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts
    }

    this.addPost = this.addPost.bind(this)
    this.removePost = this.removePost.bind(this)
  }

  componentDidMount() {
    if (this.props.posts) {
      console.log("loaded in posts from props")
      this.setState({
        posts: posts
      })
    } else {
      axios.get("/api/v1/posts.json")
        .then(response => {
          this.setState({  
            posts: response.data
          });
        })
        .catch(error => console.log(error))
    }
    
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

  render () {
    const { posts } = this.state;
    let postsList;
    if (posts) {
      postsList = posts.map((post, index) => {
        return (
          <Post key={index} post={post} currentUser={this.props.currentUser} removePost={this.removePost}/>
        )
      })
    }
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          {this.props.hasPostForm && <PostForm currentUser={this.props.currentUser} addPost = {this.addPost}/>}
          {postsList} 
        </div>
      </div>
    )
  }
}

export default Posts
