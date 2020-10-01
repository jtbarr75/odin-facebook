import React, { Fragment } from "react"
import Posts from './Posts/Posts'

class User extends React.Component {
  render () {
    const { user, currentUser } = this.props
    console.log(user)
    let edit;
    let friendOptions;
    if (currentUser.id == user.id) {
      edit = (
        <p><a href="#" className="btn btn-xs btn-primary">Edit Profile</a></p>
      )
    } else {
      friendOptions = <p>Not Friends yet</p>;
    }
    
    // if (user.friends.includes(currentUser.id)) {
    //   friendOptions = <p><span className="label label-success">Friends!</span></p>
    // } else if (currentUser.notifications.sentFriendRequests.includes(user.id)) {
    //   friendOptions = <p><span className="label label-primary">Request Sent</span></p>
    // } else if (currentUser.notifications.recievedFriendRequests.includes(user.id)) {
    //   friendOptions = <p><span className="label label-primary">Accept Friend Request</span></p>
    // } else {
    //   friendOptions = <p><span className="label label-primary">Send Friend Request</span></p>
    // }

    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8 justify-content-center">
              <div className="media align-items-center mt-3">
                <img className="mr-3" src={user.picture && user.picture.url}/>
                <div className="media-body">
                  <h2>{user.name}</h2>
                  <p><a href="#">{user.friends.length} Friends</a></p>
                  {edit}
                  {friendOptions}
                </div>
              </div>
            </div>
          </div>
          
          <Posts currentUser={currentUser} posts={this.props.user.posts}/>
        </div>
      </Fragment>
    )
  }
}

export default User
