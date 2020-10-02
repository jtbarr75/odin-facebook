import React, { Fragment } from "react"
import axios from 'axios'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    let body = document.getElementById(`commentBody${this.props.post.id}`)
    body.addEventListener('blur', () => {
      document.getElementById(`commentErrors${this.props.post.id}`).innerText = ""
    })
  }


  handleSubmit(event) {
    event.preventDefault();
    const body = document.getElementById(`commentBody${this.props.post.id}`)
    let errors = document.getElementById(`commentErrors${this.props.post.id}`)
    if (body.value.length === 0 || body.value.trim().length === 0) {
      errors.innerText = "Cannot be blank"
      return
    }

    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const commentInfo = {
      comment: {
        body: body.value
      }
    }
    axios.post(`/api/v1/posts/${this.props.post.id}/comments`, commentInfo)
    .then((response) => {
      this.props.updatePost(response.data.post)
      this.props.updateComments(response.data.comments)
      window.flash_messages.addMessage({ id: `newComment${response.data.post.id}`, text: 'Commented!', type: 'success' });
      body.value = ""
    })
    .catch((err) => {console.log(err)})
  }

  render () {
    return (
      <Fragment>
        <form >
          <div className="form-group row justify-content-center align-items-center mb-1">
            <textarea rows="2" id={`commentBody${this.props.post.id}`} className="col-8 mr-1" placeholder="Write a comment..."/>
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary col-2">Send</button>
          </div>
          <div className="form-group row justify-content-center mb-0">
            <small className="m-auto"><span id={`commentErrors${this.props.post.id}`} className="text-muted"></span></small>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default CommentForm
