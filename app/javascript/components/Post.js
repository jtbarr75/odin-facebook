import React from "react"
import Like from './Likes/Like'

class Post extends React.Component {

  render () {
    const { post, index } = this.props
    return (
      <div className="well col-xs-8">
        <div className="content">
          <p>{post.body}</p>
          { post.picture && <img src={post.picture}/> }
        </div>
        <a href="#">{post.user.name} posted: {post.createdAt}</a>
        <a href="#">{post.comments.length} comments</a>
        {this.props.currentUser.id == post.user.id && 
          <button className="btn btn-default btn-xs" >Delete</button>
        }
        <Like currentUser={this.props.currentUser} obj={post} />
      </div>
    )
  }
}

export default Post
