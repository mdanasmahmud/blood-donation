import React, { Suspense } from "react";
import { Routes, Route } from 'react-router-dom';

import UserSidebarComponent from "../Components/User/UserSidebarComponent";

import LoadingComponent from "../Components/Others/LoadingComponent";

// Lazy loading components
const UserProfileComponent = React.lazy(() => import("../Components/User/UserProfileComponent"));
const UserDashboardComponent = React.lazy(() => import("../Components/User/UserDashboardComponent"));
const UserDashboardAppointmentComponent = React.lazy(() => import("../Components/User/UserDashboardAppointmentComponent"));
const UserDashboardPatientsComponent = React.lazy(() => import("../Components/User/UserDashboardPatientsComponent"));

const UserDashboardPage = () => {
    return(
        <div>
            <UserSidebarComponent/>
            <Suspense fallback={<LoadingComponent/>}>
                <Routes>
                    <Route path="" element={<UserDashboardComponent/>}/>
                    <Route path="profile" element={<UserProfileComponent/>}/>
                    <Route path="appointments" element={<UserDashboardAppointmentComponent/>}/>
                    <Route path="patients" element={<UserDashboardPatientsComponent/>}/>
                </Routes>
            </Suspense>
        </div> 
    )
}

export default UserDashboardPage;