import React, { useState, useContext } from "react";

const UserDashboardAppointmentComponent = () =>{



    return(
    <div className="m-8 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Appointments</h5>
        <div>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Appointment ID: a1</p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Blood Group: A +</p>
        </div>
        <div>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Date: 2024-01-10</p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Time: 10:00 AM</p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Location: City Health Clinic</p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Status: Confirmed</p>
        </div>
      </div>
    )
}

export default UserDashboardAppointmentComponent;