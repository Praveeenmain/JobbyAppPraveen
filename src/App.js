import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Loginform from './components/Loginform'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import SpecificjobDetails from './components/SpecificJobDetails'
import NotFound from './components/NotFound'
import DisplayJobs from './components/DisplayJobs'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Loginform} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={DisplayJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={SpecificjobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
