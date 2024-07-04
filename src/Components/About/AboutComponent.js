import React, { useEffect, useRef } from "react";

const AboutComponent = () => {
    const accordionRef = useRef(null);

    useEffect(() => {
        const handleAccordionClick = (event) => {
            const button = event.currentTarget;
            const targetId = button.getAttribute('data-accordion-target');
            const target = document.querySelector(targetId);

            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            target.classList.toggle('hidden');
        };

        const accordionButtons = accordionRef.current.querySelectorAll('[data-accordion-target]');
        accordionButtons.forEach(button => {
            button.addEventListener('click', handleAccordionClick);
        });

        return () => {
            accordionButtons.forEach(button => {
                button.removeEventListener('click', handleAccordionClick);
            });
        };
    }, []);

    return (
        <div className="flex mb-5 mt-5">
            <div className="max-w-screen-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-[400px]">
                <div className="p-5">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">About Us</h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        We are a group of people who wants to help anyone in need to blood emergency.
                    </p>

                    <div id="accordion-open" ref={accordionRef}>
                        <h2 id="accordion-open-heading-1">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                                data-accordion-target="#accordion-open-body-1"
                                aria-expanded="true"
                                aria-controls="accordion-open-body-1"
                            >
                                <span className="flex items-center">Introduction</span>
                                <svg
                                    data-accordion-icon
                                    className="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-open-body-1" className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900" aria-labelledby="accordion-open-heading-1">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                Welcome to Blood Donation, where our mission is to save lives through the power of blood donation. Every day, we strive to make a difference by providing a safe and reliable blood supply to those in need.
                            </p>
                        </div>
                        <h2 id="accordion-open-heading-2">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                                data-accordion-target="#accordion-open-body-2"
                                aria-expanded="false"
                                aria-controls="accordion-open-body-2"
                            >
                                <span className="flex items-center">Our Mission</span>
                                <svg
                                    data-accordion-icon
                                    className="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-open-body-2" className="hidden" aria-labelledby="accordion-open-heading-2">
                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Our mission is to ensure a sufficient and safe blood supply for patients in our community. We are committed to raising awareness about the importance of blood donation and providing a seamless experience for our donors.
                                </p>
                            </div>
                        </div>
                        <h2 id="accordion-open-heading-3">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                                data-accordion-target="#accordion-open-body-3"
                                aria-expanded="false"
                                aria-controls="accordion-open-body-3"
                            >
                                <span className="flex items-center">Our History</span>
                                <svg
                                    data-accordion-icon
                                    className="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-open-body-3" className="hidden" aria-labelledby="accordion-open-heading-3">
                            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Founded in 2024, "Blood Donation" started growing from a small local initiative. Over the years, we hope to collect and distribute thousands of units of blood, helping countless patients.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;
