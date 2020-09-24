import React from "react"
import axios from 'axios'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSubmit(event) {
    event.preventDefault();
    const body = document.getElementById('commentBody')
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const commentInfo = {
      comment: {
        body: body.value
      }
    }
    axios.post(`/api/v1/posts/${this.props.post.id}/comments`, commentInfo)
    .then((response) => {
      console.log(response)
      // window.flash_messages.addMessage({ id: `newComment${response.data.id}`, text: 'Posted!', type: 'success' });
      body.value = ""
    })
    .catch((err) => {console.log(err)})
  }

  render () {
    return (
      <form className="form-inline justify-content-center">
        <input type="textarea" id="commentBody" className="form-control" placeholder="Write a comment..."/>
        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default CommentForm
