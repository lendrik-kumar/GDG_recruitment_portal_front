import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import AuthPage from "./pages/Auth_page";
import InstructionsPage from "./pages/Instructions_page";
import QuestionsPage from "./pages/Questions_page";
import SubmissionSuccess from "./pages/SubmissionSucess";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Page transition wrapper component
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <AuthPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/instructions" 
          element={
            <PageTransition>
              <InstructionsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/test" 
          element={
            <PageTransition>
              <QuestionsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/submission-success" 
          element={
            <PageTransition>
              <SubmissionSuccess />
            </PageTransition>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
