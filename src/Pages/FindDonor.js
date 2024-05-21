import React from 'react'
import DonorList from '../Components/FindDonor/DonorList/DonorListComponent';

const FindDonor = (props) => {
  return (
    <DonorList donorList={props.donorList}/>
  );
}

export default FindDonor;
