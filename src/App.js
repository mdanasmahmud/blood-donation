import React from 'react'
import {BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom'

import Navbar from './Components/Navbar/NavbarComponent';
import Footer from './Components/Footer/FooterComponent';

import Home from './Pages/HomePage';
import FindDonor from './Pages/FindDonor';

function App() {

  const donorList = [
    {user_id: 0, donorName: 'Anas Mahmud', blood_group: 'A+'},
    {user_id: 1, donorName: 'John Doe', blood_group: 'B+'},
    {user_id: 2, donorName: 'Jane Smith', blood_group: 'O+'},
    {user_id: 3, donorName: 'Emma Johnson', blood_group: 'AB+'},
    {user_id: 4, donorName: 'Robert Brown', blood_group: 'A-'},
    {user_id: 5, donorName: 'Olivia Davis', blood_group: 'B-'},
    {user_id: 6, donorName: 'William Miller', blood_group: 'O-'},
    {user_id: 7, donorName: 'Emily Wilson', blood_group: 'AB-'},
]

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/find-donor/' element={<FindDonor donorList={donorList}/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;