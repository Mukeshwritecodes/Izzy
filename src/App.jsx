import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Genre from './pages/Genre'
import Book from './pages/Book'
import Orders from './pages/Orders'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      {/* Sidebar or Navbar can go here if global */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/book" element={<Book />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
