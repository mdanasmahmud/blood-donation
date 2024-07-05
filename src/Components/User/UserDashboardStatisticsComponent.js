// Here it will show, 

// 1. Number of appointments
// 2. Number of patient posts
// 3. Recent appointment status
// 4. Number of blood donors for the patient posts

import React, {useContext, useState, useEffect} from "react";

import { AuthContext } from "../../context/auth-contex";

const UserDashboardStatisticsComponent = () => {

    // To get the number of appointments

    const [appointments, setAppointments] = useState([]);

    const auth = useContext(AuthContext)

    useEffect(() => {
        const fetchAppointments = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/appointments/${auth.userId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token,
              }
            });
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            setAppointments(responseData.userAppointments);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchAppointments();
      }, [auth.userId]);

    // This is for counting the patient's posts

    const [patients, setPatients] = useState([]);

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
      }, [auth.userId]);


      // This is to get the number of blood donors in all post

      const totalBloodDonors = patients.reduce((acc, post) => acc + post.blood_donors.length, 0);

    return(
        <div class="flex justify-between">
                {/* Donor Card */}
                <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Appointments</h5> 
                    <div class="flex justify-center items-center h-full">
                        <span class="text-2xl pb-3 text-gray-700 dark:text-gray-400 text-center">{appointments.length}</span>
                    </div>
                </div>
                <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Patients Post</h5> 
                    <div class="flex justify-center items-center h-full">
                        <span class="text-2xl pb-3 text-gray-700 dark:text-gray-400 text-center">{patients.length}</span>
                    </div>
                </div>
                <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Blood Donors</h5> 
                    <div class="flex justify-center items-center h-full">
                        <span class="text-2xl pb-3 text-gray-700 dark:text-gray-400 text-center">{totalBloodDonors}</span>
                    </div>
                </div>
                
            </div>
    )
}

export default UserDashboardStatisticsComponent;