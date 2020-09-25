import React from "react"

class Comment extends React.Component {
  render () {
    const { comment } = this.props
    console.log(comment)
    return (
      <div className="card mt-3 bg-light">
        <div className="card-body">
          <h6 className="card-title">
            <a href={`/user/${comment.user.id}`}>{comment.user.name}</a> 
            <small className="text-muted"> {comment.created_at}</small>
          </h6>
          <p className="card-text">{comment.body}</p>
        </div>
      </div>
    )
  }
}

export default Comment
