import React, { Fragment } from 'react'
import axios from 'axios'

class PostForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let body = document.getElementById('body')
    body.addEventListener('blur', () => {
      document.getElementById('postErrors').innerText = ""
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let body = document.getElementById('body')
    let errors = document.getElementById('postErrors')
    if (body.value.length === 0 || body.value.trim().length === 0) {
      errors.innerText = "Cannot be blank"
      body.focus()
      return
    }

    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const postInfo = {
      post: {
        body: body.value
      }
    }
    axios.post(`/api/v1/posts`, postInfo)
    .then((response) => {
      this.props.addPost(response.data.post)
      window.flash_messages.addMessage({ id: `newPost${response.data.id}`, text: 'Posted!', type: 'success' });
      body.value = ""
      errors.innerText = ""
    })
    .catch((err) => {console.log(err.response)})
  }

  render() {
    return (
        <div className="card mt-4 w-100">
          <div className="card-body">
            <form>
              <div className="form-group row justify-content-center mb-1">
                <input id="body" className="col-8 mr-1" placeholder="What's on your mind?"/>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary col-2">Post</button>
              </div>
              <div className="form-group row justify-content-center mb-0">
                <small className="m-auto"><span id="postErrors" className="text-muted"></span></small>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default PostForm