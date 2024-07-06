import React from "react";
import { useState } from "react";
import bloodLogo from '../../images/blood-logo.png';

import BannerComponent from "../About/BannerComponent";

const ForgotPasswordComponent = () => {

    // To trigger save the password in a state for now

    const [emailForgotReset, setEmailForgotReset] = useState('')

    // To trigger the banner if the password has been forgotten

    const [forgotPasswordFlag, setForgotPasswordFlag] = useState(false)

    const forgotPasswordFlagChanger = () =>{
        setForgotPasswordFlag(true)
        setTimeout(() => {
            
            setForgotPasswordFlag(false)
        }, 3000)
    }


    return(
        <>
        {forgotPasswordFlag && <BannerComponent message={`Your password has been sent to: ${emailForgotReset}`}/>}
        <section class=" dark:bg-gray-900">

            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-32 lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src={bloodLogo} alt="logo"/>
                    Blood Donation    
                </a>
                <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Forgot your password?
                    </h1>
                    <p class="font-light text-gray-500 dark:text-gray-400">Just type in your email and we will send you a code to reset your password!</p>
                    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={emailForgotReset} onChange={(e) => {setEmailForgotReset(e.target.value)}}/>
                        </div>
                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={forgotPasswordFlagChanger}>Reset Password</button>
                    </form>
                </div>
            </div>
        </section>
    </>
    )
}

export default ForgotPasswordComponent;