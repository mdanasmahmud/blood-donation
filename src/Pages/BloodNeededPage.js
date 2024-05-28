import React, {useState} from 'react'

import BloodNeededListComponent from '../Components/BloodNeeded/BloodNeededListComponent';
import BloodNeededSearchComponent from '../Components/BloodNeeded/BloodNeededSearchComponent';
import BloodNeededDetailsComponent from '../Components/BloodNeeded/BloodNeededDetailsComponent';

const BloodNeededPage = (props) => {
  
  const [searchedText, setSearchedText] = useState('')

  

  // This is for search function

  const patientDetail = props.patientDetails.filter(patient => 
    patient.patientLocation.includes(searchedText) || 
    patient.patientBloodGroup.includes(searchedText)
  )

  // This is for model details function

  const [clickedPatientId, setClickedPatientId] = useState('')

  const patientDeeperDetails = props.patientDetails.find(patientDeeper =>
    patientDeeper.patient_id === clickedPatientId
  )

  return (
    <div>
      
      <BloodNeededSearchComponent searchedText={searchedText} setSearchedText={setSearchedText} patientDetails={props.patientDetails}/>
      
      <BloodNeededListComponent patientDetails={patientDetail} clickedPatientId={clickedPatientId} setClickedPatientId={setClickedPatientId}/>
      
      <BloodNeededDetailsComponent patientDeeperDetails = {patientDeeperDetails} setClickedPatientId={setClickedPatientId}/>
    </div>
  );
}

export default BloodNeededPage;
