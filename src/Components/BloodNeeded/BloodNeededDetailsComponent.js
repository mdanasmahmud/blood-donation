import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth-contex';

const BloodNeededDetailsComponent = ({ patientDeeperDetails, setClickedPatientId }) => {

  const auth = useContext(AuthContext)

  const [applyBloodDonateFlag, setApplyBloodDonateFlag] = useState(false);
  const [isEligible, setIsEligible] = useState(null); // To store eligibility result

  useEffect(() => {
    setClickedPatientId('');
    
  }, [applyBloodDonateFlag]);

  const applyHandler = () => {
    setApplyBloodDonateFlag(patientDeeperDetails);
  };

  const [submitEligibleForm, setSubmitEligibleForm] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    lastBloodDonation: '',
    preExistingCondition: '',
    recentSurgeries: '',
    bloodDisorders: '',
    prescribedMedicine: '',
    fluLikeSymptoms: false,
    vaccinations: false,
    antibiotics: false,
    hivHepatitis: false,
    pregnancy: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubmitEligibleForm({
      ...submitEligibleForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const calculateEligibility = () => {
    // Add your eligibility logic here
    const {
      lastBloodDonation,
      fluLikeSymptoms,
      vaccinations,
      antibiotics,
      hivHepatitis,
      pregnancy
    } = submitEligibleForm;

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const isEligible = new Date(lastBloodDonation) <= sixMonthsAgo &&
      !fluLikeSymptoms &&
      !vaccinations &&
      !antibiotics &&
      !hivHepatitis &&
      !pregnancy;

    setIsEligible(isEligible ? 'Yes' : 'No');
  };

  const handleSubmit = async () => {
    calculateEligibility();

    const donorData = {
      donorUserID: 'sdasd',
      donorName: submitEligibleForm.name,
      donorBloodGroup: submitEligibleForm.bloodGroup,
      donorPhone: submitEligibleForm.phone,
      DonorEligible: isEligible
    };
    // console.log('Here is the patientDeeperDetails')
    // console.log(applyBloodDonateFlag)

    try {
      const response = await fetch(`http://localhost:5000/api/patients/addDonor/${applyBloodDonateFlag._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + auth.token
        },
        body: JSON.stringify(donorData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setSubmitEligibleForm('')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {patientDeeperDetails && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div class="absolute w-full h-full bg-black opacity-50"></div>
          <div class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-50">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Patient Details
              </h3>
              
            </div>

            <div class="p-4 md:p-5 space-y-4">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Name: {patientDeeperDetails.patientName}
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Location: {patientDeeperDetails.patientLocation}
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Blood Group: {patientDeeperDetails.patientBloodGroup}
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Contact Number: {patientDeeperDetails.patientContact}
              </p>
            </div>

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={applyHandler}>
                Apply
              </button>
              <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setClickedPatientId('')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {applyBloodDonateFlag && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
          <div class="absolute w-full h-full bg-black opacity-50"></div>
          <div class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-50">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Eligible Form
              </h3>
              
            </div>
            
            <form class="max-w-md my-5 ml-5">
                        {/* Name and phone number */}
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input onChange={handleInputChange} type="text" name="name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input onChange={handleInputChange} name="phone" id="floating_phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                            </div>
                        </div>


                        {/* This is for selecting blood group */}
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <form class="max-w-sm mx-auto">
                                    <label for="bloodGroup" class="sr-only">Blood Group</label>
                                    <select id="bloodGroup" name="bloodGroup" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={handleInputChange}>
                                        <option selected>Select your blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </form>
                            
                            </div>
                            {/* Last blood donation date */}
                            <div class="relative z-0 w-full mb-5 group">
                                
                                <input name="lastBloodDonation" id="lastBloodDonation" onChange={handleInputChange} type="date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                                <label for="lastBloodDonation" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Blood Donation</label>
                            </div>
                        </div>
                        {/* Asking for pre existing conditions */}
                        <div class="relative z-0 w-full mb-5 group">
                            <div class="relative z-0 w-full mb-5 group">
                                <input name="preExistingCondition" id="preExistingCondition" onChange={handleInputChange} type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="preExistingCondition" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pre-existing conditions (e.g., heart disease, diabetes)</label>
                            </div>
                        </div>

                        {/* Asking for surgeries or medical procedures */}
                        <div class="relative z-0 w-full mb-5 group">
                            <div class="relative z-0 w-full mb-5 group">
                                <input name="recentSurgeries" id="recentSurgeries" onChange={handleInputChange} type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="recentSurgeries" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Recent surgeries or medical procedures.</label>
                            </div>
                        </div>

                        {/* Asking for blood disorder */}
                        <div class="relative z-0 w-full mb-5 group">
                            <div class="relative z-0 w-full mb-5 group">
                                <input name="bloodDisorders" id="bloodDisorders" onChange={handleInputChange} type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="bloodDisorders" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Do you have any blood disorders (e.g., hemophilia, sickle cell disease)</label>
                            </div>
                        </div>

                        {/* Medicine Prescribed */}
                        <div class="relative z-0 w-full mb-5 group">
                            <div class="relative z-0 w-full mb-5 group">
                                <input name="prescribedMedicine" id="prescribedMedicine" onChange={handleInputChange} type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Do you take any Prescribed medicine? </label>
                            </div>
                        </div>



                        <h2 class="text-left mb-3 text-1xl font-extrabold tracking-tight text-gray-900 dark:text-white">Toggle the answers (Gray = no, Blue = yes)</h2>
                        <div class="relative z-0 w-full mb-5 group">

                          {/* Asking if they experienced any infections, fevers, or flu-like symptoms in the past four weeks? */}
                          <div class="relative z-0 w-full mb-5 group">
                                <label class="inline-flex items-center cursor-pointer">
                                    <span class="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Any flu-like symptoms in the past 4 weeks? </span>
                                    <input id="fluLikeSymptoms" name="fluLikeSymptoms" onChange={handleInputChange} type="checkbox" value="" class="sr-only peer"/>
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                          
                          {/* Have you received any vaccinations in the past four weeks? */}
                          <div class="relative z-0 w-full mb-5 group">
                                <label class="inline-flex items-center cursor-pointer">
                                    <span class="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Any vaccinations in the past 4 weeks? </span>
                                    <input id="vaccinations" name="vaccinations" onChange={handleInputChange} type="checkbox" value="" class="sr-only peer"/>
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                          

                          {/* Have you traveled outside the country in the past 12 months?*/}
                          <div class="relative z-0 w-full mb-5 group">
                                <label class="inline-flex items-center cursor-pointer">
                                    <span class="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Any antibiotics taken in the past 2 weeks? </span>
                                    <input id="antibiotics" name="antibiotics" onChange={handleInputChange} type="checkbox" value="" class="sr-only peer"/>
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Ever had positive test for HIV, Hepatitis B or C?*/}
                          <div class="relative z-0 w-full mb-5 group">
                                <label class="inline-flex items-center cursor-pointer">
                                    <span class="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Ever had positive test for HIV, Hepatitis B or C? </span>
                                    <input id="hivHepatitis" name="hivHepatitis" onChange={handleInputChange} type="checkbox" value="" class="sr-only peer"/>
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Any pregnancy in the last 6 weeks?*/}
                          <div class="relative z-0 w-full mb-5 group">
                                <label class="inline-flex items-center cursor-pointer">
                                    <span class="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Currently pregnent or any pregnancy in the last 6 weeks? </span>
                                    <input id="pregnancy" name="pregnancy" onChange={handleInputChange} type="checkbox" value="" class="sr-only peer"/>
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>



                
                            
                        </div>
                        

    
                        </form>

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>
                Submit
              </button>
              <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setApplyBloodDonateFlag(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BloodNeededDetailsComponent;