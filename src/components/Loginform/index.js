import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Loginform extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitfailure = errorMsg => {
    this.setState({
      errorMsg,
      showSubmitError: true,
    })
  }

  submitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitfailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-bg-container">
          <img
            className="login-website-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submitform}>
            <label htmlFor="username" className="label-username">
              {' '}
              USERNAME{' '}
            </label>
            <input
              id="username"
              value={username}
              onChange={this.onChangeUsername}
              type="text"
              className="input-username"
              placeholder="Username"
            />
            <label htmlFor="password" className="label-password">
              {' '}
              PASSWORD
            </label>
            <input
              id="password"
              value={password}
              onChange={this.onChangePassword}
              type="password"
              className="input-password"
              placeholder="Password"
            />
            <button type="submit" className="login-button">
              {' '}
              Login
            </button>
            {showSubmitError && <p className="error-msg"> *{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Loginform
