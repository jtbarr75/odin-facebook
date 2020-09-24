import React from "react"
import axios from 'axios'
import Comments from '../Comments/Comments'

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

  handleLike(post) {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    const url = `/api/v1/posts/${post.id}/likes`
    axios.post(url)
    .then((response) => {
      this.props.updatePost(response.data.likable)
    })
    .catch((err) => {console.log(err)})
  }

  handleUnlike(like) {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    const url = `/api/v1/likes/${like.id}`
    axios.delete(url)
    .then((response) => {
      this.props.updatePost(response.data.likable)
    })
    .catch((err) => {console.log(err)})
  }

  likeSection() {
    const { post, currentUser } = this.props
    let like = post.likes.find(like => like.user_id == currentUser.id)
    if (like) {
      return <button className="btn btn-primary" onClick={ ()=>this.handleUnlike(like)}>Unlike</button>
    } else {
      return <button className="btn btn-primary" onClick={ ()=>this.handleLike(post)}>Like</button>
    }
      
  }

  render () {
    const { post, index, currentUser } = this.props
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
          <hr/>
          <div className="d-flex justify-content-between">
            {this.likeSection()}
            <button className="btn btn-primary">Comment</button>
          </div>
        </div>
        <div className="card-body comments">
            <hr/>
            <Comments post={post} updatePost={this.props.updatePost}/>
          </div>
      </div>
    )
  }
}

export default Post
