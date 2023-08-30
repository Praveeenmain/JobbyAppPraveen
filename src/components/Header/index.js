import './index.css'
import {HiHome, HiBriefcase, HiLogout} from 'react-icons/hi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <div className="Header-container">
        <div className="jobby-logo">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <ul className="Home-job">
          <Link className="Link" to="/">
            {' '}
            <li className="Home">Home </li>{' '}
          </Link>
          <Link className="Link" to="/jobs">
            {' '}
            <li className="jobs"> Jobs</li>{' '}
          </Link>
        </ul>
        <div className="Logout">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            {' '}
            LogOut{' '}
          </button>
        </div>
      </div>

      <div className="header-container-small">
        <div className="jobby-logo">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="home-jobs-icon">
          <Link className="Link" to="/">
            {' '}
            <HiHome className="Home-icon" />{' '}
          </Link>
          <Link className="Link" to="/jobs">
            {' '}
            <HiBriefcase className="jobs-icon" />{' '}
          </Link>
          <HiLogout onClick={onClickLogout} className="Logout-button" />
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
