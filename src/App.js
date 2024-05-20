import React from 'react'

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Jumbotron from './Components/Jumbotron/Jumbotron';
import HomeStatistics from './Components/Statistics/Statistics';
import Timeline from './Components/Timeline/Timeline';

function App() {
  return (
    <div>
      <Navbar/>
      <Jumbotron/>
      <HomeStatistics/>
      <Timeline/>
      <Footer/>
    </div>
  );
}

export default App;
