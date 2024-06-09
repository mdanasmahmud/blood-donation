import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-contex";

import UserDashboardAppointmentComponent from "./UserDashboardAppointmentComponent";

const UserDashboardComponent = () => {
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
    console.log(editingPatient.id);
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

  return (
    <div>
      <div className="m-8 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">User Details</h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Name: Test Name</p>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Blood Group: A +</p>
      </div>
      <UserDashboardAppointmentComponent />
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
      {/* This modal is to update the post */}
      {isModalOpen && (
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
      )}

      {/* This is for blood donor modal when user wants to check how many blood donor wants to donate blood */}
      {isBloodDonorModalOpen && (
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
                                {donor.DonorEligible}
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
      )}
    </div>
  );
};

export default UserDashboardComponent;
