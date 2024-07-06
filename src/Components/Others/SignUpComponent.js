import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import bloodLogo from '../../images/blood-logo.png';

import BannerComponent from "../About/BannerComponent";

const SignUpComponent = () => {
    // This is to get the state from the jumbotron that was passed through

    const location = useLocation();
    const userSignUpEmail = location.state?.userSignUpEmail;
    

    const [registerEmail, setRegisterEmail] = useState(userSignUpEmail)
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerConfirmPassword, setregisterConfirmPassword] = useState('')

    const [signupFlag, setSignupFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);

    const SignUpFlagTrigger = () => {
        const userData = {
            userName: registerEmail.split('@')[0], // assuming the username is the part before '@' in the email
            password: registerPassword,
            email: registerEmail
        };

        if (registerPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }
    
        fetch('http://localhost:5000/api/users/submitUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setSignupFlag(true);
                setTimeout(() => {
                    setSignupFlag(false);
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
            <>
            {signupFlag && <BannerComponent message={`Check ${registerEmail} to verify your email`} />}
            {errorMessage && <BannerComponent message={errorMessage} />}
            <section class=" dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-32 lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src={bloodLogo} alt="logo"/>
                    Blood Donation    
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="" value={registerEmail} onChange={(e) => {setRegisterEmail(e.target.value)}}/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter Your Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={registerPassword} onChange={(e) => {setRegisterPassword(e.target.value)}}/>
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Your Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={registerConfirmPassword} onChange={(e) => {setregisterConfirmPassword(e.target.value)}}/>
                            </div>
                            <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={SignUpFlagTrigger}>Sign Up</button>
                            
                        </form>
                    </div>
                </div>
            </div>
            </section>
            </>
    )
}

export default SignUpComponent;