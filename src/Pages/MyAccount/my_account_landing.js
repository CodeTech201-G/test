import React, { useEffect, useState } from "react";
import "./myaccount_page.css";
import { APICALL } from "../../Services/ApiServices";
import { MyAccountDetails } from "../../Services/ApiEndPoints";
import { UpdatePersonalInfo } from "../../Services/ApiEndPoints";
import PhoneInput from "react-phone-input-2";
import Edit from '../../Static/Assets/edit1.png';

const MyAccountProfile = () => {
  const profile_data = {
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
  };

  const [formData, setFormData] = useState(profile_data);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState([]);

  const renameProfileFld = (e) => {
    if (e.target !== undefined) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        phone_no: e,
      });
    }
  };
  const fetchIntialDetails = () =>{
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    APICALL.service(MyAccountDetails, "POST", {
      user_id: uid,
    }).then((data) => {
      try {
        if (data.code === "200") {
          let udata = data.data.user_details;
          let user_details =
            typeof udata !== "undefined" &&
            udata !== null &&
            udata.length !== null &&
            udata.length > 0
              ? udata
              : [];

          if (user_details.length > 0) {
            setFormData({
              first_name: user_details[0].field_profile_fname_value,
              last_name: user_details[0].field_profile_lname_value,
              phone_no: user_details[0].field_profile_phone_value,
              email: user_details[0].email,
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  useEffect(() => {
    fetchIntialDetails();
  }, []);
  const submitProfileData = () => {
    console.log(formData);
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let err = [];
    // Object.keys(formData).map((oneKey, i) => {
    //   let id = oneKey.replace("_", " ").toUpperCase();
    //   return formData[oneKey] !== "" ? "" : err.push(id + ": Fields is empty.");
    // });
    if (formData.email !== "" && !re.test(formData.email)) {
      err.push("Email is invalid");
    }
    if (err.length > 0) {
      setError(err);
    } else {
      setError(err);
      APICALL.service(UpdatePersonalInfo, "POST", {
        user_id: uid,
        update_type: 0,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: "+" + formData.phone_no,
        email: formData.email,
      }).then((data) => {
        try {
          if (data.code === "200") {
            console.log(data);
            fetchIntialDetails();
            setEdit(false);
          }
          else{
            setError(data.message);
          }
        } catch (e) {
          setError(data.message);
          console.error(e);
        }
      });
    }
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
            <h6 className="text-left pt-2 pb-2 ">Personal info</h6>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="first">First Name</label>
                  <input
                    disabled={!edit ? "disabled" : ""}
                    onChange={(e) => {
                      renameProfileFld(e);
                    }}
                    value={formData.first_name}
                    className="form-control"
                    type="text"
                    name="first_name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="last">Last Name</label>
                  <input
                    disabled={!edit ? "disabled" : ""}
                    onChange={(e) => {
                      renameProfileFld(e);
                    }}
                    value={formData.last_name}
                    className="form-control"
                    type="text"
                    name="last_name"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="company">Email</label>
                  <input
                    disabled={!edit ? "disabled" : ""}
                    onChange={(e) => {
                      renameProfileFld(e);
                    }}
                    value={formData.email}
                    className="form-control"
                    type="text"
                    name="email"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="phone">Phone Number</label>
                  <PhoneInput
                    inputProps={{
                      name: "phone_no",
                      required: true,
                    }}
                    country="in"
                    countryCodeEditable={false}
                    disabled={!edit ? "disabled" : ""}
                    onChange={(e) => {
                      renameProfileFld(e);
                    }}
                    value={formData.phone_no}
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left text-danger">
                {error}
                </div>
              </div>
            </div>
          </div>
          <div className="submit-part text-right">
            {edit && <button
              type="submit"
              className="btn btn-wrng pl-5 pr-5"
              onClick={() => {
                submitProfileData();
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

export default MyAccountProfile;
