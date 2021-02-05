import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyAccountProfile from "./my_account_landing";
import MyNotificationSettings from "./Myaccount_notifications";
import Navigation from "./navigate";
import ChangePassword from "./changePassword";
import MyAccount from "./myaccount_page";
import './myaccount_page.css';

function MyAccountMenu() {
  return (
    <div className="App">
      <Router>
       <div className="top-nav"></div>
        <div className="d-flex container">
            <div className="col-md-3 layout-space pt-5">
                   <Navigation />
            </div>
          <div className="col-md-9 ">
            <Switch>
              <Route
                exact
                path="/myAccount"
                render={() => {
                  return <Redirect to="/myAccount/profile" />;
                }}
              />
              <Route
                path="/myAccount/profile"
                exact
                component={() => <MyAccountProfile />}
              />
              <Route
                path="/myAccount/company"
                exact
                component={() => <MyAccount />}
              />
              <Route
                path="/myAccount/changePassword"
                exact
                component={() => <ChangePassword />}
              />
              <Route
                path="/myAccount/notificationSettings"
                exact
                component={() => <MyNotificationSettings />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default MyAccountMenu;
