import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AuthPage from "./pages/Auth_page";
import InstructionsPage from "./pages/Instructions_page";
import QuestionsPage from "./pages/Questions_page";
import SubmissionSuccess from "./pages/SubmissionSucess";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<AuthPage/>} />
        <Route path="/instructions" element={<InstructionsPage/>}></Route>
        <Route path="/test" element={<QuestionsPage/>} ></Route>
        <Route path="/submission-success" element={<SubmissionSuccess />} />
      </Routes>
    </Router>  
  )
}

export default App
