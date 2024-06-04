import React, { useState, useEffect } from "react";
import avatar from '../../images/avatar.png';
import { NavLink } from 'react-router-dom';

// Component if the user did not login
const UserNotLogin = ({ setUserLoginStatus, setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Save the email and password here
        console.log(`Email: ${email}, Password: ${password}`);
    
        const userData = {
            email: email,
            password: password
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/users/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data.message === 'Logged in!') {
                setUserLoginStatus(true);
                setUser(userData); // Save the user data
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Invalid email or password');
        }
    };

    return (
        <div className="absolute mt-2 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900 dark:divide-gray-600" id="userDropdown">
            <div className="flex flex-col items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="content-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <NavLink to='/sign-up/' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                            </p>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Forgot Password? <NavLink to='/forgot-password/' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Click here</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component if the user did login (Currently no user so the data is static)
const UserLoggedin = ({ setUserLoginStatus,  user  }) => {
    const handleSignOut = () => {
        setUserLoginStatus(false);
        localStorage.setItem('userLoginStatus', false);
    };

    return (
        <div className="absolute mt-2 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" id="userDropdown">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                {user && <div className="font-medium truncate">{user.userName}</div>}
                {user && <div className="font-medium truncate">{user.email}</div>} {/* Check if user is not null before accessing its properties */}
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <li>
                    <NavLink to='/user/dashboard/' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</NavLink>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
            </ul>
            <div className="py-1">
                <a href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </div>
        </div>
    );
}

const NavbarUserComponent = (props) => {
    const [userLoginStatus, setUserLoginStatus] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const status = localStorage.getItem('userLoginStatus');
        setUserLoginStatus(status === 'true');
    }, []);

    const handleLogin = (status) => {
        localStorage.setItem('userLoginStatus', status);
        setUserLoginStatus(status);
        console.log(status);
    };

    useEffect(() => {
        // Reattach the dropdown functionality when the login status changes
        const avatarButton = document.getElementById('avatarButton');
        const userDropdown = document.getElementById('userDropdown');

        const toggleDropdown = () => {
            if (userDropdown.classList.contains('hidden')) {
                userDropdown.classList.remove('hidden');
            } else {
                userDropdown.classList.add('hidden');
            }
        };

        avatarButton.addEventListener('click', toggleDropdown);

        return () => {
            avatarButton.removeEventListener('click', toggleDropdown);
        };
    }, [userLoginStatus]);

    return (
        <div className="relative">
            <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src={avatar} alt="User dropdown"></img>
            {userLoginStatus ? <UserLoggedin setUserLoginStatus={setUserLoginStatus} user={user} /> : <UserNotLogin setUserLoginStatus={handleLogin} setUser={setUser} userList={props.userList} />}
        </div>
    );
}

export default NavbarUserComponent;
