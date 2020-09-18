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
      this.props.setCurrentUser(response.data)
      this.props.changePage('home')
    })
    .catch((err) => {console.log(err)})
  }

  render() {
    return (
      <Fragment>
        <div className="col-sm-offset-4 col-sm-8">
          <h2>Sign up</h2>
        </div>
        <div className="row">
          <div className="col-xs-offset-3 col-xs-9">
            <form className='form-horizontal'>
              <div className="form-group">
                <div className="control-label col-sm-2">
                  <label>Name</label>
                </div>
                <div className="col-sm-6">
                  <input type="text" name="name" id="name"/>
                </div>
              </div>
              <div className="form-group">
                <div className="control-label col-sm-2">
                  <label>Email</label>
                </div>
                <div className="col-sm-6">
                  <input type="email" name="email" id="email"/>
                </div>
              </div>
              <div className="form-group">
                <div className="control-label col-sm-2">
                  <label>Password</label>
                </div>
                <div className="col-sm-6">
                  <input type="password" name="password" id="password"/>
                </div>
              </div>
              <div className="form-group">
                <div className="control-label col-sm-2">
                  <label>Password Confirmation</label>
                </div>
                <div className="col-sm-6">
                  <input type="password" name="passwordConfirmation" id="passwordConfirmation"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button className="btn btn-primary btn-large" onClick={this.handleSignup}>Sign Up</button>
                </div>
              </div>
            </form>
            <button onClick={()=>this.props.changePage('login')}>Log In</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Signup