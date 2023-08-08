import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MonthlyReport from './pages/MonthlyReport'
import Register from './pages/Register'
import Login from './pages/Login'
import AddReport from './pages/AddReport'
import YearlyReport from './pages/YearlyReport';
import Dashboard from './pages/Dashboard'
import DashboardDivision from './pages/DashboardDivision';
import DashboardSubDivision from './pages/DashboardSubDivision'

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/addreport' element={<AddReport />} />
          <Route path='/yearly-report' element={<YearlyReport />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard-division' element={<DashboardDivision />} />
          <Route path='/dashboard-subdivision' element={<DashboardSubDivision />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
