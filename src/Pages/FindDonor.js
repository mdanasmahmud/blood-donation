import React from 'react'
import DonorList from '../Components/FindDonor/DonorList/DonorListComponent';
import MapComponent from '../Components/FindDonor/MapComponent';

const FindDonor = (props) => {
  return (
    <div className='max-w-screen-xl flex flex-wrap justify-around items-center mx-auto p-4'>
      <MapComponent />
      <DonorList donorList={props.donorList}/>
    </div>
  );
}

export default FindDonor;
