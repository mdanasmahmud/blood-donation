import React from 'react'

import AboutComponent from '../Components/About/AboutComponent';
import UserContact from '../Components/About/UserContact';

const AboutPage = (props) => {
  return (
    <div className='flex justify-center space-x-5 mt-5 space-y-11'>
        <AboutComponent />
        <UserContact />
    </div>
  );
}

export default AboutPage;
