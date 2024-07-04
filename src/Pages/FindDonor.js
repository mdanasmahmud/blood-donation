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
    <>
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Blood Donors</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here are all the blood donors </p>
      </div>
      <div className='max-w-screen-xl flex flex-wrap justify-around mx-auto p-4'>
      
      <MapComponent setRefreshDonorList={setRefreshDonorList} location={clickedId} allLocations={locationList}/>
      <DonorList donorList={bloodDonorList} setClickedId={setClickedId}/>
    </div>
    </>
    
  );
}

export default FindDonor;
