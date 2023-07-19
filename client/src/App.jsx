import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Content from './pages/Content';
import Home from './pages/Home'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/content' element={<Content />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Content/>
    </>
    
  )
}

export default App
