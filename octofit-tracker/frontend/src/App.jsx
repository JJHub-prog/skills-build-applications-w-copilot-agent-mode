import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const pages = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/users">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span>Octofit Tracker</span>
        </NavLink>
        <nav className="nav nav-pills" aria-label="Main navigation">
          {pages.map(({ path, label }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              key={path}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>

      <footer className="app-footer">Move more. Cheer each other on.</footer>
    </div>
  )
}

export default App
