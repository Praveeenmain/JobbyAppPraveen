import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="Home-container">
      <h1 className="Home-heading"> Find The Job That Fits Your Life</h1>
      <p className="Home-paragraph">
        {' '}
        Millions of people are searching for jobs,
        <br /> salary information, company reviews.
        <br /> Find the job that fits your abilities and potential.{' '}
      </p>
      <Link className="button" to="/jobs">
        {' '}
        <button className="jobs-button" type="button">
          {' '}
          Find Jobs
        </button>{' '}
      </Link>
    </div>
  </div>
)
export default Home
