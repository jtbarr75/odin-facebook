import React from "react"
import CommentForm from './CommentForm'

class Comments extends React.Component {
  constructor(props) {
    super(props)

  }


  render () {
    const { post, updatePosts } = this.props
    return (
      <CommentForm post={post} updatePosts={updatePosts}/>
    )
  }
}

export default Comments
