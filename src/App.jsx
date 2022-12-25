import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/login"
import SignUp from "./components/signUp"
import AllPost from "./components/allPost"
import PostDetails from "./components/postDetails"
import AddPost from "./components/addPost"
import ProfileUpdate from "./components/profileUpdate"

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allPost" element={<AllPost />} />
          <Route path="/PostDetails/:postId" element={<PostDetails />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/profileUpdate/:userId" element={<ProfileUpdate />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
