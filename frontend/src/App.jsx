import {Outlet} from 'react-router'

const App = () => {
  return (
    <div>
      <h1>Job Application Tracker</h1>
      <Outlet />
    </div>
  )
}

export default App;