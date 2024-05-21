import React from "react";
import { useParams } from 'react-router-dom';

const TimelineDetails = (props) => {
    const { news_id } = useParams();
    const singleNews = props.newsList.find(news => news.news_id === Number(news_id));

    if (!singleNews) {
        return <div>News not found</div>;
    }

    return (
        <div>
            <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{singleNews.newsTitle}</h5>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{singleNews.newsDescription}</p>
            </div>
        </div>
    )
}

export default TimelineDetails;