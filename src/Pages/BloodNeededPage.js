import React, {useState} from 'react'

import BloodNeededListComponent from '../Components/BloodNeeded/BloodNeededListComponent';
import BloodNeededSearchComponent from '../Components/BloodNeeded/BloodNeededSearchComponent';

const BloodNeededPage = (props) => {
  

  const [searchedText, setSearchedText] = useState('')

  const patientDetail = props.patientDetails.filter(patient => 
    patient.patientLocation.includes(searchedText) || 
    patient.patientBloodGroup.includes(searchedText)
  )

  console.log(patientDetail)

  return (
    <div>
    <BloodNeededSearchComponent searchedText={searchedText} setSearchedText={setSearchedText} patientDetails={props.patientDetails}/>
    <BloodNeededListComponent patientDetails={patientDetail}/>
    </div>
  );
}

export default BloodNeededPage;
