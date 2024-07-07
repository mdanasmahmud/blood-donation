import React, {useEffect, useState} from "react";

const UserDetailsComponent = ({userId, userToken}) => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + userToken,
                    },
                });

                if (!response.ok) {
                    throw new Error("Fetching user data failed");
                }

                const data = await response.json();
                const { user } = data;
                setUserName(user.userName)
                setUserEmail(user.email)

            } catch (error) {
                console.error("An error occurred while fetching user data:", error);
            }
        }
        fetchUserDetails();
    }, [userId])


    return(
        <div className="m-4 sm:m-8 max-w-screen-md flex flex-wrap items-center justify-between mx-auto w-full p-6 sm:p-8 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">User Details</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Name: {userName}</p>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Email: {userEmail}</p>
        </div>
    )
}

export default UserDetailsComponent