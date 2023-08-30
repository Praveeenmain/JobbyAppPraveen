import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {BsStar, BsBriefcase, BsGeoAlt, BsLink45Deg} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class SpecificjobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getjobdetails()
  }

  getFormattedSimilarData = data => ({
    companylogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companylogoUrl: data.company_logo_url,
    companywebsiteurl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobdescription: data.job_description,
    lifeAtCompany: {
      descripition: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packageperannum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imgUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getjobdetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsCard = () => {
    const {jobData} = this.state
    const {
      companylogoUrl,
      rating,
      title,
      location,
      employmentType,
      packageperannum,
      companywebsiteurl,
      jobdescription,
    } = jobData

    return (
      <div>
        <div className="l-r-container">
          <div className="Logo">
            <img
              className="company-logo"
              src={companylogoUrl}
              alt="website logo"
            />
          </div>
          <div className="title-rating">
            <h1>{title} </h1>
            <p>
              {' '}
              <span>
                <BsStar className="star" />{' '}
              </span>{' '}
              {rating}
            </p>
          </div>
        </div>
        <div className="j-l-s-container">
          <div className="l-e-container">
            <div className="location">
              <BsGeoAlt />
              <p>{location} </p>
            </div>
            <div className="employment-type">
              <BsBriefcase />
              <p>{employmentType} </p>
            </div>
          </div>
          <div className="sa-container">
            <p>{packageperannum} </p>
          </div>
        </div>
        <hr />
        <div className="description-link">
          <div>
            <h1> Descripition</h1>
          </div>
          <div className="website-link">
            <p> Visit</p>
            <a href={companywebsiteurl}>
              <BsLink45Deg className="link" alt="job details company logo" />{' '}
            </a>
          </div>
        </div>
        <p>{jobdescription} </p>

        <h1> Skills</h1>
      </div>
    )
  }

  renderSkillDetails = () => {
    const {jobData} = this.state
    const {skills} = jobData

    return (
      <ul className="Skill-card-container">
        {skills.map(each => (
          <li className="skill-card">
            <img className="skill-image" src={each.imgUrl} alt="name" />
            <p>{each.name} </p>
          </li>
        ))}
      </ul>
    )
  }

  renderlifeatCompany = () => {
    const {jobData} = this.state
    const {lifeAtCompany} = jobData
    const {descripition, imageUrl} = lifeAtCompany
    return (
      <div className="life">
        <h1> Life at Company</h1>
        <div className="life-at-container">
          <p className="life-des">{descripition} </p>
          <img
            className="life-img"
            src={imageUrl}
            alt="job details company logo"
          />
        </div>
      </div>
    )
  }

  renderSimlarJobs = () => {
    const {similarJobsData} = this.state

    return (
      <div className="similar-cards">
        {similarJobsData.map(each => (
          <li className="similar-jobs" key={each.id}>
            <div className="logo-role-rating-container">
              <div className="Logo">
                <img
                  className="company-logo"
                  src={each.companylogoUrl}
                  alt="similar job company logo"
                />
              </div>
              <div className="title-rating">
                <h1>{each.title} </h1>
                <p>
                  {' '}
                  <span>
                    <BsStar className="star" />{' '}
                  </span>{' '}
                  {each.rating}
                </p>
              </div>
            </div>
            <div>
              <h1> Description</h1>
              <p>{each.jobDescription} </p>
            </div>
            <div className="job-lo-sal-container">
              <div className="location-employment-container">
                <div className="location">
                  <BsGeoAlt />
                  <p>{each.location} </p>
                </div>
                <div className="employment-type">
                  <BsBriefcase />
                  <p>{each.employmentType} </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="button"
        onClick={this.renderJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsView = () => (
    <div className="bg-container">
      <ul className="job-card-specific">
        {this.renderJobDetailsCard()}
        {this.renderSkillDetails()}
        {this.renderlifeatCompany()}
      </ul>
      <div>
        <h1 className="similar"> Similar Jobs</h1>
        {this.renderSimlarJobs()}
      </div>
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-job-details-container">
        <Header />
        <div className="card-bg">{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}
export default SpecificjobDetails
