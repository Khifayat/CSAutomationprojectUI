import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Home from "./pages/Home";
// import RegistrationPage from "./pages/RegistrationPage";
// import Home from './pages/Home'
// import LoginPage from './pages/LoginPage'
import UserDashboardPage from './pages/UserDashboardPage'

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              {/*<Route path="/about" element={<About />} />*/}
              {/*<Route path="/contact" element={<Contact />} />*/}
          </Routes>
      </Router>
    // <div >
    //     {/* <RegistrationPage/> */}
    //     {/* <Home/> */}
    //     {/* <LoginPage/> */}
    //     <UserDashboardPage/>
    // </div>
  );
}

export default App;
