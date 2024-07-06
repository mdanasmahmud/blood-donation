import React from "react";

import TimelineComponent from "../Components/HomePage/Timeline/TimelineComponent";
import { CSSTransition } from 'react-transition-group';
import '../../src/Animation/FadeAnimation.css';

const TimelineList = (props) => {
    return(
        <>
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">News</h1>
            </CSSTransition>
            <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here are all the news and achievements</p>
            </CSSTransition>
            </div>
            <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
                <TimelineComponent newsList={props.newsList}/>
            </CSSTransition>
            
        </>
    )
}

export default TimelineList;