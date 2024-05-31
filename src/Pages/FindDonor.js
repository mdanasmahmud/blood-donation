import React, {useState} from 'react'
import DonorList from '../Components/FindDonor/DonorList/DonorListComponent';
import MapComponent from '../Components/FindDonor/MapComponent';

const FindDonor = (props) => {

  const [clickedId, setClickedId] = useState('')

  const locationList = props.donorList.map(donor => donor.location);

  return (
    <div className='max-w-screen-xl flex flex-wrap justify-around items-center mx-auto p-4'>
      <MapComponent location={clickedId} allLocations={locationList}/>
      <DonorList donorList={props.donorList} setClickedId={setClickedId}/>
    </div>
  );
}

export default FindDonor;
