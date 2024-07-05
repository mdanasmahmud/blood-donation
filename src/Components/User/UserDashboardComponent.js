import React, {useContext } from "react";
import { AuthContext } from "../../context/auth-contex";

import UserDetailsComponent from "./UserDashboardUserDetailsComponent"

const UserDashboardComponent = () => {

  const auth = useContext(AuthContext)

  return (
    <div>
      <UserDetailsComponent userId={auth.userId} userToken = {auth.token}/>
    </div>
  );
};

export default UserDashboardComponent;
