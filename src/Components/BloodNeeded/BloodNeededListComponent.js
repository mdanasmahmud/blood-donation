import React from 'react'

const BloodNeededListComponent = ({patientDetails, setClickedPatientId}) => {


  return (
    <div className='max-w-screen-xl m-3'>
        <div class="ml-auto max-w-screen-md m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Patient Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Blood Group
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientDetails.map((patient) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {patient.patientName}
                            </th>
                            <td class="px-6 py-4">
                                {patient.patientBloodGroup}
                            </td>
                            <td class="px-6 py-4">
                                {patient.patientLocation}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" 
                                
                                onClick={(e) => {
                                    e.preventDefault();
                                    setClickedPatientId(patient.patient_id);
                                  }}
                                
                                >Details</a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>


    </div>
  );
}

export default BloodNeededListComponent;
