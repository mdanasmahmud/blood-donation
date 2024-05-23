import React from "react";
import { Routes, Route } from 'react-router-dom';

import UserSidebarComponent from "../Components/User/UserSidebarComponent";
import UserProfileComponent from "../Components/User/UserProfileComponent";

const UserDashboardPage = () => {
    return(
        <div>
            <UserSidebarComponent/>
            <Routes>
                <Route path="profile" element={<UserProfileComponent/>}/>
            </Routes>
        </div>
    )
}

export default UserDashboardPage;