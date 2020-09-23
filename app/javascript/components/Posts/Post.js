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
    return (
      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title"><a href={`/users/${post.user.id}`}>{post.user.name}</a></h5>
            {this.props.currentUser.id == post.user.id && (
              <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id={`postDropDown${post.id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Actions<span className="caret"></span>
              </button>
              <div className="dropdown-menu" aria-labelledby={`postDropDown${post.id}`}>
                <button className="dropdown-item" href="#">Edit Post</button>
                <button className="dropdown-item" onClick={this.handleDelete} data-id={post.id}>Delete Post</button>
              </div>
            </div>
            )}
          </div>
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
        </div>
      </div>
    )
  }
}

export default Post
