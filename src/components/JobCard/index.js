import './index.css'
import {BsStar, BsBriefcase, BsGeoAlt} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <Link className="specific-link" to={`/jobs/${id}`}>
      <li className="job-card">
        <div className="logo-y">
          <div className="logo-role-rating">
            <div className="Logo">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="company logo"
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
          <div className="job-lo-sal-container">
            <div className="location-employment-container">
              <div className="location">
                <BsGeoAlt />
                <p>{location} </p>
              </div>
              <div className="employment-type">
                <BsBriefcase />
                <p>{employmentType} </p>
              </div>
            </div>
            <div className="salaray-container">
              <h1>{packagePerAnnum} </h1>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="descripition-container">
          <h1> Description </h1>
          <p> {jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
