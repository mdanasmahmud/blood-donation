import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-contex";

import { CSSTransition } from 'react-transition-group';
import '../../Animation/FadeAnimation.css';

const UserDashboardPatientsComponent = () => {
  const auth = useContext(AuthContext);

  const [updateLocation, setUpdateLocation] = useState('');
  const [updateContact, setUpdateContact] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // When user presses the Blood donor modal to check each blood donors that are willing to stay
  const [isBloodDonorModalOpen, setIsBloodDonorModalOpen] = useState(false)
  const [patientBloodDonors, setPatientBloodDonors] = useState({})


  const [editingPatient, setEditingPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const updatePatientDetails = async () => {
    // console.log(editingPatient.id);
    const response = await fetch("http://localhost:5000/api/patients/updatePatient", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        patient_id: editingPatient.id,
        patientLocation: updateLocation,
        patientContact: updateContact,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update patient details");
    }
    setEditingPatient(null);
    setIsModalOpen(false);
    setUpdateTrigger(!updateTrigger);
    const data = await response.json();
  };

  const deletePatientDetails = async (patientId) => {
    const response = await fetch("http://localhost:5000/api/patients/patientDelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        patient_id: patientId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete patient details");
    }
    setUpdateTrigger(!updateTrigger);
    const data = await response.json();
  };

  const openPatientBloodDonorModal = (bloodDonors) => {
    setPatientBloodDonors(bloodDonors)
    setIsBloodDonorModalOpen(true)
  }

  const closePatientBloodDonorModal = () => {
    setIsBloodDonorModalOpen(false)
  }

  const openModal = (patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingPatient(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:5000/api/patients/patientUserPosted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + auth.token,
        },
        body: JSON.stringify({ userPosted: auth.userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      setPatients(data.userPatients);
    };

    fetchPatients();
  }, [auth.userId, updateTrigger]);

  // This is for user eligible form

  const [userEligibleForm, setUserEligibleForm] = useState()

  const eligibleFormHandler = (userEligibleData) => {
    setUserEligibleForm(userEligibleData)
  }

  return (
    

    
    <div>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
      <div className="m-8 max-w-screen-xl flex  flex-wrap items-center justify-between mx-auto w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Patients</h5>
        
        {patients.map((patient) => (
          <div key={patient.id} className="m-8 flex flex-wrap justify-around mx-auto w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-2 mr-10 text-2xl font-bold text-gray-900 dark:text-white">
              Patient ID: {patient.id.slice(-4)}
            </h3>
            <div>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Name: {patient.patientName}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Blood Group: {patient.patientBloodGroup}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Location: {patient.patientLocation}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Contact: {patient.patientContact}</p>
            </div>
            <div className="flex flex-col">
              <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4" onClick={() => openPatientBloodDonorModal(patient.blood_donors)} >Blood Donors</button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4"
                  onClick={() => openModal(patient)}
                >
                  Update Post
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => deletePatientDetails(patient.id)}
                >
                  Delete Post
                </button>
            </div>
          </div>
        ))}
        
        
      </div>
      </CSSTransition>
      
      {/* This modal is to update the post */}
      {isModalOpen && (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-black opacity-50"></div>
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-50">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Patient Details
              </h3>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="patient_name"
                  id="patient_name"
                  value={updateLocation}
                  onChange={(e) => setUpdateLocation(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="patient_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  New Location
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="blood_group"
                  id="blood_group"
                  value={updateContact}
                  onChange={(e) => setUpdateContact(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="blood_group"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Contact Number
                </label>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={updatePatientDetails}
              >
                Apply
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </CSSTransition>
      )}

      {/* This is for blood donor modal when user wants to check how many blood donor wants to donate blood */}
      {isBloodDonorModalOpen && (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-black opacity-50"></div>
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-50">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Blood Donor Details
              </h3>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="relative z-0 w-full mb-5 group">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            
                            <th scope="col" class="px-6 py-3">
                                Donor Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Blood Group
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Eligible
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                          {patientBloodDonors.map((donor, index) => (
                            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            
                            <td class="px-6 py-4">
                                {donor.donorName}
                            </td>
                            <td class="px-6 py-4">
                                {donor.donorBloodGroup}
                            </td>
                            <td class="px-6 py-4">
                                {donor.donorPhone}
                            </td>
                            <td class="px-6 py-4">
                            <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => eligibleFormHandler(donor.DonorEligible)}>Form</button>
                            </td>
                            
                          </tr>
                          ))}
                        
                    </tbody>
                </table>
            </div>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => closePatientBloodDonorModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </CSSTransition>
      )}

      {/* This is eligible form */}
      {userEligibleForm && 
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
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
                            <input value={userEligibleForm.name} type="text" name="name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.phone} name="phone" id="floating_phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disable />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                        </div>
                    </div>


                    {/* This is for selecting blood group */}
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <form class="max-w-sm mx-auto">
                                <label for="bloodGroup" class="sr-only">Blood Group</label>
                                <select id="bloodGroup" name="bloodGroup" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={userEligibleForm.bloodGroup} disabled>
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
                            
                            <input value={userEligibleForm.lastBloodDonation} name="lastBloodDonation" id="lastBloodDonation" type="date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="lastBloodDonation" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Blood Donation</label>
                        </div>
                    </div>
                    {/* Asking for pre existing conditions */}
                    <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.preExistingCondition} name="preExistingCondition" id="preExistingCondition" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="preExistingCondition" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pre-existing conditions (e.g., heart disease, diabetes)</label>
                        </div>
                    </div>

                    {/* Asking for surgeries or medical procedures */}
                    <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.recentSurgeries} name="recentSurgeries" id="recentSurgeries" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="recentSurgeries" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Recent surgeries or medical procedures.</label>
                        </div>
                    </div>

                    {/* Asking for blood disorder */}
                    <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.bloodDisorders} name="bloodDisorders" id="bloodDisorders" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="bloodDisorders" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Do you have any blood disorders (e.g., hemophilia, sickle cell disease)</label>
                        </div>
                    </div>

                    {/* Medicine Prescribed */}
                    <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.prescribedMedicine} name="prescribedMedicine" id="prescribedMedicine" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Do you take any Prescribed medicine? </label>
                        </div>
                    </div>



                    
                    <div class="relative z-0 w-full mb-5 group">

                      {/* Asking if they experienced any infections, fevers, or flu-like symptoms in the past four weeks? */}
                      

                      <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.fluLikeSymptoms == true ? 'Yes' : 'No'} name="prescribedMedicine" id="prescribedMedicine" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Any flu-like symptoms in the past 4 weeks? </label>
                        </div>
                      </div>

                      
                      {/* Have you received any vaccinations in the past four weeks? */}

                      <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.vaccinations == true ? 'Yes' : 'No'} name="prescribedMedicine" id="prescribedMedicine" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Any vaccinations in the past 4 weeks? </label>
                        </div>
                      </div>
                      

                      {/* Have you traveled outside the country in the past 12 months?*/}

                      <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.antibiotics == true ? 'Yes' : 'No'} name="prescribedMedicine" id="prescribedMedicine" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Any antibiotics taken in the past 2 weeks? </label>
                        </div>
                      </div>

                        {/* Ever had positive test for HIV, Hepatitis B or C?*/}
                      
                      <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.hivHepatitis == true ? 'Yes' : 'No'} name="prescribedMedicine" id="prescribedMedicine" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ever had positive test for HIV, Hepatitis B or C? </label>
                        </div>
                      </div>

                        {/* Any pregnancy in the last 6 weeks?*/}


                        <div class="relative z-0 w-full mb-5 group">
                        <div class="relative z-0 w-full mb-5 group">
                            <input value={userEligibleForm.pregnancy == true ? 'Yes' : 'No'} name="prescribedMedicine" id="prescribedMedicine" type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled />
                            <label for="prescribedMedicine" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Currently pregnent or any pregnancy in the last 6 weeks? </label>
                        </div>
                      </div>
                        
                    </div>
                    


                    </form>

        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        
          <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setUserEligibleForm()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
    </CSSTransition>
      }
    </div>
    
  );
};

export default UserDashboardPatientsComponent;