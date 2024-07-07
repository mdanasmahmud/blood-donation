import React, {useState, useEffect, useContext} from 'react';

import { AuthContext } from '../../context/auth-contex';

import { CSSTransition } from 'react-transition-group';
import '../../Animation/FadeAnimation.css';

const UserProfileComponent = () => {
    const auth = useContext(AuthContext);

    const [userProfileData, setUserProfileData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        birthdate: '',
        home_address: '',
        phone_number: '',
        emergency_phone_number: '',
    });

    const [medicalFormData, setMedicalFormData] = useState({
        blood_group: '',
        height: '',
        pre_existing_conditions: '',
        surgeries: '',
        blood_transfusion: false,
        smoke: false,
        drug_abuse: false,
        alcohol: false,
    });

    const userProfileDataHandler = (e) => {
        const { name, value } = e.target;
        setUserProfileData({
            ...userProfileData,
            [name]: value
        });
    };

    const handleMedicalChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMedicalFormData({
            ...medicalFormData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const userProfileHandleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/users/updatePersonalProfile/${auth.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token,
            },
            body: JSON.stringify(userProfileData)
        });

        if (!response.ok) {
            throw new Error("Failed to Update the User Profile");
        }

        const data = await response.json();
    };

    const handleMedicalSubmit = async (e) => {
        e.preventDefault();
        console.log(medicalFormData);

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/users/updateUserMedicalProfile/${auth.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            },
            body: JSON.stringify(medicalFormData)
        });

        if (!response.ok) {
            throw new Error("Failed to update the Medical Profile");
        }

        const data = await response.json();
    };

    useEffect(() => {
        const tabs = document.querySelectorAll('[data-tabs-target]');
        const tabContents = document.querySelectorAll('[role="tabpanel"]');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = document.querySelector(tab.dataset.tabsTarget);

                tabContents.forEach(tc => {
                    tc.classList.add('hidden');
                });

                tabs.forEach(t => {
                    t.classList.remove('text-blue-600', 'dark:text-blue-500');
                    t.classList.add('hover:text-gray-600', 'dark:hover:text-gray-300');
                });

                target.classList.remove('hidden');
                tab.classList.add('text-blue-600', 'dark:text-blue-500');
                tab.classList.remove('hover:text-gray-600', 'dark:hover:text-gray-300');
            });
        });

        if (tabs.length > 0) {
            tabs[0].click();
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/users/${auth.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + auth.token,
                    },
                });

                if (!response.ok) {
                    throw new Error("Fetching user data failed");
                }

                const data = await response.json();
                const { user } = data;

                if (user.userProfile && user.userProfile.length > 0) {
                    const profile = user.userProfile[0];
                    setUserProfileData({
                        first_name: profile.userFirstName || '',
                        last_name: profile.userLastName || '',
                        gender: profile.userGender || '',
                        birthdate: profile.userBirthdate || '',
                        home_address: profile.userHomeAddress || '',
                        phone_number: profile.userPhone || '',
                        emergency_phone_number: profile.userEmergencyPhone || '',
                    });
                }

                if (user.userMedicalProfile && user.userMedicalProfile.length > 0) {
                    const medicalProfile = user.userMedicalProfile[0];
                    setMedicalFormData({
                        blood_group: medicalProfile.userBloodGroup || '',
                        height: medicalProfile.userHeight || '',
                        pre_existing_conditions: medicalProfile.userPreExistingCondition || '',
                        surgeries: medicalProfile.userPreExistingSurgeries || '',
                        blood_transfusion: medicalProfile.userBloodTransfusion === 'true',
                        smoke: medicalProfile.userSmoke === 'true',
                        drug_abuse: medicalProfile.userDrugAbuse === 'true',
                        alcohol: medicalProfile.userAlcohol === 'true',
                    });
                }

            } catch (error) {
                console.error("An error occurred while fetching user data:", error);
            }
        };

        fetchUserData();
    }, [auth.userId]);
    

    return (
            <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        
      
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                    <li class="me-2">
                        <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Personal Profile</button>
                    </li>
                    <li class="me-2">
                        <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Medical Profile</button>
                    </li>

                </ul>
                <div id="defaultTabContent">
                    <div className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                        <h2 className="text-left mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Edit Your Personal Profile</h2>
                        <form className="max-w-md" onSubmit={userProfileHandleSubmit}>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userProfileData.first_name} onChange={userProfileDataHandler} />
                                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userProfileData.last_name} onChange={userProfileDataHandler} />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <label htmlFor="gender" className="sr-only">Gender select</label>
                                    <select id="gender" name="gender" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={userProfileData.gender} onChange={userProfileDataHandler}>
                                        <option value="" selected>Select your gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="date" name="birthdate" id="birthdate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={userProfileData.birthdate} onChange={userProfileDataHandler} />
                                    <label htmlFor="birthdate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birthdate</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="home_address" id="home_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={userProfileData.home_address} required onChange={userProfileDataHandler} />
                                <label htmlFor="home_address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Home address</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="tel" name="phone_number" id="phone_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userProfileData.phone_number} onChange={userProfileDataHandler} />
                                    <label htmlFor="phone_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="tel" name="emergency_phone_number" id="emergency_phone_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userProfileData.emergency_phone_number} onChange={userProfileDataHandler} />
                                    <label htmlFor="emergency_phone_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Emergency phone number</label>
                                </div>
                            </div>

                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                    {/* This is for medical profile edit */}
                    
                    <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab">
                    <h2 class="text-left mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Edit Your Medical Profile</h2>

                    <form className="max-w-md" onSubmit={handleMedicalSubmit}>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <label htmlFor="blood_group" className="sr-only">Blood Group</label>
                                    <select name="blood_group" id="blood_group" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={medicalFormData.blood_group} onChange={handleMedicalChange}>
                                        <option value="">Select your blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="number" name="height" id="height" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={medicalFormData.height} onChange={handleMedicalChange} />
                                    <label htmlFor="height" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter height in cm</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="pre_existing_conditions" id="pre_existing_conditions" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                value={medicalFormData.pre_existing_conditions}
                                required onChange={handleMedicalChange} />
                                <label htmlFor="pre_existing_conditions" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pre-existing conditions (e.g., heart disease, diabetes)</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="surgeries" id="surgeries" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                                value={medicalFormData.surgeries}
                                onChange={handleMedicalChange} />
                                <label htmlFor="surgeries" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Recent surgeries or medical procedures</label>
                            </div>
                            <h2 className="text-left mb-3 text-1xl font-extrabold tracking-tight text-gray-900 dark:text-white">Toggle the answers (Gray = no, Blue = yes)</h2>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="inline-flex items-center cursor-pointer">
                                    <span className="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">History of blood transfusion? </span>
                                    <input type="checkbox" name="blood_transfusion" value={medicalFormData.blood_transfusion} className="sr-only peer" 
                                    checked={medicalFormData.blood_transfusion}
                                    onChange={handleMedicalChange} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="inline-flex items-center cursor-pointer">
                                    <span className="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Do you smoke? </span>
                                    <input type="checkbox" name="smoke" value={medicalFormData.smoke} className="sr-only peer" 
                                    checked={medicalFormData.smoke}
                                    onChange={handleMedicalChange} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="inline-flex items-center cursor-pointer">
                                    <span className="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">History of drug abuse? </span>
                                    <input type="checkbox" name="drug_abuse" value={medicalFormData.drug_abuse} className="sr-only peer" 
                                    checked={medicalFormData.drug_abuse}
                                    onChange={handleMedicalChange} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="inline-flex items-center cursor-pointer">
                                    <span className="mr-5 text-sm font-medium text-gray-500 dark:text-gray-400">Do you drink alcohol?</span>
                                    <input type="checkbox" name="alcohol" value={medicalFormData.alcohol} className="sr-only peer" 
                                    checked={medicalFormData.alcohol}
                                    onChange={handleMedicalChange} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>

            </CSSTransition>
    )
}

export default UserProfileComponent;