import React from 'react'
import {BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom'

import Navbar from './Components/Navbar/NavbarComponent';
import Footer from './Components/Footer/FooterComponent';

import Home from './Pages/HomePage';
import FindDonor from './Pages/FindDonor';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/find-donor/' element={<FindDonor/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;