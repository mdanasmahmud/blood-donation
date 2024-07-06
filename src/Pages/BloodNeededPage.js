import React, { useState, useEffect } from 'react';

import BloodNeededListComponent from '../Components/BloodNeeded/BloodNeededListComponent';
import BloodNeededSearchComponent from '../Components/BloodNeeded/BloodNeededSearchComponent';
import BloodNeededDetailsComponent from '../Components/BloodNeeded/BloodNeededDetailsComponent';
import BloodNeededPost from '../Components/BloodNeeded/BloodNeededPost';

import { CSSTransition } from 'react-transition-group';
import '../../src/Animation/FadeAnimation.css';

const BloodNeededPage = () => {
  
  const [searchedText, setSearchedText] = useState('');
  const [patientDetails, setPatientDetails] = useState([]);
  const [clickedPatientId, setClickedPatientId] = useState('');

  useEffect(() => {
  fetch('http://localhost:5000/api/patients/')
    .then(response => response.json())
    .then(data => setPatientDetails(data.patients)) // set the state to the array of patients
    .catch(error => console.error('Error:', error));
}, []);

const patientDetail = patientDetails.filter(patient => 
  patient.patientLocation.includes(searchedText) || 
  patient.patientBloodGroup.includes(searchedText)
);

const patientDeeperDetails = patientDetails.find(patientDeeper =>
  patientDeeper._id === clickedPatientId // use _id as it seems to be the unique identifier
);

  return (
    <div>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <BloodNeededSearchComponent searchedText={searchedText} setSearchedText={setSearchedText} patientDetails={patientDetails}/>
      </CSSTransition>
      <div className='flex justify-center'>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <BloodNeededPost />
      </CSSTransition>

      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <BloodNeededListComponent patientDetails={patientDetail} clickedPatientId={clickedPatientId} setClickedPatientId={setClickedPatientId}/>
      </CSSTransition>
        
        
      </div>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <BloodNeededDetailsComponent patientDeeperDetails = {patientDeeperDetails} setClickedPatientId={setClickedPatientId}/>
      </CSSTransition>
      
    </div>
  );
}

export default BloodNeededPage;