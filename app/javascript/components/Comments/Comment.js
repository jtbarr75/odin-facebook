import React from "react"
import axios from "axios"

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    // this.editPost = this.editPost.bind(this)
    // this.handleEdit = this.handleEdit.bind(this)
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
      this.props.removeComment(response.data.comment)
    })
    .catch((err) => {console.log(err)})
  }

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
              <button className="btn btn-secondary dropdown-toggle" type="button" id={`commentDropDown${comment.id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Actions<span className="caret"></span>
              </button>
              <div className="dropdown-menu" aria-labelledby={`commentDropDown${comment.id}`}>
                <button className="dropdown-item" onClick={this.editPost}>Edit Comment</button>
                <button className="dropdown-item" onClick={this.handleDelete} data-id={comment.id}>Delete Comment</button>
              </div>
            </div>
            )}
          </div>
          
          <p className="card-text">{comment.body}</p>
        </div>
      </div>
    )
  }
}

export default Comment
