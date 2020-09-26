import React, { Fragment } from 'react'
import axios from 'axios'

class Login extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(e) {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    const userInfo = {
      user: {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      }
    }
    axios.post('/users/sign_in', userInfo)
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
              <h2>Log In</h2>
              <form>
                <div className="form-group">
                  <label>Email</label><br/>
                  <input id="email" class="form-control" type="email" name="email" />
                </div>
                <div className="form-group">
                  <label>Password</label><br/>
                  <input id="password" class="form-control" type="password" name="password" />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-large" onClick={this.handleLogin}>Log In</button>
                </div>
              </form>
              <a href="/signup" >Sign Up!</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login