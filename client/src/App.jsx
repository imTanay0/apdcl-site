import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Report from './pages/Report'
import Register from './pages/Register'
import Login from './pages/Login'

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
