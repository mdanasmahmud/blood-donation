import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const Timeline = () => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/news");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setNewsList(data.news);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {newsList.map((singleNews) => (
                    <React.Fragment key={singleNews.id}>
                        <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{singleNews.newsDate}</time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{singleNews.newsTitle}</h3>
                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{singleNews.shortDescription}</p>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <NavLink to={`/news/${singleNews._id}`}>Learn More</NavLink>
                            </button>
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </div>
    );
}

export default Timeline;