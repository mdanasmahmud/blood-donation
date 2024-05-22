import React from 'react'

import Jumbotron from '../Components/HomePage/Jumbotron/JumbotronComponent';
import HomeStatistics from '../Components/HomePage/Statistics/StatisticsComponent';
import Timeline from '../Components/HomePage/Timeline/TimelineComponent';

function Home(props) {
  return (
    <div>
      <Jumbotron/>
      <HomeStatistics totalDonors={props.totalDonors}/>
      {console.log(props.newsList)}
      <Timeline newsList={props.newsList}/>
    </div>
  );
}

export default Home;
