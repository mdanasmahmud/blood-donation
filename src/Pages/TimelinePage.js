import React from "react";

import TimelineComponent from "../Components/HomePage/Timeline/TimelineComponent";

const TimelineList = (props) => {
    return(
        <>
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">News</h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here are all the news and achievements</p>
            </div>
            <TimelineComponent newsList={props.newsList}/>
        </>
    )
}

export default TimelineList;