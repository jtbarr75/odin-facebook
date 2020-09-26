import React, { Fragment } from 'react'
import axios from 'axios'

class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleSignup(e) {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const userInfo = {
      user: {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        password_confirmation: document.getElementById('passwordConfirmation').value
      }
    }
    axios.post('/users', userInfo)
    .then((response) => {
      window.location.href = "/"
    })
    .catch((err) => {console.log(err)})
  }

  render() {
    return (
      <div className="row justify-content-center">
      <div className="col-5">
        <div className="card mt-4 bg-light">
          <div className="card-body">
            <h2>Sign Up</h2>
            <form>
              <div className="form-group">
                <label>Name</label><br/>
                <input id="name" class="form-control" type="text" name="name" />
              </div>
              <div className="form-group">
                <label>Email</label><br/>
                <input id="email" class="form-control" type="email" name="email" />
              </div>
              <div className="form-group">
                <label>Password</label><br/>
                <input id="password" class="form-control" type="password" name="password" />
              </div>
              <div className="form-group">
                <label>Password Confirmation</label><br/>
                <input id="passwordConfirmation" class="form-control" type="password" name="password" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-large" onClick={this.handleSignup}>Sign Up</button>
              </div>
            </form>
            <a href="/login" >Log in</a>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Signup