import React, { Fragment } from "react"
import CommentForm from './CommentForm'
import Comment from './Comment'

class Comments extends React.Component {
  constructor(props) {
    super(props)

  }


  render () {
    const { post, updatePost, comments, getComments } = this.props
    // console.log(post.comments)
    const commentsList = comments.map((comment, index) => {
      return <Comment key={index} comment={comment}/>
    })
    return (
      <Fragment>
        <CommentForm post={post} updatePost={updatePost} getComments={getComments}/>
        {commentsList}
      </Fragment>
      
    )
  }
}

export default Comments
