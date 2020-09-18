import React from 'react'
import Errors from './Errors'
import Like from './Likes/Like'
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
    const url = "/api/v1/posts.json" //need to set up api to give the right posts
    axios.get(url)
      .then(response => {
        this.setState({  
          posts: response.data.data
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
          <div key={index} className="well col-xs-8">
            <div className="content">
              <p>{post.attributes.body}</p>
              { post.attributes.picture && <img src={post.attributes.picture}/> }
            </div>
            <a href="#">{post.attributes.username} posted: {post.attributes.created_at_pst}</a>
            <a href="#">{post.relationships.comments.data.count} comments</a>
            {this.props.currentUser.id == post.attributes.user_id && 
              <button className="btn btn-default btn-xs" >Delete</button>
            }
            <Like currentUser={this.props.currentUser} obj={post} />
          </div>
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