import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SelectCompany from "../Company/SelectCompany";
import { Modal } from "react-bootstrap";
import { APICALL } from "../../Services/ApiServices";
import { useParams } from "react-router";
import { AddTasks } from "../../Services/ApiEndPoints";
import { UpdateTask } from "../../Services/ApiEndPoints";
import { SingleTask } from "../../Services/ApiEndPoints";
import Alert from "react-bootstrap/Alert";
import PlusIcon from "../../Static/Assets/PlusIcon.png";
import "./task.css";
import CancelIcon from "../../Static/Assets/cancel-icon.png";

function AddTask() {
  const [formData, SetFormData] = useState({
    task_name: "",
    task_description: "",
    task_executer: "",
    task_status: "",
    cid: "",
    cname: "",
    cvat: "",
  });
  const [dataInsideModel, setdataInsideModel] = useState();
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const get_id = JSON.parse(localStorage.getItem("currentUser"));
  const getProject_id = JSON.parse(localStorage.getItem("projectId"));
  let params = useParams();

  //Calling API to fetch data from back-end when editing a task
  useEffect(() => {
    if (params.id !== undefined) {
      APICALL.service(SingleTask, "POST", {
        task_Id: params.id,
      })
        .then((data) => {
          if (data !== "undefined") {
            if (data.code === 200) {
              let responseData = data.data;
              SetFormData({
                ...formData,
                task_name: responseData.name,
                task_description: responseData.desc,
                task_executer: responseData.self_task,
                task_status: responseData.status,
                cid: responseData.company_id,
                cname: responseData.company_name,
                cvat: responseData.vat_number,
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      SetFormData({
        ...formData,
        task_status: "0",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //when submitting the form
  function onSubmit(e) {
    e.preventDefault();
    if (
      formData.task_executer === "0" &&
      (formData.cid === "" || formData.cid === null)
    ) {
      setMessage("Please select a company");
    } else {
      if (params.id !== undefined) {
        APICALL.service(UpdateTask, "POST", {
          task_Id: params.id,
          task_title: formData.task_name,
          description: formData.task_description,
          status: formData.task_status,
          self_task: formData.task_executer,
          company_id: formData.cid,
        })
          .then((data) => {
            if (data.code === 200) {
              history.push("/project_tasks");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        APICALL.service(AddTasks, "POST", {
          user_id: get_id.id,
          task_title: formData.task_name,
          project_id: getProject_id,
          description: formData.task_description,
          status: formData.task_status,
          self_task: formData.task_executer,
          company_id: formData.cid,
        })
          .then((data) => {
            if (data.code === "200") {
              history.push("project_tasks");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  //When any field input changes
  function updateField(e) {
    SetFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  //To store selected company details
  function CompanySelector(companyData) {
    SetFormData({
      ...formData,
      cid: companyData.id,
      cname: companyData.name,
      cvat: companyData.vat,
    });
    setmodalVisibility(false);
  }

  //To construct data inside the pop-up to display list of companies
  function AddCompany() {
    setdataInsideModel(
      <div>
        <div className="float-right m-auto p-2">
          <img
            src={CancelIcon}
            className="rounded-circle custom-cursor"
            width="25px"
            alt="close"
            title="Close"
            onClick={() => setmodalVisibility(false)}
          />
        </div>
        <SelectCompany CompanySelector={CompanySelector} />
      </div>
    );
    setmodalVisibility(true);
  }

  return (
    <div className="container position-set">
      <div className="row mt-4">
            <div className="col-md-12">
              <p
                className="browserback col-md-4 float-left mr-4"
                onClick={() => history.goBack()}
              >
                back
              </p>
              <h3>Renovation 1</h3>
            </div>
          </div>
      <div className="container">
        {/* Data shown inside popup */}
        <Modal
          show={modalVisibility}
          className=""
          animation={false}
          size="lg"
          centered
        >
          <Modal.Body className="mt-0 pt-0">{dataInsideModel}</Modal.Body>
        </Modal>
        {/* Data shown outside popup */}
        <div className="mx-5">
          <div className="row my-3">
            <div className="col-md-12">
              <h4>Add task</h4>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row my-3">
              <div className="col-md-6">
                <label>Task name</label>
                <input
                  type="text"
                  className="form-control w-75 task-border shadow"
                  required
                  id="task_name"
                  name="task_name"
                  onChange={updateField}
                  value={formData.task_name}
                />
              </div>
              <div className="col-md-6">
                <label>Who will execute this task?</label>
                <div className="radio">
                  <label className="green_radio">
                    <input
                      type="radio"
                      name="task_executer"
                      value="1"
                      onChange={updateField}
                      checked={formData.task_executer === "1"}
                      required="required"
                    />
                    <span className="checkmark_radio"></span>
                    <span className="yes-radio radio-yes">
                      {" "}
                      I will do it myself{" "}
                    </span>
                  </label>
                </div>
                <div className="radio">
                  <label className="green_radio">
                    <input
                      type="radio"
                      name="task_executer"
                      value="0"
                      onChange={updateField}
                      checked={formData.task_executer === "0"}
                      required="required"
                    />
                    <span className="checkmark_radio"></span>
                    <span className="yes-radio radio-yes">
                      {" "}
                      A construction company will do it{" "}
                    </span>
                  </label>
                  {message.length > 0 && (
                    <Alert
                      variant="danger"
                      onClose={() => setMessage("")}
                      dismissible
                      className="w-75"
                    >
                      {message}
                    </Alert>
                  )}
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <label>Task description</label>
                <textarea
                  name="task_description"
                  id="task_description"
                  className="form-control w-75 desc-height border task-border shadow"
                  onChange={updateField}
                  value={formData.task_description}
                />
              </div>
              {formData.task_executer === "0" ? (
                <div className="col-md-6">
                  <div className="w-75">
                    <img
                      src={PlusIcon}
                      className="footericons rounded-circle bg-white shadow mr-2 customCursor"
                      width="30px"
                      alt="Plus-icon"
                      onClick={AddCompany}
                    />{" "}
                    {formData.cid === "" || formData.cid === null
                      ? "Add or select company"
                      : "Change company"}{" "}
                  </div>
                  {formData.cid !== undefined &&
                  formData.cid !== null &&
                  formData.cid !== "" ? (
                    <div className="card task-border w-75 mt-2 p-2">
                      <h6 className="card-title my-0">Company name</h6>
                      <p className="card-text">{formData.cname}</p>
                      <h6 className="card-title my-0">Vat number</h6>
                      <p className="card-text">{formData.cvat}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="row mt-5">
              {params.id === undefined ? null : (
                <div className="col-md-6">
                  <label>Task Status?</label>
                  <div className="radio">
                    <label className="green_radio">
                      <input
                        type="radio"
                        name="task_status"
                        value="0"
                        onChange={updateField}
                        checked={formData.task_status === "0"}
                      />
                      <span className="checkmark_radio"></span>
                      <span className="yes-radio radio-yes"> New </span>
                    </label>
                  </div>
                  <div className="radio">
                    <label className="green_radio">
                      <input
                        type="radio"
                        name="task_status"
                        value="1"
                        onChange={updateField}
                        checked={formData.task_status === "1"}
                      />
                      <span className="checkmark_radio"></span>
                      <span className="yes-radio radio-yes"> Ongoing </span>
                    </label>
                  </div>
                  <div className="radio">
                    <label className="green_radio">
                      <input
                        type="radio"
                        name="task_status"
                        value="2"
                        onChange={updateField}
                        checked={formData.task_status === "2"}
                      />
                      <span className="checkmark_radio"></span>
                      <span className="yes-radio radio-yes"> Pending </span>
                    </label>
                  </div>
                  <div className="radio">
                    <label className="green_radio">
                      <input
                        type="radio"
                        name="task_status"
                        value="3"
                        onChange={updateField}
                        checked={formData.task_status === "3"}
                      />
                      <span className="checkmark_radio"></span>
                      <span className="yes-radio radio-yes"> Finished </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="mx-5">
              <div className="row py-3 my-3 float-right mx-5 w-75">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn custom-bg-highlight float-right actionButton mx-2 px-5 py-2 task-border"
                  >
                    {" "}
                    {params.id === undefined
                      ? "Create task"
                      : "Update task"}{" "}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
