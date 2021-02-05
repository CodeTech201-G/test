import React, { useState, useEffect } from "react";
import "../../Static/common.css";
import { APICALL } from "../../Services/ApiServices";
import { TaskDataList } from "../../Services/ApiEndPoints";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

function TaskData(props) {
  const history = useHistory();
  let params = useParams();
  const [taskDetails, settaskDetails] = useState();
  const [noDataValue, setnoDataValue] = useState();
  const [projectName, setProjectName] = useState();
  const [taskStatus, settaskStatus] = useState();
  const [companyName, setcompanyName] = useState();

  //Calling API to fetch data from back-end
  useEffect(() => {
    APICALL.service(TaskDataList, "POST", {
      task_id: params.id,
    })
      .then((data) => {
        if (data !== "undefined") {
          if (data.success !== "400") {
            settaskDetails(data.data.result);
            setProjectName(data.data.task_details.project_name);
            settaskStatus(data.data.task_details.task_status);
            if (data.data.task_details.company_details !== undefined) {
              setcompanyName(
                data.data.task_details.company_details.data.companyname
              );
            }
          } else {
            setnoDataValue(data.message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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

  // To display pictures related to task data
  function displayPictures(data) {
    history.push({
      pathname: "/task_pictures",
      ImageData: data,
      ProjectFieldName: projectName,
    });
  }

  return (
    <div className="container position-set">
      <div className="row my-3">
        <span className="col-md-6">
          <p
            className="browserback col-md-4 float-left mr-3"
            onClick={() => history.goBack()}
          >
            back
          </p>
          <h3>{projectName}</h3>
        </span>
      </div>
      <div className="row mx-4 pl-2">
        <span className="col-md-6">
          <h4>Task data</h4>
        </span>
        <span className="col-md-6">
          {taskStatus && (
            <h5 className="float-right">
              Status: {TaskStatusRender(taskStatus)}
            </h5>
          )}
        </span>
      </div>
      {taskDetails === undefined && noDataValue === undefined && (
        <p className="text-center col-md-12">Loading task data...</p>
      )}
      {noDataValue !== undefined ? (
        <h2 className="text-center">{noDataValue}</h2>
      ) : null}
      <div className="row my-2 mx-4 pl-2">
        {/* constructing div structure based on assigned data */}
        {taskDetails !== undefined && (
          <div className="col-md-12 p-2">
            <div className="card task-border">
              <div className="card-body">
                {taskDetails !== undefined &&
                  Object.keys(taskDetails).map((key) => {
                    return (
                      <div className="row border-bottom mb-2 py-3" key={key}>
                        <div className="col-md-3">
                          <p>
                            {taskDetails[key].starttime !== undefined &&
                              taskDetails[key].starttime
                                .replaceAll(":", ".")
                                .slice(0, 10)}
                          </p>
                          <p>
                            {taskDetails[key].starttime !== undefined &&
                              taskDetails[key].starttime.slice(11, 16)}{" "}
                            -{" "}
                            {taskDetails[key].starttime !== undefined &&
                              taskDetails[key].stoptime.slice(11, 16)}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="card-text">
                            person {taskDetails[key].username}{" "}
                            {companyName && companyName !== undefined
                              ? `from ${companyName}`
                              : null}{" "}
                            worked between{" "}
                            {taskDetails[key].starttime !== undefined &&
                              taskDetails[key].starttime.slice(11, 16)}{" "}
                            and{" "}
                            {taskDetails[key].starttime !== undefined &&
                              taskDetails[key].stoptime.slice(11, 16)}
                          </p>
                          <h6 className="text-secondary">Comments</h6>
                          <p>{taskDetails[key].comments}</p>
                        </div>
                        <div className="col-md-3 m-auto">
                          {taskDetails[key].image_data !== "" ? <button
                            className="btn mx-5 px-5 custom-bg-highlight task-border"
                            onClick={() => displayPictures(taskDetails[key])}
                          >
                            {" "}
                            Pictures{" "}
                          </button> : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default TaskData;
