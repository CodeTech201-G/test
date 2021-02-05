import React, { useState } from "react";
import { APICALL } from "../../Services/ApiServices";
import { UpdatePersonalInfo } from "../../Services/ApiEndPoints";
import { logout,useAuthDispatch } from '../../Context';
import { useHistory } from "react-router-dom";
import Edit from '../../Static/Assets/edit1.png';
import './myaccount_page.js';

const ChangePassword = () => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const password_details = {
    old_password: "",
    new_password_1: "",
    new_password_2: "",
  };
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(password_details);
  const [error, setError] = useState([]);
  const fldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitPassword = () => {
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    const old_pass = formData.old_password;
    const new_pass = formData.new_password_1;
    const reenter_pass = formData.new_password_2;
    let err = [];
    if(old_pass === ""){
        err.push("Enter your old password")
    }else if( new_pass === ""){
        err.push("Enter new password")
    }else if(reenter_pass === ""){
        err.push("Re enter the password")
    }else{
        if(new_pass !== reenter_pass){
            err.push("Passwords are not matching")
        }else if( new_pass === old_pass ){
            err.push("Your new password is already existing choose other password");
        }else{
          APICALL.service(UpdatePersonalInfo, "POST", {
            user_id: uid,
            update_type: 1,
            old_password : old_pass, 
            new_password: new_pass,
            
          }).then((data) => {
            try {
              if (data.code === "200") {
                logout(dispatch);
                localStorage.setItem('isLogged',false);
                localStorage.clear();
                sessionStorage.clear();
                history.push('/login');
              }else{
                setError(data.message);
              }

            } catch (e) { 
              err.push(data.message);
              console.error(e);
            }
          }); 
        }
    }
    setError(err);
  };
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
            <h6 className="text-left pt-2 pb-2 ">Password</h6>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="Enter old password">Enter old password</label>
                  <input
                  onChange={(e) => {
                    fldChange(e);
                  }}
                  value={formData.first_name}
                  className="form-control custom_form_flds"
                  type="password"
                  name="old_password"
                  disabled={!edit ? "disabled" : ""}
                />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="Enter new password">Enter new password</label>
                  <input
                  onChange={(e) => {
                    fldChange(e);
                  }}
                  value={formData.first_name}
                  className="form-control custom_form_flds"
                  type="password"
                  name="new_password_1"
                  disabled={!edit ? "disabled" : ""}
                />
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="Re-enter password">Re-enter password</label>
                  <input
                  onChange={(e) => {
                    fldChange(e);
                  }}
                  value={formData.first_name}
                  className="form-control custom_form_flds"
                  type="password"
                  name="new_password_2"
                  disabled={!edit ? "disabled" : ""}
                />
                </div>
              </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 text-danger">{error}</div>
        </div>
        <div className="submit-part text-right">
        {edit && <button
          type="submit"
          className="btn btn-wrng pl-5 pr-5"
          onClick={() => {
            submitPassword();
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

export default ChangePassword;
