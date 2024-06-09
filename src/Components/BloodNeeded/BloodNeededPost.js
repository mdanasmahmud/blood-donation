import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-contex";
import BannerComponent from "../About/BannerComponent";

const BloodNeededPost = () => {
  const auth = useContext(AuthContext);

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const [isPosted, setIsPosted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
        userPosted: auth.userId,
        patientName,
        patientBloodGroup: bloodGroup,
        patientLocation: location,
        patientContact: contact,
        blood_donors: []
    };

    try {
        const response = await fetch("http://localhost:5000/api/patients/submitPatient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + auth.token,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to post patient details");
        }

        const data = await response.json();
        setIsPosted(true);

        // Clearing all the states
        setPatientName("");
        setBloodGroup("");
        setLocation("");
        setContact("");

        setTimeout(() => {
            setIsPosted(false)
        }, 5000);
    } catch (error) {
        console.error("Error:", error);
    }
};


  return !auth.isLoggedIn ? (
    <div class="mt-8">
      <h5 class="p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Login to Post
      </h5>
    </div>
  ) : (
    <>
    {isPosted && <BannerComponent message={'Patient Details has been posted'}/>}
    <div className="mt-8 p-6 mb-7 bg-white border border-gray-200 rounded-lg shadow tracking-tight text-gray-900 dark:text-white">
      <h5 class="p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Post Patient
      </h5>
      <form class="max-w-md m-3" onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="patient_name"
            id="patient_name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="patient_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Patient Name
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="blood_group"
            id="blood_group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="blood_group"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Blood Group
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="location"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Location
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="contact"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="contact"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Contact
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default BloodNeededPost;