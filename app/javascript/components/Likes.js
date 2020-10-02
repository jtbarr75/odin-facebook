import React, { Fragment } from "react"
import axios from 'axios'

class Likes extends React.Component {
  constructor(props) {
    super(props)

    this.handleLike = this.handleLike.bind(this)
    this.handleUnlike = this.handleUnlike.bind(this)
    this.like = this.likeSection.bind(this)
  }

  setToken() {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
  }

  handleLike(parent) {
    this.setToken();
    const url = `/api/v1/${parent.type}s/${parent.id}/likes`
    axios.post(url)
    .then((response) => {
      this.props.update(response.data.likable)
    })
    .catch((err) => {console.log(err)})
  }

  handleUnlike(like) {
    this.setToken();
    const url = `/api/v1/likes/${like.id}`
    axios.delete(url)
    .then((response) => {
      this.props.update(response.data.likable)
    })
    .catch((err) => {console.log(err)})
  }

  likeSection() {
    const { parent } = this.props
    let like = parent.likes.find(like => like.user_id == this.props.currentUser.id)
    if (like) {
      return <a className={this.props.className} onClick={ ()=>this.handleUnlike(like)}>Unlike</a>
    } else {
      return <a className={this.props.className} onClick={ ()=>this.handleLike(parent)}>Like</a>
    }
  }

  render () {
    return (
      <Fragment>{this.likeSection()}</Fragment>
    )
  }
}

export default Likes
