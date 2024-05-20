import React from 'react'

import Navbar from '../Components/Navbar/NavbarComponent';
import Footer from '../Components/Footer/FooterComponent';
import Jumbotron from '../Components/HomePage/Jumbotron/JumbotronComponent';
import HomeStatistics from '../Components/HomePage/Statistics/StatisticsComponent';
import Timeline from '../Components/HomePage/Timeline/TimelineComponent';

function Home() {
  return (
    <div>
      <Jumbotron/>
      <HomeStatistics/>
      <Timeline/>
    </div>
  );
}

export default Home;
