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
      <div className="well col-xs-8">
        <div className="content">
          <p>{post.body}</p>
          { post.picture && <img src={post.picture}/> }
        </div>
        <a href={`users/${post.user.id}`}>{post.user.name} posted: {post.createdAt}</a>
        <a href="#">{post.comments.length} comments</a>
        {this.props.currentUser.id == post.user.id && 
          <button onClick={this.handleDelete} data-id={post.id} className="btn btn-default btn-xs" >Delete</button>
        }
        <Like currentUser={this.props.currentUser} obj={post} />
      </div>
    )
  }
}

export default Post
