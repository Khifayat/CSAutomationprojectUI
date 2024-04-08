import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Mobile from "./pages/Mobile";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from './pages/LoginPage'
import UserDashboardPage from './pages/UserDashboardPage'
import Lobby from "./pages/Lobby";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/lobby" element={<Lobby/>} />
              <Route path="/mobile" element={<Mobile/>} />
              <Route path="/register" element={<RegistrationPage/> } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<UserDashboardPage/>} />
          </Routes>
      </Router>
  );
}

export default App;
