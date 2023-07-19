import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home"
import Content from './pages/Content';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/content' element={<Content />} /> */}
        </Routes>
      </BrowserRouter>
      <Content/>
    </>
    
  )
}

export default App
