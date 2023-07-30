import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Report from './pages/Report'
import Register from './pages/Register'
import Login from './pages/Login'
import AddReport from './pages/AddReport'
import YearlyData from './pages/YearlyData';
import Performance from './pages/Performance'
import Dashboard from './pages/Dashboard'

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
          <Route path='/performance' element={<Performance />} />
          <Route path='/addreport' element={<AddReport />} />
          <Route path='/yearlydata' element={<YearlyData />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
