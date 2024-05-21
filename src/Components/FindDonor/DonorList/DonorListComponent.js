import React from "react";

const DonorList = (props) => {
    return(
        <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Donor ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Donor Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Donor Blood Group
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.donorList.map((donor) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {donor.user_id}
                            </th>
                            <td class="px-6 py-4">
                                {donor.donorName}
                            </td>
                            <td class="px-6 py-4">
                                {donor.blood_group}
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