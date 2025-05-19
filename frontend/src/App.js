
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Login';
// import Register from './Register';
import Welcome from './Welcome';
import LoginRegisterPage from 'pages/LoginRegisterPage';
import ResetPassword from './ResetPassword';
import './index.css';

function App() {
  return (
    <Router >
      {/* <h1 className="text-red text-4xl font-bold t">Tailwind CSS is Working! ✅</h1> */}
      <Routes >
        
        <Route path="/" element={<LoginRegisterPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/loginRegisterPage" element={<LoginRegisterPage />} />
  
      </Routes>
    </Router>
  );
}

export default App;
