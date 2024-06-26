import React, {useState, useEffect} from "react";

const BecomeDonorComponent = ({userId, userToken, setShowModal}) => {

    const [donorDetails, setDonorDetails] = useState({
        donorName: '',
        donorBloodGroup: '',
        donorContactNumber: ''
    })

    // This is to fetch the current user Details if he/she wants to be a donor

    useEffect(() => {
        const fetchUserDetails = async () => {
          try{
            const response = await fetch(`http://localhost:5000/api/users/${userId}`,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + userToken,
              }
            })
            if(!response.ok){
              throw new Error("Failed to get the user details")
            }
            const data = await response.json()

            const { userProfile, userMedicalProfile } = data.user
            
            setDonorDetails({
              donorName: (userProfile[0] ? userProfile[0].userFirstName + ' ' + userProfile[0].userLastName : '') || '',
              donorBloodGroup: (userMedicalProfile[0] ? userMedicalProfile[0].userBloodGroup : '') || '',
              donorContactNumber: (userProfile[0] ? userProfile[0].userPhone : '') || ''
            });
            
          }
          catch (error){
            console.log("Catched Error: " + error)
          }
          
        }
        fetchUserDetails()
    }, [userId])


    // This is to submit the user to the donor list

    const submitBloodDonorHandler = () => {
      setShowModal(false)
      const submitBloodDonorInfo = async () => {
        const submitBloodDonorData = {
          user_id: userId,
          donorName: donorDetails.donorName,
          blood_group: donorDetails.donorBloodGroup,
          donorPhone: donorDetails.donorContactNumber
        }

        try{
          const response = await fetch('http://localhost:5000/api/blood-donors/submitBloodDonor', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + userToken,
            },
            body: JSON.stringify(submitBloodDonorData)
          })

          if(!response.ok){
            console.log("Unable to submit the blood donor information")
          }


        }catch (error){
          console.log("Error: " + error)
        }

      }
      submitBloodDonorInfo()
    }


    return(
    <>  
        <div class="absolute w-full h-full bg-black opacity-50"></div>
          <div class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-50">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Become a Donor Today
              </h3>
              
            </div>

            <div class="p-4 md:p-5 space-y-4">
            <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="patient_name"
                  id="patient_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={donorDetails.donorName}
                  onChange={(e) => setDonorDetails((prevState) => ({
                    ...prevState,
                    donorName: e.target.value
                  }))}
                />
                <label
                  htmlFor="patient_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Donor Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="patient_name"
                  id="patient_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={donorDetails.donorBloodGroup}
                  onChange={(e) => setDonorDetails((prevState) => ({
                    ...prevState,
                    donorBloodGroup: e.target.value
                  }))}
                  required
                />
                <label
                  htmlFor="patient_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Blood Group
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="patient_name"
                  id="patient_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={donorDetails.donorContactNumber}
                  onChange={(e) => setDonorDetails((prevState) => ({
                    ...prevState,
                    donorContactNumber: e.target.value
                  }))}
                  required
                />
                <label
                  htmlFor="patient_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Contact Number
                </label>
              </div>
            </div>

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submitBloodDonorHandler}>
                Apply
              </button>
              <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
    </>
    )
}

export default BecomeDonorComponent