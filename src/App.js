import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar/NavbarComponent';
import Footer from './Components/Footer/FooterComponent';

import Home from './Pages/HomePage';
import TimelineList from './Pages/TimelinePage';
// import TimelineDetails from './Components/HomePage/Timeline/TimelineDetailsComponent';
import { AuthContext } from './context/auth-contex';
import { useAuth } from './hooks/auth-hook';

import LoadingComponent from './Components/Others/LoadingComponent';

// Code Splitting

const FindDonor = React.lazy(() => import('./Pages/FindDonor'))
const AboutPage = React.lazy(() => import('./Pages/AboutPage'))
const UserDashboardPage = React.lazy(() => import('./Pages/UserDashboardPage'))
const BloodNeededPage = React.lazy(() => import('./Pages/BloodNeededPage'))
const SignUpComponent = React.lazy(() => import('./Components/Others/SignUpComponent'))
const ForgotPasswordComponent = React.lazy(() => import('./Components/Others/ForgotPasswordComponent'))
const TimelineDetails = React.lazy(() => import('./Components/HomePage/Timeline/TimelineDetailsComponent'))


function App() {




  const {token, login, logout, userId} = useAuth()

  // To send a post request you need to add the token as the header

  // so await sendRequest("localhost:5000/api/appointment", "POST", formData, {Authorization: 'Bearer' + auth.token})
  // Else it will not be able to access the backend

  let routes;

  if (token) {
    routes = (
      <>
        <Route path='/' element={<Home/>} />
        <Route path='find-donor' element={<Suspense fallback={<LoadingComponent/>}><FindDonor /></Suspense>} />
        <Route path='blood-needed' element={<Suspense fallback={<LoadingComponent/>}><BloodNeededPage/></Suspense>} />
        <Route path='news/' element={<TimelineList />} />
        <Route path='news/:news_id/' element={<Suspense fallback={<LoadingComponent/>}><TimelineDetails /></Suspense>} />
        <Route path='about/' element={<Suspense fallback={<LoadingComponent/>}><AboutPage /></Suspense>} />
        <Route path='user/dashboard/*' element={<Suspense fallback={<LoadingComponent/>}><UserDashboardPage/></Suspense>} />
        <Route path='*' element={<Navigate to='/' />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Home/>} />
        <Route path='find-donor' element={<Suspense fallback={<LoadingComponent/>}><FindDonor /></Suspense>} />
        <Route path='blood-needed' element={<Suspense fallback={<LoadingComponent/>}><BloodNeededPage/></Suspense>} />
        <Route path='news/' element={<TimelineList />} />
        <Route path='news/:news_id/' element={<Suspense fallback={<LoadingComponent/>}><TimelineDetails /></Suspense>} />
        <Route path='about/' element={<Suspense fallback={<LoadingComponent/>}><AboutPage /></Suspense>} />
        <Route path='sign-up/' element={<Suspense fallback={<LoadingComponent/>}><SignUpComponent /></Suspense>} />
        <Route path='forgot-password/' element={<Suspense fallback={<LoadingComponent/>}><ForgotPasswordComponent /></Suspense>} />
        <Route path='*' element={<Navigate to='/' />} />
      </>
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
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div class="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,0,0,0.3),rgba(255,255,255,0))]">
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
      </div></div>
      
    </AuthContext.Provider>
  );
  
}

export default App;
