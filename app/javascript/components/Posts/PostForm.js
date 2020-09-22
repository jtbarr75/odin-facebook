import React, { Fragment } from 'react'
import axios from 'axios'

class PostForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = document.getElementById('body')
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const postInfo = {
      post: {
        body: body.value
      }
    }
    axios.post(`/api/v1/users/${this.props.currentUser.id}/posts`, postInfo)
    .then((response) => {
      this.props.addPost(response.data)
      window.flash_messages.addMessage({ id: `newPost${response.data.id}`, text: 'Posted!', type: 'success' });
      body.value = ""
    })
    .catch((err) => {console.log(err)})
  }

  render() {
    return (
        <div className="row">
          <div className="well col-xs-8">
            <form className="form">
              <div className='form-group'>
                <input type="textarea" id="body" className="form-control" rows="2"/>
              </div>
              <div className="form-group">
                <button onClick={this.handleSubmit} className="btn btn-primary btn-large" >Submit</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default PostForm