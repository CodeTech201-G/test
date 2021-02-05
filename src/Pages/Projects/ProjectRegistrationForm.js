import React, { useRef, useState } from "react";
import "./CreateProject.css";
import ProjectForm from "./ProjectForm";
import GoogleMapComponent from "../GoogleMap/google_map_component";
// import { useHistory } from "react-router-dom";

function ProjectRegistrationForm({ onSubmit, msg }) {
  // const history = useHistory();
  const [mapState, setMapState] = useState({
    ProjectName: "",
    Street: "",
    Number: "",
    Box: "",
    postalCode: "",
    city: "",
    country: "",
    latitude: "",
    longitude: ""
  });
const [submitState,setSubmitState] = useState(false);
  const handleChange=(e)=>{
    setMapState({
      ...mapState,
      [e.target.name]: e.target.value
  });
    let pval = inputEl.current.value;
    e.ProjectName = pval;
  }
  const getFromDetails = data => {
    let pval = inputEl.current.value;
    data.ProjectName = pval;
    //setMapState({ ...mapState, data });
    onSubmit(data, 2);
    setSubmitState(false);
  };
  const getMapState = arr => {
    setMapState({
      ...mapState,
      Street: arr.address,
      postalCode: arr.zip,
      city: arr.region === "" ? arr.city : arr.region,
      country: arr.country,
      latitude: arr.mapPosition.lat,
      longitude: arr.mapPosition.long
    });
  };
  const inputEl = useRef(!null);
  return (
    <div className="content-outerdiv">
      <div className="top-nav"></div>
      <div>
        <div className="container d-flex mb-3 ">
          <div className="pl-4 ">
            <h4 className="pr-5">Add Project</h4>
          </div>
        </div>
        <div className="container d-flex edit_proj_main input ">
          <div className="">
            {/* <label></label> */}
            <div className="col-md-12 pr-5">
              <div className="col-md-12 pr-4">
                <label>Project name</label>
                <label className="text-danger">*</label>
                {msg && <p className="text-danger">{msg}</p>}
                <input
                  type="text"
                  name="ProjectName"
                  className="form-control input-class"
                  id="ProjectName"
                  required
                  aria-describedby="ProjectNameHelp"
                  placeholder="Project name"
                  ref={inputEl}
                />
              </div>
            </div>
            <ProjectForm
              getFormState={mapState}
              getFromDetails={getFromDetails}
              handleChange={handleChange}
              onSubmit = {submitState}
            />
          </div>

          <div className="col-md-6 col-sm-12 col-12 item pl-5">
            <div className="card item-card card-block">
              <GoogleMapComponent updateField1={getMapState} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-5 float-right">
          <div className="col-md-12 text-right">
            <button
              type="submit"
              className="ml-2 action-btn btn-left btns btn btn-primary btn-color"
              onClick={() => {
                // getFromDetails(mapState,2);
                setSubmitState(true);}
              }
            >
              {" "}
              Continue{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectRegistrationForm;
