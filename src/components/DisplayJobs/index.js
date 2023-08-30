import Header from '../Header'
import AllJobs from '../AllJobs'
import './index.css'

const DisplayJobs = () => (
  <>
    <Header />
    <div className="job-profile-container">
      <AllJobs />
    </div>
  </>
)

export default DisplayJobs
