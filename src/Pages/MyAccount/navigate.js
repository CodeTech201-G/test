import React from "react";
import { Link,withRouter } from "react-router-dom";
import './myaccount_page.css';

function Navigation(props) {
  return (
    <div className="card mt-5 leftMenuBox p-3" > 
    <ul className="sidebar-nav myaccount-nav p-0 list-group list-group-flush" >
    <li className={`list-group-item ${props.location.pathname === "/myAccount/profile" ? "active" : "" }`}>
      <Link to="/myAccount/profile" className="">Personal info</Link>
    </li>
    <li className={`list-group-item ${props.location.pathname === "/myAccount/changePassword" ? "active" : "" }`}>
      <Link to="/myAccount/changePassword" className="">Password</Link>
    </li>
    <li className={`list-group-item ${props.location.pathname === "/myAccount/company" ? "active" : "" }`}>
      <Link to="/myAccount/company" className="">Company info</Link>
    </li>
    <li className={`list-group-item ${props.location.pathname === "/myAccount/notificationSettings" ? "active" : "" }`}>
      <Link to="/myAccount/notificationSettings" className="">
        Notification
      </Link>
    </li>
  </ul>
    </div>

  );
}

export default withRouter(Navigation);
