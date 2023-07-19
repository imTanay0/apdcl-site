import { BrowserRouter, Routes, Route } from 'react-router-dom'

<<<<<<< HEAD
import Home from "./pages/Home"
import Content from './pages/Content';
=======
import Home from './pages/Home'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
>>>>>>> 6a2bbf2736e3c1962f4e133f2fd2137e58531a04

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path='/' element={<Home />} />
          {/* <Route path='/content' element={<Content />} /> */}
=======
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
>>>>>>> 6a2bbf2736e3c1962f4e133f2fd2137e58531a04
        </Routes>
      </BrowserRouter>
      <Content/>
    </>
    
  )
}

export default App
