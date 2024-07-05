import React, {useContext } from "react";
import { AuthContext } from "../../context/auth-contex";

import UserDetailsComponent from "./UserDashboardUserDetailsComponent"
import UserDashboardStatisticsComponent from "./UserDashboardStatisticsComponent"

const UserDashboardComponent = () => {

  const auth = useContext(AuthContext)

  return (
    <div className="flex flex-col justify-center items-center">
      <UserDetailsComponent userId={auth.userId} userToken={auth.token}/>
      <UserDashboardStatisticsComponent/>
    </div>
);
};

export default UserDashboardComponent;
