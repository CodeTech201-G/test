import React, { useState, useEffect } from 'react';
import './CreateProject.css'
import ProjectRegistrationForm from './ProjectRegistrationForm';
// import ProjectContact from './ProjectContact';
import { Modal } from "react-bootstrap";
import CorrectImg from '../../Static/Assets/correct (1).png';
import { useHistory } from 'react-router-dom';
import { APICALL } from "../../Services/ApiServices";
import { AddProject } from "../../Services/ApiEndPoints";
import { CheckUserProject } from "../../Services/ApiEndPoints";
// import SelectCompany from '../Company/SelectCompany';
function CreateProject() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [projectShow, setprojectShow] = useState(false);
  const [errorShow,setErrorShow] = useState(false);
  const history = useHistory();
  const [get_id] = useState(JSON.parse(localStorage.getItem("currentUser")))
  const [projectId, setProjectId] = useState();
  const [msg, setMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  // const [form, setState] = useState({
  //   "ProjectName": "",
  //   "Street": "",
  //   "Number": "",
  //   "Box": "",
  //   "postalCode": "",
  //   "city": "",
  //   "country": "",
  //   "yourself": false,
  //   "firstName": "",
  //   "lastName": "",
  //   "email": "",
  //   "latitude": "",
  //   "longitude": "",
  // });
  // Api call to check the user able to create project are not
  useEffect(() => {
    APICALL.service(CheckUserProject, "POST", {
      'user_id': get_id.id,
    })
      .then((data) => {
        try {
          if (data.code === '400') {
            setprojectShow(true)
          }
        } catch (e) {
          console.error(e);
        }
      })
  }, [get_id]);

  // // update the fields based on onchange functions
  // const updateField = e => {
  //   e.preventDefault();
  //   setState({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   });
  // };
  // // updating the Google map fields
  // const updateField1 = (arr) => {
  //   arr && setState({
  //     ...form,
  //     'Street': arr.address,
  //     'postalCode': arr.zip,
  //     'city': arr.city,
  //     'country': arr.country,
  //     'latitude': arr.mapPosition.lat,
  //     'longitude': arr.mapPosition.long
  //   })
  // }
  // creating the project onsubmit event and switching page
  const handleSubmit = (e, data) => {
    // e.preventDefault();
    console.log(e);
    console.log(data);
    setPage(data)
    if (page === 2 || data === 2) {
      if (e.ProjectName !== "") {
        APICALL.service(AddProject, "POST", {
          'user_id': get_id.id,
          'company_id': '',
          'phone': '',
          'email': '',
          'website': '',
          'project_title': e.ProjectName,
          'box': e.Box,
          'street': e.Street,
          'number': e.Number,
          'city': e.city,
          'country': e.country,
          'postal': e.postalCode,
          'address_title': e.Street,
          'latitude': e.latitude,
          'longitude': e.longitude,
        })
          .then((data) => {
            try {
              if (data.code === '200') {
                setProjectId(data.data.id)
                setShow(true);
                setMsg('')
              }
              else{
                setErrorMsg(data.message);
                setErrorShow(true);
                setMsg('')
              }
            } catch (e) {
              console.error(e);
            }
          })
      }
      else {
        setMsg('Please enter project name');
      }
    } else
      setPage(2)
  }
  // const backButton=()=>{
  //   if(page === 2)
  //     setPage(1);
  //   else{
  //     history.goBack();
  //   }
  // }
  // popup close function
  const PopupClose = () => {
    setShow(false);
    if (projectShow)
      history.push("/")
    else if(errorShow){
      setErrorShow(false);
    }
    else
      history.push("/project_question/" + projectId)
  }
  return (
    <div className={show || projectShow || errorShow ? "container  animated" : "container"}>
      <div className="col-md-12 topsection-wrap  mt-0 px-0 pt-4">
        <Modal show={show || projectShow || errorShow} className="text-center p-0 m-0" centered size="sm">
          <Modal.Body className={show?"mt-0 pt-4 m-0 p-0":"mt-0 pt-4"}>
            {show && <img src={CorrectImg} alt="suprice img" width="50px" />}
            {projectShow &&
              <div className="pt-2">
                <p className="text-center h5">Alert</p>
                <p className="p-0">
                  You have reached the limit of basic usage, please check our website for more features
                </p>
                <p className="text-center">
                  <a href="https://www.construction.com">www.construction.com</a>
                </p>
              </div>}
              {errorShow &&
                <div className="pt-2">
                   <p className="text-center h5">Alert</p>
                   <p className="text-center p-2">{errorMsg}</p> 
                </div>
              }
            {show && <div className="text-center">
              <p className="text-center pt-1">
                Congratulations !
                  </p>
              <p>
                Your project is created.
                  </p>
              <small> We will now ask you a few additional questions.</small></div>}
            <div className="col-md-12 text-center mt-2 p-0 mb-4">
              {<div className={projectShow ? "col-md-6 p-0 m-0 float-left pr-1 " : "col-md-12"}>
                <button
                  type="submit"
                  className="btn custom-btn-border-color w-100 custom-btn-color-yellow"
                  onClick={() => PopupClose()}
                >
                  {projectShow ? ("OK") :errorShow ?("Close"):("Continue")}
                </button>
              </div>}
              {projectShow && <div className="col-md-6 p-0 m-0 float-left">
                <a
                  type="submit"
                  className="btn custom-btn-border-color w-100 custom-btn-color-yellow"
                  href="https://www.construction.com"
                >
                  {("Visit")}
                </a>
              </div>}
            </div>
          </Modal.Body>
        </Modal>
        {/* <div className="row divBa">
          <div className="col-2">
            <p className="browserback" onClick={backButton}>back</p>
          </div>
          <h1 className="pagetitle col-8 textcolor1 text-center">{("Add project")}</h1>
        </div> */}
        <ProjectRegistrationForm onSubmit={handleSubmit} msg={msg} />
        {/* {page === 2 && show === false &&<ProjectContact updateField={updateField} form={form} onSubmit={handleSubmit} backButton={backButton}/>} */}
        <div>
          {/* <SelectCompany/> */}
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
