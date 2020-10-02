import React, { Fragment } from "react"
import Posts from '../Posts/Posts'
import axios from 'axios'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
    this.sendRequest = this.sendRequest.bind(this)
    this.acceptRequest = this.acceptRequest.bind(this)
  }

  setToken() {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
  }

  sendRequest() {
    this.setToken()
    axios.post(`/api/v1/users/${this.props.user.id}/friendships`)
      .then(response => {
        console.log(response)
        this.setState({
          user: response.data.user
        })
      })
      .catch(err => console.log(err))
  } 

  acceptRequest(id) {
    this.setToken()
    axios.patch(`/api/v1/friendships/${id}/`)
      .then(response => {
        console.log(response)
        this.setState({
          user: response.data.user
        })
      })
      .catch(err => console.log(err))
  }

  pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

  render () {
    const { user } = this.state
    const { currentUser } = this.props
    let edit;
    let friendOptions;
    if (currentUser.id == user.id) {
      edit = (
        <p><a href="#" className="btn btn-xs btn-primary">Edit Profile</a></p>
      )
    } else {
      if (user.friends.active.find( friendship => friendship.friend_id == currentUser.id)) {
        friendOptions = <p><span className="label label-success">Friends!</span></p>
      } else if (user.friends.requests.find( request => request.friend_id == currentUser.id)) {
        friendOptions = <p><span className="label label-primary">Request Sent</span></p>
      } else {
        let request = currentUser.friends.requests.find( request => request.friend_id == user.id)
        if (request) {
          friendOptions = <button onClick={() => this.acceptRequest(request.id)} className="btn btn-xs btn-primary">Accept Friend Request</button>
        } else {
          friendOptions = <button onClick={this.sendRequest} className="btn btn-xs btn-primary">Send Friend Request</button>
        }
      }
    }
    
    
    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8 justify-content-center">
              <div className="media align-items-center mt-3">
                <img className="mr-3" src={user.picture && user.picture.url}/>
                <div className="media-body">
                  <h2>{user.name}</h2>
                  <p><a href="#">{this.pluralize(user.friends.active.length, 'friend', 's')}</a></p>
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
