import React, { Fragment } from "react"
import Post from './Post'

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { user, currentUser } = this.props
    let edit;
    if (currentUser.id == user.i) {
      edit = (
        <p><a href="#" className="btn btn-xs btn-primary">Edit Profile</a></p>
      )
    }
    let friendOptions = <p>Not Friends yet</p>;
    // if (user.friends.includes(currentUser.id)) {
    //   friendOptions = <p><span className="label label-success">Friends!</span></p>
    // } else if (currentUser.notifications.sentFriendRequests.includes(user.id)) {
    //   friendOptions = <p><span className="label label-primary">Request Sent</span></p>
    // } else if (currentUser.notifications.recievedFriendRequests.includes(user.id)) {
    //   friendOptions = <p><span className="label label-primary">Accept Friend Request</span></p>
    // } else {
    //   friendOptions = <p><span className="label label-primary">Send Friend Request</span></p>
    // }
    let postsList;
    if (user.posts) {
      postsList = user.posts.map((post, index) => {
        return (
          <Post key={index} post={post} currentUser={this.props.currentUser}/>
        )
      })
    }
    return (
      <Fragment>
        <div className="container">
          <h2 align="left ">{user.name}</h2>
          {/* <img href={user.picture && user.picture.url} > */}
          <p><a href="#">{user.friends.length} Friends</a></p>
          <p>Email: { user.email }</p>
          {edit}
          {friendOptions}
        </div>

        <div className="container ">
          {postsList}
        </div>
      </Fragment>
    )
  }
}

export default User
