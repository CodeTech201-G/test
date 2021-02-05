import React, { useEffect, useState } from "react";
import { APICALL } from "../../Services/ApiServices";
import { ExportDIY } from "../../Services/ApiEndPoints";
import "./report.css";
import { useParams } from "react-router-dom";
import ReactExport from "react-export-excel";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Edit from "../../Static/Assets/download_DIY.png";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ReportDIY = () => {
  const project = useParams();
  const [taskDetails, setTaskDetails] = useState("");
  const [exportDetails, setExport] = useState("");
  const [totalWH, setTWH] = useState("");
  const [totalTaskHours, setTotalTaskHours] = useState("");
  const history = useHistory();

  useEffect(() => {
    let uid = JSON.parse(localStorage.getItem("currentUser"))["id"];
    let pid = project.id ? project.id : 0;
    APICALL.service(ExportDIY, "POST", {
      user_id: uid,
      project_id: pid
    }).then(data => {
      try {
        if (data.code === "200") {
          let api_res = data.data;
          let td = [];
          Object.values(api_res.task_details).forEach(ele => {
            td.push(ele);
          });
          let task_hours = {},
            totalhrs = 0;
          for (let key in api_res.task_status) {
            let total_task_hours = 0;
            if (api_res.task_status.hasOwnProperty(key)) {
              Object.values(api_res.task_status[key]).forEach((sub_task, j) => {
                let date1 = sub_task.starttime.split(/:| /);
                date1 = new Date(
                  date1[2],
                  date1[1],
                  date1[0],
                  date1[3],
                  date1[4],
                  date1[5]
                );
                let date2 = sub_task.stoptime.split(/:| /);
                date2 = new Date(
                  date2[2],
                  date2[1],
                  date2[0],
                  date2[3],
                  date2[4],
                  date2[5]
                );
                let hours = Math.abs(date1 - date2) / 36e5;
                total_task_hours = total_task_hours + hours;
              });
              totalhrs = Math.floor(totalhrs + total_task_hours);
              task_hours[key] = Math.floor(total_task_hours);
            }
          }

          setTotalTaskHours(task_hours);
          setTWH(totalhrs);

          let export_data = [];
          Object.values(api_res.task_status).forEach((ele, id) => {
            Object.values(ele).forEach((sub_task, j) => {
              let tname = id === j ? "Task " + (id + 1) : "";
              let date = sub_task.starttime.split(" ")[0].replaceAll(/:/g, "/");
              export_data.push({
                task: tname,
                date: date,
                start_time: sub_task.starttime,
                end_time: sub_task.stoptime,
                hours_spent: sub_task.timeWorked,
                comments: sub_task.comments,
                task_name: sub_task.taskName
              });
            });
          });
          setExport(export_data);
          setTaskDetails(td);
          console.log(td);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, [project.id]);

  return (
    <div className="content-outerdiv">
      <div className="top-nav"></div>
      <div className="container">
        <div className="row pt-4 pb-2">
          <p
            className="browserback float-left pt-1 ml-3"
            onClick={() => history.goBack()}
          >
            back
          </p>
          <h2 className="text-center pl-2 ml-1">Renovation 1</h2>
        </div>
        <div className="d-flex ml-4 pl-3">
          <div className="col-md-10 float-left p-2">
            <h5>Report</h5>
          </div>
          <div className="col-md-2 float-right text-right pr-0">
            <ExcelFile
              element={
                <button className="btn btn-wrng">
                  <span>Export DIY</span>{" "}
                  <img src={Edit} alt={""} width={"30px"} />
                </button>
              }
            >
              <ExcelSheet data={exportDetails} name="Employees">
                <ExcelColumn label="Task name" value="task" />
                <ExcelColumn label="Task description" value="task_name" />
                <ExcelColumn label="Date" value="date" />
                <ExcelColumn label="Start time" value="start_time" />
                <ExcelColumn label="End time" value="end_time" />
                <ExcelColumn label="Hours spent" value="hours_spent" />
                <ExcelColumn label="Comments" value="comments" />
              </ExcelSheet>
            </ExcelFile>
          </div>
        </div>
        <div className="content-wrapper card pl-3 pr-2 ml-5">
          <div className="container report-details ">
            <div className="row pt-4 pb-4 task-item ml-2 mr-2 justify-content-center ">{`DIY: In total you have spent ${totalWH} hours on your site`}</div>
            {Object.values(taskDetails).map((ele, i) => {
              return (
                <div className="row pt-4 pb-4 task-item m-2">
                  <div className="col-md-3">{ele.name}</div>
                  <div className="col-md-7 ">
                    <div className="pb-2">
                      DIY: you have worked{" "}
                      {totalTaskHours[ele.id] ? totalTaskHours[ele.id] : 0}{" "}
                      hours on this task
                    </div>
                    <div>
                      {ele.username.trim("") !== ""
                        ? ele.username
                        : "Anonymous user"}{" "}
                      has worked{" "}
                      {totalTaskHours[ele.id] ? totalTaskHours[ele.id] : 0}{" "}
                      hours on this task
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Link to={`/task_data/${ele.id}`}>
                      <button className="btn btn-wrng">Reference link</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDIY;
