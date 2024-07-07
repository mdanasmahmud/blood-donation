import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth-contex";

const UserDashboardStatisticsComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const auth = useContext(AuthContext);

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
  }, [auth.userId, auth.token]);

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
  }, [auth.userId, auth.token]);

  const totalBloodDonors = patients.reduce((acc, post) => acc + post.blood_donors.length, 0);

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="block w-full md:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:whitespace-nowrap">User's Appointments</h5>
        <div className="flex justify-center items-center h-full">
          <span className="text-2xl pb-3 text-gray-700 dark:text-gray-400 text-center">{appointments.length}</span>
        </div>
      </div>
      <div className="block w-full md:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:whitespace-nowrap">User's Patients</h5>
        <div className="flex justify-center items-center h-full">
          <span className="text-2xl pb-3 text-gray-700 dark:text-gray-400 text-center">{patients.length}</span>
        </div>
      </div>
      <div className="block w-full md:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:whitespace-nowrap">Applied Donors</h5>
        <div className="flex justify-center items-center h-full">
          <span className="text-2xl pb-3 text-gray-700 dark:text-gray-400 text-center">{totalBloodDonors}</span>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardStatisticsComponent;
