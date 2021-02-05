import React, { useState, useEffect } from "react";
import { APICALL } from "../../Services/ApiServices";
import { TaskList } from "../../Services/ApiEndPoints";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import SearchBox from "../Common/SearchBox";
import { Link } from "react-router-dom";
import InfoIcon from "../../Static/Assets/Group10897.png";
import TaskdataLogo from "../../Static/Assets/TaskDataLogo-w.png";
import EditTaskLogo from "../../Static/Assets/EditTaskLogo.png";
import PicturesLogo from "../../Static/Assets/PicturesLogo-w.png";
import PlusIcon from "../../Static/Assets/PlusIcon.png";
import CancelIcon from "../../Static/Assets/cancel-icon.png";

function ProjectTasks() {
  const history = useHistory();
  const [TaskData, setTaskData] = useState();
  const [Result, setResult] = useState();
  const [filter, setFilter] = useState();
  const [noDataValue, setnoDataValue] = useState();
  const [searchValue, setsearchValue] = useState("");
  const [modalVisibility, setmodalVisibility] = useState(false);
  const get_id = JSON.parse(localStorage.getItem("currentUser"));
  const getProject_id = JSON.parse(localStorage.getItem("projectId"));

  //Calling API to fetch data from back-end
  useEffect(() => {
    APICALL.service(TaskList, "POST", {
      user_id: get_id.id,
      project_id: getProject_id,
    })
      .then((data) => {
        if (data !== "undefined") {
          if (data.code !== "400") {
            setTaskData(data.data);
            setResult(data.data);
          } else {
            setnoDataValue("No tasks found");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getProject_id, get_id.id]);

  //Function to return string based on data from backend
  function TaskStatusRender(status) {
    switch (status) {
      case "0":
        return "new";
      case "1":
        return "ongoing";
      case "2":
        return "pending";
      case "3":
        return "finished";
      default:
        break;
    }
  }

  // To filter data
  let excludeColumns1 = [
    "username",
    "status",
    "name",
    "desc",
    "added_on",
    "added_by",
  ];
  let excludeColumns = ["id"];
  const filterData = (value, type) => {
    if (type === "detail") excludeColumns = excludeColumns1;
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setTaskData(Result);
    else {
      const filteredData = Result
        ? Object.values(Result).filter((item) => {
            return Object.keys(item).some((key) =>
              item[key] !== null
                ? excludeColumns.includes(key)
                  ? false
                  : item[key].toString().toLowerCase().includes(lowercasedValue)
                : null
            );
          })
        : [null];
      if (excludeColumns.length > 1) setFilter(filteredData);
      else setTaskData(filteredData);
    }
  };

  // To trigger popup to display task info
  const DetailShowFunction = (key) => {
    filterData(key.toString(), "detail");
    setmodalVisibility(true);
  };

  // popup close function
  const PopupSubmit = () => {
    setmodalVisibility(false);
  };

  const SearchElements = (e) => {
    setsearchValue(e.target.value);
    filterData(e.target.value);
  };

  return (
    <div
      className={
        modalVisibility
          ? "container animated position-set"
          : "container position-set"
      }
    >
      {/* Data inside popup */}
      <Modal show={modalVisibility} animation={false} centered>
        <Modal.Header>
          <h3 className="text-center model-title p-0"> Task info </h3>
          <div>
            <img
              src={CancelIcon}
              className="rounded-circle custom-cursor mt-1"
              width="25px"
              alt="close"
              onClick={() => PopupSubmit()}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="mt-0 pt-0">
          {filter &&
            Object.keys(filter).map((e) => (
              <div key={e}>
                <p className="textcolor2">Task Name</p>
                <p>{filter[e].name}</p>
                <p className="textcolor2">Task description</p>
                <p>{filter[e].desc}</p>
                <p className="textcolor2">Task executer</p>
                {filter[e].self_task === "1" ? (
                  <p>{filter[e].username}</p>
                ) : (
                  <>
                    <p>
                      {" "}
                      Company name: {filter[e].company_details.companyname}
                    </p>
                    <p> Vat: {filter[e].company_details.vat}</p>
                  </>
                )}
                <p className="textcolor2">Task status</p>
                <p>{TaskStatusRender(filter[e].status)}</p>
                <p className="textcolor2">Task added by</p>
                <p>{filter[e].username}</p>
              </div>
            ))}
        </Modal.Body>
      </Modal>
      {/* Data outside popup */}
      <div className="row py-3 mr-4">
        <div className="col-md-6">
          <p
            className="browserback col-md-4 float-left"
            onClick={() => history.goBack()}
          >
            back
          </p>
          <h3 className="col-md-8 float-left">Project tasks</h3>
        </div>
        <div className="col-md-2">
          <Link to="/add_task" className="float-left" title="Add task">
            <img
              src={PlusIcon}
              className="footericons rounded-circle bg-white shadow"
              width="32px"
              alt="PlusIcon"
            />
          </Link>
          <h5 className="float-left mx-2 mt-1"> Add task </h5>
        </div>
        <div className="col-md-4">
          <SearchBox
            onSearchValue={SearchElements}
            searchVal={searchValue}
            placeholder={"Search"}
            disable={noDataValue === undefined ? false : true}
          />
        </div>
      </div>
      <div className="row topsection-wrap ml-4 mr-4 pl-2">
        {TaskData && TaskData.length === 0 && (
          // <p className="text-danger text-center col-md-12">Search not found</p>
          <h2 className="text-center col-md-12">Search not found</h2>
        )}
        {TaskData === undefined && noDataValue === undefined && (
          <p className="text-center  col-md-12">Loading tasks...</p>
        )}
        {TaskData !== undefined &&
          Object.keys(TaskData).map((key) => {
            return (
              <div className="col-md-4 col-sm-12" key={key}>
                <div className="card my-3 task-border">
                  <div className="card-body">
                    <h6 className="card-title my-0">Task name</h6>
                    <p className="card-text">{TaskData[key].name}</p>
                    <h6 className="card-title my-0">Status</h6>
                    <p className="card-text">
                      {TaskStatusRender(TaskData[key].status)}
                    </p>
                    <h6 className="card-title my-0">Added on</h6>
                    <p className="card-text">{TaskData[key].added_on}</p>
                    <h6 className="card-title my-0">Who is executing</h6>
                    <p className="card-text">
                      {TaskData[key].self_task === "1"
                        ? TaskData[key].username
                        : TaskData[key].company_details.companyname}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="float-right py-2">
                      <Link
                        to={`/task_data/${TaskData[key].id}`}
                        title="Task data"
                      >
                        <img
                          src={TaskdataLogo}
                          className="footericons rounded-circle shadow custom-bg mx-2"
                          width="43px"
                          alt="TaskDataLogo"
                        />
                      </Link>
                      <Link
                        to={`/add_task/${TaskData[key].id}`}
                        title="Edit task"
                      >
                        <img
                          src={EditTaskLogo}
                          className="footericons rounded-circle shadow custom-bg mx-2"
                          width="43px"
                          alt="EditTaskLogo"
                        />
                      </Link>
                      <Link
                        to={`/task_pictures/${TaskData[key].id}`}
                        title="Task pictures"
                      >
                        <img
                          src={PicturesLogo}
                          className="rounded-circle shadow custom-bg mx-2"
                          width="43px"
                          alt="PicturesLogo"
                        />
                      </Link>
                      <img
                        className="rounded-circle shadow customCursor mx-2"
                        onClick={() => DetailShowFunction(TaskData[key].id)}
                        src={InfoIcon}
                        alt="info-icon"
                        width="43px"
                        title="Task info"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="mt-5">
        {noDataValue !== undefined ? (
          <h2 className="text-center">{noDataValue}</h2>
        ) : null}
      </div>
    </div>
  );
}
export default ProjectTasks;
