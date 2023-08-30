import './index.css'

const NotFound = () => (
  <div className="Not-found-container">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="not-headig"> Page Not Found</h1>
    <p className="not-paragraph">
      {' '}
      we are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
