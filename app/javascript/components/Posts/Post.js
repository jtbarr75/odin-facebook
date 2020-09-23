import React from "react"
import Like from '../Likes/Like'
import axios from 'axios'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(event) {
    event.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    axios.delete(`/api/v1/posts/${event.target.dataset.id}`)
    .then((response) => {
      this.props.removePost(response.data.post)
    })
    .catch((err) => {console.log(err)})
  }

  render () {
    const { post, index } = this.props
    console.log(post.picture)
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"><a href={`users/${post.user.id}`}>{post.user.name}</a></h5>
          <p className="card-text"><small className="text-muted">{post.createdAt}</small></p>
          <p className="card-text">{post.body}</p>
          { post.picture.url && <img className= "card-img" src={post.picture.url}/> }
          <div className="d-flex justify-content-between">
            <p><small className="text-muted" >{post.likes.length} likes</small></p>
            <p><small className="text-muted" >{post.comments.length} comments</small></p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-primary">Like</button>
          <button className="btn btn-primary">Comment</button>
          {this.props.currentUser.id == post.user.id && 
            <button onClick={this.handleDelete} data-id={post.id} className="btn btn-primary" >Delete</button>
          }
        </div>
      </div>
    )
  }
}

export default Post
