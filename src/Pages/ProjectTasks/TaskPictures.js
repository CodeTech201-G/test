import React, { useState, useEffect } from "react";
import "./task.css";
import { APICALL } from "../../Services/ApiServices";
import { ManagePictures } from "../../Services/ApiEndPoints";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Modal } from "react-bootstrap";
import CancelIcon from "../../Static/Assets/cancel-icon.png";

function TaskPictures(props) {
  const history = useHistory();
  let params = useParams();
  const [noDataValue, setnoDataValue] = useState();
  const [taskPicturesData, settaskPicturesData] = useState();
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [popupData, setpopupData] = useState();
  const [passedImageData, setpassedImageData] = useState();
  const [projectName, setProjectName] = useState();

  useEffect(() => {
    if (props.location.ImageData !== undefined) {
      setpassedImageData(props.location.ImageData);
    }
    if (props.location.ProjectFieldName !== undefined) {
      setProjectName(props.location.ProjectFieldName);
    } else if (params.id === undefined) {
      setnoDataValue("No images found for task");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Calling API to fetch data from back-end
  useEffect(() => {
    if (params.id !== undefined) {
      APICALL.service(ManagePictures, "POST", {
        task_id: params.id,
      })
        .then((data) => {
          if (data !== "undefined") {
            if (data.code !== "400") {
              settaskPicturesData(data);
            } else {
              setnoDataValue(data.message);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // To trigger popup to display task info
  const DetailShowFunction = (data) => {
    setpopupData(data);
    setmodalVisibility(true);
  };

  // popup close function
  const PopupSubmit = () => {
    setmodalVisibility(false);
  };

  return (
    <div
      className={
        modalVisibility
          ? "container animated position-set"
          : "container position-set"
      }
    >
      <Modal show={modalVisibility} animation={false} centered>
        {popupData && (
          <Modal.Body className="mt-0 pt-0 task-border">
            <div className="my-2 row">
              <div className="col-md-12">
                <img
                  src={CancelIcon}
                  className="rounded-circle custom-cursor float-right"
                  width="25px"
                  alt="close"
                  onClick={() => PopupSubmit("close")}
                />
              </div>
            </div>
            <div className="">
              <div>
                <img
                  src={
                    popupData.image_original !== undefined
                      ? popupData.image_original
                      : popupData.image_data.image_original
                  }
                  className="card-img-top task-border w-100"
                  alt="task_images"
                />
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <h6 className="card-text float-left">
                    {popupData.image_title !== undefined
                      ? popupData.image_title
                      : popupData.image_data.image_title}
                  </h6>
                </div>
                <div className="col-md-6">
                  <p className="card-text text-secondary float-right">
                    {popupData.image_date !== undefined
                      ? popupData.image_date
                      : popupData.image_data.image_date}
                  </p>
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-12">
                  <p className="card-text">
                    {popupData.image_description !== undefined
                      ? popupData.image_description
                      : popupData.image_data.image_description}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
      <div className="my-4">
        <p
          className="browserback col-md-4 float-left mr-2 picture_task_bkbtn"
          onClick={() => history.goBack()}
        >
          back
        </p>
        {taskPicturesData && <h3>{taskPicturesData.project_name}</h3>}
        {projectName && <h3>{projectName}</h3>}
      </div>
      <div className="row py-1">
        <span className="col-md-6">
          {taskPicturesData && (
            <h5>Pictures of {taskPicturesData.task_name}</h5>
          )}
          {passedImageData && <h5>Pictures of {passedImageData.taskName}</h5>}
        </span>
      </div>
      <div className="row my-2">
        {taskPicturesData === undefined &&
          noDataValue === undefined &&
          passedImageData === undefined && (
            <p className="text-center col-md-12">Loading pictures...</p>
          )}
        {noDataValue !== undefined ? (
          <h2 className="text-center col-md-12">{noDataValue}</h2>
        ) : null}
        {/* constructing div structure based on assigned data */}
        {taskPicturesData !== undefined &&
          Object.keys(taskPicturesData.data).map((key) => {
            return (
              <div className="col-md-3" key={key}>
                <div className="card  my-2 shadow">
                  <img
                    onClick={() =>
                      DetailShowFunction(taskPicturesData.data[key])
                    }
                    src={taskPicturesData.data[key].image_preview}
                    className="card-img-top  w-100 customCursor"
                    alt="task_images"
                  />
                  <div className="card-body row">
                    <div className="col-md-6">
                      <p className="card-text">
                        {taskPicturesData.data[key].image_title}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text text-secondary">
                        {taskPicturesData.data[key].image_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {passedImageData !== undefined &&
          Object.keys(passedImageData.image_data).map((key) => {
            return (
              <div className="col-md-3" key={key}>
                <div className="card  my-2 shadow">
                  <img
                    onClick={() =>
                      DetailShowFunction(passedImageData.image_data[key])
                    }
                    src={passedImageData.image_data[key].image_preview}
                    className="card-img-top  w-100 customCursor"
                    alt="task_images"
                  />
                  <div className="card-body row">
                    <div className="col-md-6">
                      <p className="card-text">
                        {passedImageData.image_data[key].image_title}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text text-secondary">
                        {passedImageData.image_data[key].image_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TaskPictures;
