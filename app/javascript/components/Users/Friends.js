import React from "react"
import Users  from "./Users"

class Friends extends React.Component {
  constructor(props) {
    super(props)

  }

  render () {
    const { currentUser, user } = this.props

    let requestSection 
    if (currentUser.friends.requests.length > 0) {
      requestSection = currentUser.friends.requests.map(request => {
        console.log(request)
        return <li className="list-group-item"><a href={`/users/${request.friend_id}`}> {request.friend_id} </a></li>
      })
    } else {
      requestSection = <li className="list-group-item">No Requests</li>
    }

    return (
      <div className="row justify-content-center">
        <div className="col-8">
          {currentUser.id == user.id && (
            <div className="card mt-4 mb-4">
              <div className="card-body">
                <h5 className="card-title">Friend Requests</h5>
                <ul className="list-group">
                  {requestSection}
                </ul>
              </div>
            </div>
          )}
          <Users users={currentUser.friends.active} inFriends="true"/>
        </div>
      </div>
    )
  }
}

export default Friends
