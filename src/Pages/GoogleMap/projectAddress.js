import React, { useEffect, useState } from "react";
import "../GoogleMap/MapApi.css";
import { useParams } from "react-router-dom";
import GoogleMapComponent from "./google_map_component";
import { EditProject } from "../../Services/ApiEndPoints";
import { UpdateProject } from "../../Services/ApiEndPoints";
import { APICALL } from "../../Services/ApiServices";
import EditProjectForm from "./editProjectForm.js";
import "../Projects/CreateProject.css";
import Edit from "../../Static/Assets/edit1.png";
import { useHistory } from 'react-router-dom';

const ProjectAddressMarker = () => {
  const id = useParams();
  const history = useHistory();
  const [mapId] = useState(id);
  const [error,setError] = useState("");
  const ProjectDetails = JSON.parse(
    localStorage.getItem("project_list_details")
  );
  const [edit, setEdit] = useState(false);
  const [projectDetails, setProjectDetails] = useState("");
  const [onSubmit,setOnSubmit] = useState(false);
  const [address, setAddress] = useState({
    ptitle: ProjectDetails.project_name ? ProjectDetails.project_name : "",
    address: "",
    area: "",
    street: "",
    locality: "",
    region: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    number: "",
    box: "",
    start_date: "",
    end_date: "",
    mapPosition: { lat: 0, long: 0 },
    markerPosition: { lat: 0, long: 0 }
  });

  const formatDate = (date) =>{
    let d = date ? date.split("-") : "";
    let formatedDate = new Date(d[2]+"-"+d[1]+"-"+d[0]);
    return formatedDate;
  }

  const fetchApiDetails = () =>{
    APICALL.service(EditProject, "POST", { project_Id: mapId.id }).then(
      data => {
        try {
          if (data.code === 200) {
            let pdetails = data.data;
            setProjectDetails(pdetails);
            setOnSubmit(false);
            setError("");
            setAddress({
              ...address,
              address: pdetails.address_details.street,
              street: pdetails.address_details.street,
              number: pdetails.address_details.number === null?"":pdetails.address_details.number,
              box: pdetails.address_details.box === null?"":pdetails.address_details.box,
              zip: pdetails.address_details.postal_code,
              city: pdetails.address_details.city,
              country: pdetails.address_details.country,
              mapPosition: { lat: pdetails.latitude, long: pdetails.longitude },
              markerPosition: {
                lat: pdetails.latitude,
                long: pdetails.longitude
              },
             start_date: pdetails.dates.start_date ? formatDate(pdetails.dates.start_date) : "",
             end_date: pdetails.dates.end_date ? formatDate(pdetails.dates.end_date) : "",
            });
          }
        } catch (e) {
          setError(data.message);
          console.error(e);
        }
      }
    );
  }

  useEffect(() => {
    fetchApiDetails();
  }, []);

  const dPicker = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  };

  const handleSubmit = formdata => {
    let postData = {
      project_Id: projectDetails.id,
      address_id: projectDetails.address_id,
      latitude: formdata.markerPosition.lat,
      longitude: formdata.markerPosition.long,
      phone: (projectDetails.phone === "null" || projectDetails.phone === null || projectDetails.phone === undefined)?"":projectDetails.phone,
      email: (projectDetails.email === "null" || projectDetails.email === null || projectDetails.email === undefined)?"":projectDetails.email,
      website: (projectDetails.website === "null" || projectDetails.website === null || projectDetails.website === undefined)?"":projectDetails.website,
      box: formdata.box === null ? "" : formdata.box,
      city: formdata.city,
      country: formdata.country,
      number: formdata.number === null ? "" : formdata.number,
      postal: formdata.zip,
      street: formdata.street,
      start_date: dPicker(formdata.start_date),
      end_date: dPicker(formdata.end_date),
    };
    APICALL.service(UpdateProject, "POST", postData).then(data => {
      try {
        if (data.code === 200) {
          fetchApiDetails();
          setOnSubmit(false);
          setEdit(false);
        }
      } catch (e) {
        setError(data.message)
        console.error(e);
      }
    });
  };

  // Manage location function.Incase use this.
  const handleIsLit = evt => {
    setAddress({
      ...address,
      address: evt.address,
      street: evt.address,
      zip: evt.zip,
      city: (evt.region ==="" || evt.region === null || evt.region === undefined)?evt.city:evt.region,
      country: evt.country,
      mapPosition: { lat: evt.mapPosition.lat, long: evt.mapPosition.long },
      markerPosition: {
        lat: evt.markerPosition.lat,
        long: evt.markerPosition.long
      }
    });
  };

  return (
    <div className="content-outerdiv">
      <div className="top-nav"></div>
      <div>
        <div className="container pt-4 d-flex mb-3 ">
          <div className="pl-4">
            <p className="browserback float-left pt-1" onClick={() => history.goBack()}>back</p>
            <h4 className="renov_txt pl-2 pt-1 float-left">Renovation</h4>
          </div>
          <div className="pl-2 text-right">
            {!edit && (
              <button
                className="edit-btn rounded-circle pb-1 text-dark"
                type="button"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <img src={Edit} alt={"Edit"} width={"10px"} />
              </button>
            )}
          </div>
        </div>
        <div className="container d-flex pl-5">
          <EditProjectForm
            projectAddress={address}
            edit={edit}
            setEdit={setEdit}
            handleSubmit={handleSubmit}
            onSubmit = {onSubmit}
          />
          <div className="col-md-6 col-sm-12 col-12 item pl-5">
            <div className="card item-card card-block">
              <GoogleMapComponent
                map={mapId}
                edit={edit}
                handleAddr={handleIsLit}
              />
            </div>
          </div>
        </div>
        <div>{error ? error : ""}</div>
        <div className="container d-flex">
          <div className="col-md-12 mb-5 float-right">
            <div className="col-md-12 text-right">
             { edit && <button
                type="submit"
                className="ml-2 action-btn btn-left btns btn btn-primary btn-color"
                onClick={() => {
                  setOnSubmit(true);
                }}
              >
                {" "}
                Submit{" "}
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAddressMarker;
