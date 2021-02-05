import React, { useState,useEffect } from "react";
import "./myaccount_page.css";
import { APICALL } from "../../Services/ApiServices";
import { MyAccountDetails } from "../../Services/ApiEndPoints";
import Edit from '../../Static/Assets/edit1.png';
import { UpdatePersonalInfo } from "../../Services/ApiEndPoints";

const MyNotificationSettings = () => {
  const initial_opt = { all: false, opt1: false, opt2: false, opt3: false };
  const [options, setOptions] = useState(initial_opt);
  const [edit,setEdit] = useState(false);

  useEffect(() => {
    let uid = JSON.parse(localStorage.getItem("currentUser"))['id'];
    APICALL.service( MyAccountDetails, "POST", {
      "user_id" : uid, 
    }).then((data) => {
        try{
        if(data.code ==='200'){
          let question = data.data.user_questions;
          let ques = question.field_questions_notifications_value ;
          let notifications = (ques && ques.length > 0) ? question.field_questions_notifications_value : [];
          let sel = {}
          if(notifications.length > 0){
            let all = 0;
            Object.keys(notifications).forEach(key =>{ 
              switch(notifications[key]){
              case "1" : sel.opt1 = true; all++; break;
              case "2" : sel.opt2 = true; all++; break;
              case "3" : sel.opt3 = true; all++; break;
              default: break;
            }
            console.log(all,notifications.length)
            sel.all = (notifications.length === 3) ? true : false;
            })
            setOptions(sel);
          }
        }
      }catch(e){
        console.error(e);
      }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[]);
  const getAllOptions = () =>{
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    let sel = {  opt1: "1", opt2: "2", opt3: "3" };
    let filtered = [];
    Object.keys(options).forEach(function(key){ return (options[key]=== true ? filtered.push(sel[key]) : null);});
    APICALL.service(UpdatePersonalInfo, "POST", {
      user_id: uid,
      update_type: 3,
      type_of_notifications: options.all === true ? "1,2,3" : filtered.join(",")
    }).then((data) => {
      try {
        if (data.code === "200") {
          console.log(data);
          setEdit(false);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  
  return (
    <div className="content-outerdiv pt-3">
      <div className="top-nav pt-3 d-flex">
        <h4 className="text-left pr-4 pl-3">My account</h4>
        {!edit && <span>
        <button
        className="edit-btn rounded-circle pb-1 text-dark"
        type="button"
        onClick={() => setEdit(true)}
      >
        <img src={Edit} alt={"Edit"} width={"10px"} />
    </button>
        </span>}
      </div>
      <div className="personal-body-wrapper">
        <div className="container form-div">
          <div className="fld-part">
            <h6 className="text-left pt-4 pb-4 ">Notification</h6>
            
            <div className="q-check ">
            <p className="option-text">
              What notifications would you like to recieve?
            </p>
            <div>
              <div className="checkbox d-flex col-md-8 justify-content-center">
              <label className="cbox">
                <input
                disabled = { !(edit) ? "disabled" : ""}
                type="checkbox"
                value="all"
                checked={options.all ? "checked" : ""}
                onChange={() => {
                  setOptions({
                    ...options,
                    opt1: options.all === true ? false : true,
                    opt2: options.all === true ? false : true,
                    opt3: options.all === true ? false : true,
                    all : !options.all ,
                  });
                }}
                />
                <div className="pl-4 ml-3 option-text">Select all</div>
                <span className="checkmark"></span>
              </label>
            </div>
              <div className="checkbox row pt-2 pb-2">
                <label className="cbox">
                  <input
                    disabled = { !(edit) ? "disabled" : ""}
                    type="checkbox"
                    value="0"
                    checked={options.opt1 ? "checked" : ""}
                    onChange={() => {
                      !options.all && setOptions({ ...options, opt1: !options.opt1 });
                    }}
                  />
                  <div className="pl-4 ml-3 option-text">When someone enters or leaves the site</div>
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="checkbox row pt-2 pb-2">
                <label className="cbox">
                  <input
                    disabled = { !(edit) ? "disabled" : ""}
                    type="checkbox"
                    value="1"
                    checked={options.opt2 ? "checked" : ""}
                    onChange={() => {
                      !options.all && setOptions({ ...options, opt2: !options.opt2 });
                    }}
                  />
                  <div className="pl-4 ml-3 option-text">When someone starts or stops working</div>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="checkbox row pt-2 pb-2">
                <label className="cbox">
               
                  <input
                    disabled = { !(edit) ? "disabled" : ""}
                    type="checkbox"
                    value="2"
                    checked={options.opt3 ? "checked" : ""}
                    onChange={() => {
                      !options.all && setOptions({ ...options, opt3: !options.opt3 });
                    }}
                  />
                  <div className="pl-4 ml-3 option-text">When documents or images are uploaded</div>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          </div>
          <div className="submit-part text-right">
            {edit && <button
              type="submit"
              className="btn btn-wrng pl-5 pr-5"
              onClick={() => {
                getAllOptions();
              }}
            >
              Save
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotificationSettings;
