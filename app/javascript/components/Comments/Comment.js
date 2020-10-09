import React from "react"
import axios from "axios"
import Likes from "../Likes"

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.editComment = this.editComment.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.removeEditInput = this.removeEditInput.bind(this)
  }

  setToken() {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
  }

  handleDelete(event) {
    event.preventDefault()
    this.setToken();

    axios.delete(`/api/v1/comments/${this.props.comment.id}`)
    .then((response) => {
      window.flash_messages.addMessage({ id: `deleteComment${response.data.comment.id}`, text: 'Deleted Comment!', type: 'danger' });
      this.props.updateComments(response.data.comments)
      this.props.updatePost(response.data.post)
    })
    .catch((err) => {console.log(err)})
  }

  editComment() {
    let body = document.getElementById(`commentBody${this.props.comment.id}`);
    body.style.display = "none"
    let input = document.createElement("textarea");
    input.value = body.textContent
    input.id = "commentEdit"
    input.rows = 3
    body.parentElement.insertBefore(input, body)
    input.onkeypress =  this.handleEdit
  }

  handleEdit(event) {
    if (event.keyCode == 13) {
      this.setToken();
      const body = document.getElementById('commentEdit').value
      const url = `/api/v1/comments/${this.props.comment.id}`
      axios.patch(url, { body: body })
      .then((response) => {
        window.flash_messages.addMessage({ id: `editComment${response.data.comment.id}`, text: 'Edited Comment!', type: 'warning' });
        this.removeEditInput()
        this.props.updateComments(response.data.comments)
      })
      .catch((err) => {console.log(err)})
    }
  }

  removeEditInput() {
    const input = document.getElementById('commentEdit')
    const body = document.getElementById(`commentBody${this.props.comment.id}`)
    body.style.display = "block"
    input.parentElement.removeChild(input)
  }

  pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

  render () {
    const { comment } = this.props

    return (
      <div className="card mt-3 bg-light">
        <div className="card-body">
          <div className = "d-flex justify-content-between">
            <h6 className="card-title">
              <a href={`/user/${comment.user.id}`}>{comment.user.name}</a> 
              <small className="text-muted"> {comment.created_at}</small>
            </h6>
            {this.props.currentUser.id == comment.user.id && (
              <div className="dropdown">
              <span className="dropdown-toggle" id={`commentDropDown${comment.id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="oi oi-ellipses icon-dropdown"></span>
              </span>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby={`commentDropDown${comment.id}`}>
                <button className="dropdown-item" onClick={this.editComment}>Edit Comment</button>
                <button className="dropdown-item" onClick={this.handleDelete} data-id={comment.id}>Delete Comment</button>
              </div>
            </div>
            )}
          </div>
          
          <p className="card-text" id={`commentBody${comment.id}`}>{comment.body}</p>
          <small className="text-muted mr-1">{this.pluralize(comment.likes.length, 'like', 's')}</small>
         <small>
          <Likes parent={comment} update={this.props.updateComments} currentUser={this.props.currentUser} className="card-link"/>
        </small>
        </div>
      </div>
    )
  }
}

export default Comment
