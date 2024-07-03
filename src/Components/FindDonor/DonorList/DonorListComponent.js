import React from "react";

const DonorList = ({donorList, setClickedId}) => {
    return(
        <div>
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
                                Map
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donorList.map((donor) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            
                            <td class="px-6 py-4">
                                {donor.donorName}
                            </td>
                            <td class="px-6 py-4">
                                {donor.blood_group}
                            </td>
                            <td class="px-6 py-4">
                                {donor.donorPhone}
                            </td>
                            <td class="px-6">
                            <button onClick={() => setClickedId(donor.location)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                                <span class="sr-only">Donor Details</span>
                            </button>
                            </td>

                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DonorList;