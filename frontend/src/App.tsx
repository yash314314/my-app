import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin} from "./pages/Signin"
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import { My } from './pages/My'
import  Check  from './pages/Check'
import Homepage from './pages/Homepage'
import { Spinner } from './components/Spinner'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish"element={<Publish  />} />
          <Route path="/blog/my"element={<My/>} />
          <Route path='/check' element = {<Check/>}></Route>
          <Route path='/check' element = {<Check/>}></Route>
          <Route path='/' element = {<Homepage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
