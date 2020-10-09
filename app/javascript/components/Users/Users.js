import React, { Fragment } from 'react'
import axios from 'axios'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: this.props.users
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

  handleSearch(event) {
    event.preventDefault()
    console.log("searching")
    const value = {
      search: document.getElementById("search").value,
      inFriends: this.props.inFriends
    }
    axios.get("/api/v1/users", { params: value })
      .then(response => {
        console.log(response)
        this.setState({
          users: response.data.users
        })
        results = document.getElementById('searchResults')
        if (response.data.searched) {
          results.innerText = 
            `Showing ${this.pluralize(this.state.users.length, 'result', 's')} for ${response.data.searched}`
        } else {
          results.innerText = ""
        }
      })
      .catch(err => console.log(err))
  }

  render () {

    const usersList = this.state.users.map(user => {
      return (
        <li key={user.id}className="list-group-item">
          <a href={`/users/${user.id}`}>{user.name}</a>
        </li>
      )
    })

    return (
      <Fragment>
        <div className="card w-100  mt-4 mb-4">
          <div className="card-body">
            <form onSubmit={this.handleSearch}>
              <div className="form-group row justify-content-center mb-1">
                <input id="search" className="col-7 col-lg-8 mr-1" placeholder="Find Friends..."/>
                <button type="submit" className="btn btn-primary col-3 col-lg-2">Search</button>
              </div>
            </form>
          </div>
        </div>
        <p id="searchResults" className="text-center"></p>
        <ul className="list-group">
          {usersList}
        </ul>
      </Fragment>
    )
  }
}

export default Users
