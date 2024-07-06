import React from 'react';
import Jumbotron from '../Components/HomePage/Jumbotron/JumbotronComponent';
import HomeStatistics from '../Components/HomePage/Statistics/StatisticsComponent';
import Timeline from '../Components/HomePage/Timeline/TimelineComponent';
import { CSSTransition } from 'react-transition-group';
import '../../src/Animation/FadeAnimation.css';


function Home() {
  return (
    <div>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <Jumbotron />
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <HomeStatistics />
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <Timeline />
      </CSSTransition>
      
    </div>
  );
}

export default Home;
