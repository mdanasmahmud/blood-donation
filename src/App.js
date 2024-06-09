import React, { useState, useCallback } from 'react';
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

function App() {

  const donorList = [
    {user_id: 0, donorName: 'Anas Mahmud', blood_group: 'A+', phoneNumber: '123-456-7890', location: [23.74699, 90.37092]},
    {user_id: 1, donorName: 'John Doe', blood_group: 'B+', phoneNumber: '234-567-8901', location: [23.74595, 90.36841]},
    {user_id: 2, donorName: 'Jane Smith', blood_group: 'O+', phoneNumber: '345-678-9012', location: [23.74299, 90.36488]},
    {user_id: 3, donorName: 'Emma Johnson', blood_group: 'AB+', phoneNumber: '456-789-0123', location: [23.73924, 90.36509]},
    {user_id: 4, donorName: 'Robert Brown', blood_group: 'A-', phoneNumber: '567-890-1234', location: [23.73313, 90.37160]},
    {user_id: 5, donorName: 'Olivia Davis', blood_group: 'B-', phoneNumber: '678-901-2345', location: [23.73585, 90.38172]},
    {user_id: 6, donorName: 'William Miller', blood_group: 'O-', phoneNumber: '789-012-3456', location: [23.74169, 90.39520]},
    {user_id: 7, donorName: 'Emily Wilson', blood_group: 'AB-', phoneNumber: '890-123-4567', location: [23.75077, 90.39326]},
]

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

const users = [
   {user_id: 0, userName: 'Anas Mahmud', password:'1234', email:'abid1234@gmail.com'},
   {user_id: 1, userName: 'John Doe', password:'4321', email:'johndoe1234@gmail.com'}
]

const appointments = [
  { appointmentId: "a1", user_id: 0, date: "2024-06-01", time: "10:00 AM", patientLocationText: "Ibn Sina Hospital", patientPhone: "+12345678", status: "Confirmed" },
  { appointmentId: "a2", user_id: 1, date: "2024-06-02", time: "11:00 AM", patientLocationText: "City Health Clinic", patientPhone: "+87654321", status: "Pending" },
  { appointmentId: "a3", user_id: 2, date: "2024-06-03", time: "09:00 AM", patientLocationText: "Downtown Donation Center", patientPhone: "+123123123", status: "Cancelled" },
  { appointmentId: "a4", user_id: 3, date: "2024-06-04", time: "01:00 PM", patientLocationText: "Northside Medical", patientPhone: "+321321321", status: "Confirmed" },
  { appointmentId: "a5", user_id: 0, date: "2024-06-05", time: "03:00 PM", patientLocationText: "West End Clinic", patientPhone: "+456456456", status: "Confirmed" },
  { appointmentId: "a6", user_id: 1, date: "2024-06-06", time: "10:30 AM", patientLocationText: "Eastside Hospital", patientPhone: "+654654654", status: "Pending" },
  { appointmentId: "a7", user_id: 2, date: "2024-06-07", time: "08:00 AM", patientLocationText: "Central Health Center", patientPhone: "+789789789", status: "Confirmed" },
  { appointmentId: "a8", user_id: 3, date: "2024-06-08", time: "12:00 PM", patientLocationText: "Southside Medical Facility", patientPhone: "+987987987", status: "Cancelled" },
  { appointmentId: "a9", user_id: 0, date: "2024-06-09", time: "02:00 PM", patientLocationText: "Main Street Clinic", patientPhone: "+101010101", status: "Confirmed" },
  { appointmentId: "a10", user_id: 1, date: "2024-06-10", time: "11:30 AM", patientLocationText: "Northwest Health Center", patientPhone: "+202020202", status: "Pending" }
];

const [token, setToken] = useState(false);
const [userId, setUserId] = useState(false);

const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
}, []);

const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
}, []);

  // To send a post request you need to add the token as the header

  // so await sendRequest("localhost:5000/api/appointment", "POST", formData, {Authorization: 'Bearer' + auth.token})
  // Else it will not be able to access the backend

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Home newsList={newsList.slice(0, 3)} totalDonors={donorList.length} />} />
        <Route path='find-donor' element={<FindDonor donorList={donorList} />} />
        <Route path='blood-needed' element={<BloodNeededPage/>} />
        <Route path='news/' element={<TimelineList newsList={newsList} />} />
        <Route path='news/:news_id/' element={<TimelineDetails newsList={newsList} />} />
        <Route path='about/' element={<AboutPage />} />
        <Route path='user/dashboard/*' element={<UserDashboardPage appointmentDetails={appointments} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Home newsList={newsList.slice(0, 3)} totalDonors={donorList.length} />} />
        <Route path='find-donor' element={<FindDonor donorList={donorList} />} />
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
      }}>
      <Router>
        <Navbar userList={users} />
        <Routes>
          {routes}
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
