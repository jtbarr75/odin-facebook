import React from "react"
import axios from 'axios'
import Comments from '../Comments/Comments'
import Likes from '../Likes'
import PropTypes from 'prop-types'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentsOpen: false,
      post: this.props.post,
      fullComments: [],
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.getComments = this.getComments.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.post = this.post.bind(this)
    this.inTimeline = this.inTimeline.bind(this)
    this.updateComments = this.updateComments.bind(this)
  }

  setToken() {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
  }

  handleDelete(event) {
    event.preventDefault()
    this.setToken();

    axios.delete(`/api/v1/posts/${event.target.dataset.id}`)
    .then((response) => {
      window.flash_messages.addMessage({ id: `deletePost${response.data.post.id}`, text: 'Deleted Post!', type: 'danger' });
      this.props.removePost(response.data.post)
    })
    .catch((err) => {console.log(err)})
  }

  handleLike(post) {
    this.setToken();
    const url = `/api/v1/posts/${post.id}/likes`
    axios.post(url)
    .then((response) => {
      this.updatePost(response.data.likable)
    })
    .catch((err) => {console.log(err)})
  }

  handleUnlike(like) {
    this.setToken();
    const url = `/api/v1/likes/${like.id}`
    axios.delete(url)
    .then((response) => {
      this.updatePost(response.data.likable)
    })
    .catch((err) => {console.log(err)})
  }

  likeSection() {
    const { post } = this.state
    let like = post.likes.find(like => like.user_id == this.props.currentUser.id)
    if (like) {
      return <button className="btn btn-primary" onClick={ ()=>this.handleUnlike(like)}>Unlike</button>
    } else {
      return <button className="btn btn-primary" onClick={ ()=>this.handleLike(post)}>Like</button>
    }
  }

  toggleComments() {
    if (this.state.commentsOpen) {
      this.setState({
        commentsOpen: false
      })
    } else {
      // If comments has been opened before and fetched comment user data, just open and don't fetch again
      if (this.state.fullComments.length > 0) {
        this.setState({
          commentsOpen: true
        })
      } else {
        this.getComments()
      }
    }
  }

  getComments() {
    this.setToken();
    const url = `/api/v1/posts/${this.props.post.id}/comments`
    axios.get(url)
    .then((response) => {
      this.setState({
        commentsOpen: true,
        fullComments: response.data,
      })
    })
    .catch((err) => {console.log(err)})
  }

  updateComments(comments) {
    this.setState({
      fullComments: comments
    })
  }

  updatePost(post) {
    if (this.inTimeline()){
      this.props.updatePost(post)
    } 
    this.setState({
      post: post
    })
  }

  editPost() {
    let body = document.getElementById(`postBody${this.props.post.id}`);
    body.style.display = "none"
    let input = document.createElement("textarea");
    input.value = body.textContent
    input.id = "postEdit"
    input.rows = 3
    body.parentElement.insertBefore(input, body)
    input.onkeypress =  this.handleEdit
  }

  handleEdit(event) {
    if (event.keyCode == 13) {
      this.setToken();
      const body = document.getElementById('postEdit').value
      const url = `/api/v1/posts/${this.props.post.id}`
      axios.patch(url, { body: body })
      .then((response) => {
        window.flash_messages.addMessage({ id: `editPost${response.data.post.id}`, text: 'Edited Post!', type: 'warning' });
        this.removeEditInput()
        this.updatePost(response.data.post)
      })
      .catch((err) => {console.log(err.response)})
    }
  }

  removeEditInput() {
    const input = document.getElementById('postEdit')
    const body = document.getElementById(`postBody${this.props.post.id}`)
    body.style.display = "block"
    input.parentElement.removeChild(input)
  }

  // If the update post method was passed in, it's in the timeline
  inTimeline() {
    if (this.props.updatePost) {
      return true
    }
    return false
  }

  // if in Timeline then post is handled through state in timeline, else post stores own state
  post() {
    return this.inTimeline() ? this.props.post : this.state.post
  }

  commentSection() {
    if (this.state.commentsOpen) {
      let post = this.post()
      return (
        <div className="card-body comments pt-0">
          <hr/>
          <Comments 
            post={post}
            comments={this.state.fullComments}
            updatePost={this.updatePost} 
            getComments={this.getComments}
            updateComments={this.updateComments}
            currentUser={this.props.currentUser}
          />
        </div>
      )
    }
    return null
  }

  render () {
    let post  = this.post()
    
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
                <button className="dropdown-item" onClick={this.editPost}>Edit Post</button>
                <button className="dropdown-item" onClick={this.handleDelete} data-id={post.id}>Delete Post</button>
              </div>
            </div>
            )}
          </div>
          <p className="card-text"><small className="text-muted">{post.createdAt}</small></p>
          <p className="card-text" id={`postBody${post.id}`}>{post.body}</p>
          { post.picture.url && <img className= "card-img" src={post.picture.url}/> }
          <div className="d-flex justify-content-between">
            <p><small className="text-muted" >{post.likes.length} likes</small></p>
            <a><small className="text-muted" onClick={this.toggleComments}>{post.comments.length} comments</small></a>
          </div>
          <hr/>
          <div className="d-flex justify-content-between">
            <Likes parent={post} currentUser={this.props.currentUser} update={this.updatePost} className="btn btn-primary"/>
            <button className="btn btn-primary" onClick={this.toggleComments}>Comment</button>
          </div>
        </div>
        {this.commentSection()}
      </div>
    )
  }
}

Post.propTypes = {
  removePost: PropTypes.func,
  updatePost: PropTypes.func,
  currentUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default Post
