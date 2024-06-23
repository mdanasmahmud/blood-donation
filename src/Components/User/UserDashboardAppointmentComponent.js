import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-contex";

const UserDashboardAppointmentComponent = () => {
  const auth = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

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

  return (
    <>
      <div className="m-8 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Appointments</h5>
        {appointments.map((appointment) => (
          <div key={appointment._id} className="m-8 flex flex-wrap justify-around mx-auto w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-2 mr-10 text-2xl font-bold text-gray-900 dark:text-white">
              Appointment ID: {appointment._id.slice(-4)}
            </h3>
            <div>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Name: {appointment.patientName}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Blood Group: {appointment.patientBloodGroup}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Location: {appointment.patientLocationText}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Patient Contact: {appointment.patientPhone}</p>
            </div>
            <div className="flex flex-col">
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Preferred Time: {appointment.preferredTime}</p>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Status: {appointment.status}</p>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4"
              >
                Update Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDashboardAppointmentComponent;