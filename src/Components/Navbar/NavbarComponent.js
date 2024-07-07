import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarUserComponent from './NavbarUserComponent';
import bloodLogo from '../../images/blood-logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={bloodLogo} className="h-8" alt="Blood Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <NavLink to='/'>Blood Donation</NavLink>
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:inline-flex"
          >
            <NavLink to='/find-donor'>Find Donor</NavLink>
          </button>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 hidden md:inline-flex"
          >
            <NavLink to='/blood-needed'>Blood Needed</NavLink>
          </button>
          <button
            type="button"
            className="ml-5 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
            <span className="hidden md:inline-flex ml-2">
              <NavLink to='/find-donor' className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Find Donor</NavLink>
            </span>
            <span className="hidden md:inline-flex ml-2">
              <NavLink to='/blood-needed' className="text-gray-900 hover:text-red-700 dark:text-white dark:hover:text-red-500">Blood Needed</NavLink>
            </span>
          </button>
          <NavbarUserComponent />
        </div>

        <div className={`ml-14 items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
              <NavLink
                to='/'
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/news/'
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent"
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/about/'
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent"
              >
                About
              </NavLink>
            </li>
            <li className="md:hidden"> 
              <NavLink to='/find-donor' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                Find Donor
              </NavLink>
            </li>
            <li className="md:hidden"> 
              <NavLink to='/blood-needed' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                Blood Needed
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
