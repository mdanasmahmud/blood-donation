import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const TimelineDetails = () => {
    const { news_id } = useParams();
    const [singleNews, setSingleNews] = useState(null);

    useEffect(() => {
        const fetchNewsDetails = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/news/${news_id}`);
            if (!response.ok) {
                throw new Error('Could not fetch news details');
            }
            const data = await response.json();
            setSingleNews(data.news);
        };

        fetchNewsDetails();
    }, [news_id]);

    if (!singleNews) {
        return <div>News not found</div>;
    }

    return (
        <>
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">News Details</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here is the detailed news</p>
            </div>
            <div className="m-5 flex justify-center">
                <div className="p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{singleNews.newsTitle}</h5>
                    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{singleNews.newsDescription}</p>
                </div>
            </div>
        </>
    );
}

export default TimelineDetails;