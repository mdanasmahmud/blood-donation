import React from "react";

const AboutComponent = () => {
    return (
        <div className="flex items-center justify-center mb-5 mt-5">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Blood Donation</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">We are a group of people who wants to help anyone in need to blood emergency.</p>
            </div>
        </div>
    </div>
    )
}

export default AboutComponent;