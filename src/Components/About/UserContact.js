import React, {useState} from "react";

import BannerComponent from "./BannerComponent";

const UserContact = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [buttonClicked, setButtonClicked] = useState(false)

    const handleChange = () => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 3000);
    }

    return (
        <div>
            {buttonClicked && <BannerComponent message = {`Dear ${name}, your message has been sent`}/>}
            <form class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 max-w-screen-sm">
            <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Us</h5>
                </div>
            <div >
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
                <input type="text" id="small-input" class="mb-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="To Contact You Later" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea id="message" rows="4" class="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button type="button" class="mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1.5" onClick={handleChange}>Send Message</button>
            </form>
        </div>
    )
};

export default UserContact;