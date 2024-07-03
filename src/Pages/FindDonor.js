import React, {useEffect, useState} from 'react'
import DonorList from '../Components/FindDonor/DonorList/DonorListComponent';
import MapComponent from '../Components/FindDonor/MapComponent';

const FindDonor = () => {

  const [bloodDonorList, setBloodDonorList] = useState([])
  const [clickedId, setClickedId] = useState('')
  const [refreshDonorList, setRefreshDonorList] = useState(false)

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blood-donors/`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json();
        console.log(data)
        setBloodDonorList(data.donors);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
  
    fetchDonors();
  }, [refreshDonorList]);

  console.log(bloodDonorList)
  //const locationList = props.donorList.map(donor => donor.location);
  const locationList = bloodDonorList.map(donor => donor.location);

  console.log(clickedId)

  return (
    <div className='max-w-screen-xl flex flex-wrap justify-around items-center mx-auto p-4'>
      <MapComponent setRefreshDonorList={setRefreshDonorList} location={clickedId} allLocations={locationList}/>
      <DonorList donorList={bloodDonorList} setClickedId={setClickedId}/>
    </div>
  );
}

export default FindDonor;
