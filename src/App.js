import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar/NavbarComponent';
import Footer from './Components/Footer/FooterComponent';

import Home from './Pages/HomePage';
import FindDonor from './Pages/FindDonor';
import AboutPage from './Pages/AboutPage';
import TimelineList from './Pages/TimelinePage';
import UserDashboardPage from './Pages/UserDashboardPage';
import BloodNeededPage from './Pages/BloodNeededPage';

import TimelineDetails from './Components/HomePage/Timeline/TimelineDetailsComponent';
import SignUpComponent from './Components/Others/SignUpComponent';
import ForgotPasswordComponent from './Components/Others/ForgotPasswordComponent';

import { AuthContext } from './context/auth-contex';

import { useAuth } from './hooks/auth-hook';


function App() {




  const {token, login, logout, userId} = useAuth()

  // To send a post request you need to add the token as the header

  // so await sendRequest("localhost:5000/api/appointment", "POST", formData, {Authorization: 'Bearer' + auth.token})
  // Else it will not be able to access the backend

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Home/>} />
        <Route path='find-donor' element={<FindDonor />} />
        <Route path='blood-needed' element={<BloodNeededPage/>} />
        <Route path='news/' element={<TimelineList />} />
        <Route path='news/:news_id/' element={<TimelineDetails />} />
        <Route path='about/' element={<AboutPage />} />
        <Route path='user/dashboard/*' element={<UserDashboardPage/>} />
        <Route path='*' element={<Navigate to='/' />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Home/>} />
        <Route path='find-donor' element={<FindDonor />} />
        <Route path='blood-needed' element={<BloodNeededPage />} />
        <Route path='news/' element={<TimelineList />} />
        <Route path='news/:news_id/' element={<TimelineDetails/>} />
        <Route path='about/' element={<AboutPage />} />
        <Route path='sign-up/' element={<SignUpComponent />} />
        <Route path='forgot-password/' element={<ForgotPasswordComponent />} />
        <Route path='*' element={<Navigate to='/' />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    > 
      
      <div className="flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {routes}
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
      
    </AuthContext.Provider>
  );
  
}

export default App;
