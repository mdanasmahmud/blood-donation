import React, { useState, useCallback, useEffect } from 'react';
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

let logoutTimer;

function App() {

const newsList = [
  {news_id: 0, newsTitle: 'Created Website', shortDescription: 'This Website will act to help people who are in need of blood', newsDate: '10-23-2021', newsDescription: 'This Website will act to help people who are in need of blood. This took me a lot of time to think of', newsAuthor: 'Anas'},
  {news_id: 1, newsTitle: 'Will Deploy', shortDescription: 'Will Deploy this website', newsDate: '10-21-2021', newsDescription: 'Lot of things need to be made for this website to work.', newsAuthor: 'Anas'},
  {news_id: 2, newsTitle: 'Website Launched', shortDescription: 'Our website is now live!', newsDate: '10-24-2021', newsDescription: 'Our website is now live! We are excited to start our journey.', newsAuthor: 'Anas'},
  {news_id: 3, newsTitle: 'First Donation', shortDescription: 'We have received our first blood donation', newsDate: '10-25-2021', newsDescription: 'We have received our first blood donation. This is a big step for us.', newsAuthor: 'Anas'},
  {news_id: 4, newsTitle: 'Partnership Announcement', shortDescription: 'We have partnered with a local hospital', newsDate: '10-26-2021', newsDescription: 'We have partnered with a local hospital to ensure the safety of our donors and recipients.', newsAuthor: 'Anas'},
  {news_id: 5, newsTitle: 'New Features', shortDescription: 'New features have been added to the website', newsDate: '10-27-2021', newsDescription: 'New features have been added to the website to improve user experience.', newsAuthor: 'Anas'},
  {news_id: 6, newsTitle: 'Success Story', shortDescription: 'Read about our latest success story', newsDate: '10-28-2021', newsDescription: 'Read about our latest success story. This is why we do what we do.', newsAuthor: 'Anas'},
  {news_id: 7, newsTitle: 'Donor Appreciation Day', shortDescription: 'Celebrating our donors', newsDate: '10-29-2021', newsDescription: 'Celebrating our donors who make this all possible. Thank you for your generosity.', newsAuthor: 'Anas'},
  {news_id: 8, newsTitle: 'Improved Search', shortDescription: 'We have improved our donor search feature', newsDate: '10-30-2021', newsDescription: 'We have improved our donor search feature to help you find a match faster.', newsAuthor: 'Anas'},
  {news_id: 9, newsTitle: 'Mobile App Launch', shortDescription: 'Our mobile app is now available', newsDate: '10-31-2021', newsDescription: 'Our mobile app is now available. Download it today to stay updated.', newsAuthor: 'Anas'},
  {news_id: 10, newsTitle: 'Year End Review', shortDescription: 'Looking back at our achievements this year', newsDate: '11-01-2021', newsDescription: 'Looking back at our achievements this year. We couldnt have done it without you.', newsAuthor: 'Anas'},
];

const [token, setToken] = useState(false);
const [tokenExpirationDate, setTokenExpirationDate] = useState()
const [userId, setUserId] = useState(false);

const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, expiration: tokenExpirationDate.toISOString()}))
}, []);

const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
}, []);

useEffect(() => {
  if (token && tokenExpirationDate){
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
    logoutTimer = setTimeout(logout, remainingTime)
  }else{
    clearTimeout(logoutTimer)
  }
}, [token, logout, tokenExpirationDate])

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
    login(storedData.userId, storedData.token, new Date(storedData.expiration))
  }
}, [login])

  // To send a post request you need to add the token as the header

  // so await sendRequest("localhost:5000/api/appointment", "POST", formData, {Authorization: 'Bearer' + auth.token})
  // Else it will not be able to access the backend

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Home newsList={newsList.slice(0, 3)} totalDonors={0} />} />
        <Route path='find-donor' element={<FindDonor />} />
        <Route path='blood-needed' element={<BloodNeededPage/>} />
        <Route path='news/' element={<TimelineList newsList={newsList} />} />
        <Route path='news/:news_id/' element={<TimelineDetails newsList={newsList} />} />
        <Route path='about/' element={<AboutPage />} />
        <Route path='user/dashboard/*' element={<UserDashboardPage/>} />
        <Route path='*' element={<Navigate to='/' />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Home newsList={newsList.slice(0, 3)} totalDonors={0} />} />
        <Route path='find-donor' element={<FindDonor />} />
        <Route path='blood-needed' element={<BloodNeededPage />} />
        <Route path='news/' element={<TimelineList newsList={newsList} />} />
        <Route path='news/:news_id/' element={<TimelineDetails newsList={newsList} />} />
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
