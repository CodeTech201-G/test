import React, { useEffect, useState } from "react";
import "./myaccount_page.css";
import { APICALL } from "../../Services/ApiServices";
import { MyNotifications } from "../../Services/ApiEndPoints";
import { updateNotifications } from "../../Services/ApiEndPoints";
import Bell from "../../Static/Assets/Bell.png";
import { Link,withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const MyNotification = () => {
  const notifications = [];
  const [notif, setNotif] = useState(notifications);
  const [openState, toggleOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleGetNotifications();
  }, []);

  const handleGetNotifications = () => {
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    APICALL.service(MyNotifications, "POST", {
      uid: Number(uid),
    }).then((data) => {
      console.log(data);
      try {
        if (data.status === "200") {
          setNotif(data.notification_data);
        }
      } catch (e) {
        console.error(e);
      }
    });
  };
  const handleNotifications = (param, nid) => {
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    var dt =
      param === 0
        ? {
            nid: nid,
            view_status: "1",
          }
        : {
            uid: uid,
            nid: nid,
            view_status: param,
          };
    APICALL.service(updateNotifications, "POST", dt).then((data) => {
      console.log(data);
      try {
        if (data.status === "200") {
          if (param === 2) {
            setNotif([]);
          } else {
            handleGetNotifications();
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  };
  const menuClass = `dropdown-menu${openState ? " show" : ""}`;
  return (
    <div className="container  content-outerdiv">
      <div className="top-nav"></div>
      <div className="col-md-12 float-left pr-0 pt-4 ">
        <div className="container">
          <div className="row m-auto ">
          <p className="browserback float-left " onClick={() => history.goBack()}>back</p>
            <h4 className="col-md-8 ml-2">
              Notifications
              <span
                className="ml-2 dropdown"
                onClick={() => {
                  toggleOpen(!openState);
                }}
              >
                <button
                  className="edit-btn rounded-circle pb-1 text-dark "
                  type="button"
                  id="dropdownMenuButton"
                >
                  <img src={Bell} alt={"Bell icon"} width={"15px"} />
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                  <div
                    className="text-left p-2 dropdown-item notifaction-menu"
                    onClick={() => {
                      handleNotifications(1, "");
                    }}
                  >
                    Mark all as read
                  </div>
                  <div
                    className="text-left p-2 dropdown-item notifaction-menu"
                    onClick={() => {
                      handleNotifications(2, "");
                    }}
                  >
                    Clear all
                  </div>
                  <div className="text-left p-2 dropdown-item notifaction-menu">
                    <Link to="/myAccount/notificationSettings" className="text-dark">
                      Settings
                    </Link>
                  </div>
                </div>
              </span>
            </h4>
          </div>
        </div>
        <div className="col-md-12 mb-3 ml-5">
          <div className="row">
            <div className="col-md-12 col-sm-12 ">
              <div className="card my-3 task-border shadow ">
               <div className="notif-content m-1">
               {notif.length > 0 ?
                Object.keys(notif).map((e) => (
                  <div className="card-body pt-0 pb-1 m-0" key={e}>
                    <div className="col-md-12 border-bottom p-3">
                      <h6 className="card-text">{notif[e].Title}</h6>
                      <h6 className="card-text custom-font-size">
                        {notif[e].Body}
                      </h6>
                    </div>
                  </div>
                )) : (<div className="justify-content-center">
                <div style={{textAlign: "center"}}>You have no notifications</div>
                </div>)}
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotification;
