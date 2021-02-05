import React, { useEffect, useState } from "react";
import Edit from "../../Static/Assets/edit.png";
import "./EditProject.css";
import DatePicker from "react-datepicker";
import task from "../../Static/Assets/tasks.png";

const EditProjectForm = (props) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (props.onSubmit) {
      props.handleSubmit(address);
    } else {
      props.projectAddress && setAddress(props.projectAddress);
    }
  }, [props.projectAddress, props.onSubmit]);

  const handleInputs = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="col-md-6 col-sm-12 col-12 item ">
      <div className="">
        <div>
          <div className="containerElement edit_proj_main pr-5 mb-2">
            <div
              className={`col-md-12 ${!props.edit ? " avoid-clicks" : ""} `}
              style={{ display: "flex" }}
            >
              <div className="md-form pr-3 col-md-6 p-0">
                <label className="control-label">Start date</label>
                <div className="custom-txtfld d-flex p-0">
                  <DatePicker
                    type="text"
                    className="form-control txtfld strnend"
                    id="dp1"
                    dateFormat="dd-MM-yyyy"
                    selected={address.start_date}
                    minDate={new Date()}
                    onChange={(date) =>
                      setAddress({ ...address, start_date: date })
                    }
                  />
                  <div
                    onClick={() => {
                      var id = document.getElementById("dp1");
                      id.click();
                    }}
                  >
                    <img src={task} alt={"Date picker"} width={"35px"} />
                  </div>
                </div>
              </div>
              <div className="md-form col-md-6 p-0">
                <label className="control-label">End date</label>
                <div className="custom-txtfld d-flex p-0">
                  <DatePicker
                    type="text"
                    className="form-control txtfld strnend"
                    dateFormat="dd-MM-yyyy"
                    id="dp2"
                    selected={address.end_date}
                    disabled={
                      address.start_date !== undefined &&
                      address.start_date !== null &&
                      address.start_date !== ""
                        ? false
                        : true
                    }
                    minDate={address.start_date}
                    onChange={(date) =>
                      setAddress({ ...address, end_date: date })
                    }
                  />
                  <div
                    onClick={() => {
                      var id = document.getElementById("dp2");
                      id.click();
                    }}
                  >
                    <img src={task} alt={"Date picker"} width={"35px"} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`pt-5 ${!props.edit ? " avoid-clicks" : ""}`}>
              <div className="pb-2 col-md-12 ">
                <h5>Address details:</h5>
              </div>
              <div className="md-form col-md-12 mb-3">
                <label className="control-label">Street number</label>
                <input
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  type="text"
                  name="street"
                  className="form-control"
                  value={address.address}
                />
              </div>
              <div className="col-md-12 mb-3" style={{ display: "flex" }}>
                <div className="md-form pr-3 col-md-6 p-0">
                  <label className="control-label">Number</label>
                  <input
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    type="text"
                    name="number"
                    className="form-control"
                    value={address.number}
                  />
                </div>
                <div className="md-form col-md-6 p-0">
                  <label className="control-label">Box</label>
                  <input
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    type="text"
                    name="box"
                    className="form-control"
                    value={address.box}
                  />
                </div>
              </div>
              <div className="md-form col-md-12 mb-3">
                <label className="control-label">Postal code</label>
                <input
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  type="text"
                  name="zip"
                  className="form-control"
                  value={address.zip}
                  disabled={
                    address.zip !== null ||
                    address.zip !== undefined ||
                    address.zip !== ""
                      ? true
                      : false
                  }
                />
              </div>
              <div className="md-form col-md-12 mb-3">
                <label className="control-label">city</label>
                <input
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  type="text"
                  name="city"
                  className="form-control"
                  value={address.city}
                  readOnly={true}
                />
              </div>
              <div className="md-form col-md-12 mb-3">
                <label className="control-label">country</label>
                <input
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  type="text"
                  name="country"
                  className="form-control"
                  value={address.country}
                  readOnly={true}
                />
              </div>
            </div>
            {/* {props.edit && (
              <div className="md-form pt-3">
                <div>
                  <button
                    className="btn btn-wrng float-right"
                    onClick={() => {
                      props.handleSubmit(address);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;
