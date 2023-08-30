import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Profile extends Component {
  state = {
    profiledetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  successProfile = profiledetail => {
    const updatedProfile = {
      name: profiledetail.name,
      profileimageUrl: profiledetail.profile_image_url,
      shortBio: profiledetail.short_bio,
    }
    this.setState({
      profiledetails: updatedProfile,
      apiStatus: apiStatusConstants.success,
    })
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileurl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileurl, options)
    const data = await response.json()
    console.log(data)
    if (response) {
      this.successProfile(data.profile_details) // i done only success / i have do failure also keep it in mind..
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-container">
      <button type="button" className="button" onClick={this.getProfileDetails}>
        Retry
      </button>
    </div>
  )

  renderProfileDataView = () => {
    const {profiledetails} = this.state
    const {name, profileimageUrl, shortBio} = profiledetails

    return (
      <div className="profile-card">
        <img src={profileimageUrl} alt="profile" />
        <h1 className="profile-name">{name} </h1>
        <p className="profile-bio"> {shortBio}</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDataView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfileDetails()}</div>
  }
}
export default Profile
