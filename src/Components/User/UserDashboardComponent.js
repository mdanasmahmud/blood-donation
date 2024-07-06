import React, {useContext } from "react";
import { AuthContext } from "../../context/auth-contex";

import UserDetailsComponent from "./UserDashboardUserDetailsComponent"
import UserDashboardStatisticsComponent from "./UserDashboardStatisticsComponent"

import { CSSTransition } from 'react-transition-group';
import '../../Animation/FadeAnimation.css';

const UserDashboardComponent = () => {

  const auth = useContext(AuthContext)

  return (
    <div className="flex flex-col justify-center items-center">
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <UserDetailsComponent userId={auth.userId} userToken={auth.token}/>
      </CSSTransition>
      
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <UserDashboardStatisticsComponent/>
      </CSSTransition>
      
    </div>
);
};

export default UserDashboardComponent;
