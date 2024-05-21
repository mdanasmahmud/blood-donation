import React from "react";
import TimelineDetails from "./TimelineDetailsComponent";

import  {NavLink} from 'react-router-dom'

const Timeline = (props) => {
    return(
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
                {props.newsList.map((singleNews) => (
                    <>
                    <li class="mb-10 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{singleNews.newsDate}</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{singleNews.newsTitle}</h3>
                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{singleNews.shortDescription}</p>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><NavLink to={`/news/${singleNews.news_id}`}>Learn More</NavLink></button>
                    </li>
                    </>
                ))}
            </ol>
        </div>
    );
}

export default Timeline;