import React from "react";
import { Routes, Route } from 'react-router-dom';

import UserSidebarComponent from "../Components/User/UserSidebarComponent";
import UserProfileComponent from "../Components/User/UserProfileComponent";
import UserDashboardComponent from "../Components/User/UserDashboardComponent";

import UserDashboardAppointmentComponent from "../Components/User/UserDashboardAppointmentComponent";

import UserDashboardPatientsComponent from "../Components/User/UserDashboardPatientsComponent";

const UserDashboardPage = () => {
    return(
        <div>
            <UserSidebarComponent/>
            <Routes>
                <Route path="" element={<UserDashboardComponent/>}/>
                <Route path="profile" element={<UserProfileComponent/>}/>
                <Route path="appointments" element={<UserDashboardAppointmentComponent/>}/>
                <Route path="patients" element={<UserDashboardPatientsComponent/>}/>
            </Routes>
        </div>
    )
}

export default UserDashboardPage;