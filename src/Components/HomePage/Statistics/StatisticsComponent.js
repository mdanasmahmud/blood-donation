import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const HomeStatistics = () => {
    const [bloodDonorList, setBloodDonorList] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]); 

    // To fetch the donors
    useEffect(() => {
        const fetchDonors = async () => {
            if (bloodDonorList.length === 0) {
                try {
                    const response = await fetch(`http://localhost:5000/api/blood-donors/`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setBloodDonorList(data.donors);
                } catch (error) {
                    console.error('Error fetching donors:', error);
                }
            }
        };
    
        fetchDonors();
    }, []);

    // To fetch the patient's
    useEffect(() => {
        if (patientDetails.length === 0){
            fetch('http://localhost:5000/api/patients/')
            .then(response => response.json())
            .then(data => setPatientDetails(data.patients))
            .catch(error => console.error('Error:', error));
        }
    }, []);

    return (
        <>
            <div class="flex items-center justify-center">
                {/* Donor Card */}
                <Link to="/find-donor" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Donors</h5> 
                    <div class="flex justify-center items-center h-full">
                        <span class="text-2xl text-gray-700 dark:text-gray-400 text-center">{bloodDonorList.length}</span>
                    </div>
                </Link>

                {/* Patient Card */}
                <Link to="/blood-needed" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Patients</h5>
                    <div class="flex justify-center items-center h-full">
                        <span class="text-2xl text-gray-700 dark:text-gray-400 text-center">{patientDetails.length}</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default HomeStatistics;