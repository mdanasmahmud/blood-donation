import React from 'react';

const BloodNeededListComponent = ({ patientDetails, setClickedPatientId }) => {
  return (
    <div className="w-full max-w-screen-md mx-auto p-3">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 sm:px-6 py-3">
                  Patient Name
                </th>
                <th scope="col" className="px-2 sm:px-6 py-3">
                  Blood Group
                </th>
                <th scope="col" className="px-2 sm:px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-2 sm:px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {patientDetails.map((patient) => (
                <tr
                  key={patient._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-2 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {patient.patientName}
                  </th>
                  <td className="px-2 sm:px-6 py-4">{patient.patientBloodGroup}</td>
                  <td className="px-2 sm:px-6 py-4">{patient.patientLocation}</td>
                  <td className="px-2 sm:px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setClickedPatientId(patient._id);
                      }}
                    >
                      Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodNeededListComponent;
