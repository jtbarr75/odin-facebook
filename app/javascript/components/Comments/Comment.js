import React from "react"

class Comment extends React.Component {
  render () {
    const { comment } = this.props
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">{comment.body}</h6>
        </div>
      </div>
    )
  }
}

export default Comment
