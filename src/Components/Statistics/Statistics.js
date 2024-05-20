import React from "react";

const HomeStatistics = () => {
    return(
        <>
        <div class="flex items-center justify-center">
            
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Amount Of Donors</h5> 
            <p class="font-normal text-gray-700 dark:text-gray-400 text-center">100</p>
            </a>

            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Service Provided</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 text-center">0</p>
            </a>

        </div>
        </>
    );
}

export default HomeStatistics;