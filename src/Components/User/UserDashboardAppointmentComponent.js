import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-contex";

import { CSSTransition } from 'react-transition-group';
import '../../Animation/FadeAnimation.css';

const UserDashboardAppointmentComponent = () => {
  const auth = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

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
  }, [auth.userId, updateTrigger]);

  // This is for updating the appointments

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const [selectAppointmentId, setSelectAppointmentId] = useState('')

  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');

  const appointmentModalOpen = (appointment) => {
    setIsAppointmentModalOpen(true)
    setSelectAppointmentId(appointment._id); // Set the selected appointment ID
    setAppointmentDateTime(appointment.preferredTime); // Set the default appointment date and time
    setAppointmentStatus(appointment.status);
  }

  const appointmentModalClose = () => {
    setIsAppointmentModalOpen(false)
  }

  const updateAppointmentHandler = async () => {
    console.log(appointmentStatus)
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/updateAppointment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token,
        },
        body: JSON.stringify({
          appointmentId: selectAppointmentId,
          preferredTime: appointmentDateTime,
          status: appointmentStatus
        })
      })
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      console.log('Appointment Update Successfull')
      setUpdateTrigger(prev => !prev);
      appointmentModalClose()
    }
    catch (err){
      console.log(err)
    }
  }
  

  return (
    <>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        
      
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
                onClick={() => appointmentModalOpen(appointment)}
              >
                Update Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
      </CSSTransition>
      {/* This modal is to update the appointments */}
      {isAppointmentModalOpen && (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-black opacity-50"></div>
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-50">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Appointment Details
              </h3>
            </div>
            <div className="p-4 md:p-5 space-y-4">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="datetime-local"
                name="appointmentDateTime"
                id="appointmentDateTime"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={appointmentDateTime}
                onChange={(e) => setAppointmentDateTime(e.target.value)}
                required
              />
              <label
                htmlFor="appointmentDateTime"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Appointment Date & Time
              </label>
            </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  value={appointmentStatus}
                  onChange={(e) => (setAppointmentStatus(e.target.value))}
                  name="appointmentStatus"
                  id="appointmentStatus"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option value="" disabled selected>Select your option</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Available">Not Available</option>
                </select>
                <label
                  htmlFor="appointmentStatus"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Status
                </label>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={updateAppointmentHandler }
              >
                Update
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={appointmentModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </CSSTransition>
      )}
    </>
  );
};

export default UserDashboardAppointmentComponent;