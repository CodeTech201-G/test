import React, { useState, useEffect } from "react";
import "./QuestionComponent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import task from "../../Static/Assets/tasks.png";
import { APICALL } from "../../Services/ApiServices";
import { AddProjectsQuestions } from "../../Services/ApiEndPoints";
import SelectCompany from "../Company/SelectCompany";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import PlusIcon from "../../Static/Assets/PlusIcon.png";
import CancelIcon from "../../Static/Assets/cancel-icon.png";

const QuestionComponent = () => {
  const history = useHistory();
  const intialvalues = [
    {
      text: "What kind of construction is your project?",
      options: [
        {
          id: 1,
          value: "Renovation of building older than 10 years"
        },
        {
          id: 2,
          value: "Renovation of building younger than 10 years"
        },
        {
          id: 3,
          value: "New construction"
        }
      ],
      selected_option: ""
    },
    {
      text: " Do you want to add a start and end date for your project?",
      options: [
        {
          id: 1,
          value: "Yes"
        },
        {
          id: 2,
          value: "No"
        }
      ],
      selected_option: "",
      start_date: "",
      end_date: ""
    },

    {
      text: " Do you want a construction company to your whole project?",
      options: [
        {
          id: 1,
          value: "Yes"
        },
        {
          id: 2,
          value: "No, I will add it later to tasks"
        }
      ],
      selected_option: "",
      add_company: "add_company"
    }
  ];

  const initialState = 0;
  const [count, setCount] = useState(initialState);
  const [questions, setQuestions] = useState(intialvalues);
  const [error, setError] = useState("");
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [dataInsideModel, setdataInsideModel] = useState();
  // const [companyObject, setcompanyObject] = useState([]);
  const [companyListSelected, setCompanyListSelected] = useState([]);
  let companyObject = [];
  let params = useParams();
  useEffect(() => {
    if (count > 5 || count < 0) {
      setCount(initialState);
    }
  }, [count]);

  /*------------updating the questions object-----------------*/

  const updateObj = (val, id) => {
    const arrObj = questions[id];
    arrObj.selected_option =
      val.selectedId !== "" && val.selectedId !== undefined
        ? val.selectedId
        : arrObj.selected_option;

    if (id === 1) {
      arrObj.start_date =
        val.start_date !== undefined ? val.start_date : arrObj.start_date;
      arrObj.end_date =
        val.end_date !== undefined ? val.end_date : arrObj.end_date;
    }

    let newArr = [...questions]; // copying the old datas array
    newArr[id] = arrObj; // replace new value  with whatever you want to change it to
    setQuestions(newArr);
  };
  const sendToBackend = obj => {
    let send_obj = obj;
    let company_id = [];
    for (let i = 0; i < companyListSelected.length; i++) {
      company_id.push(companyListSelected[i].id);
    }
    console.log(send_obj);
    APICALL.service(AddProjectsQuestions, "POST", {
      project_id: params.id,
      linked_company: company_id,
      budget: 1,
      dates_required:
        send_obj[1].selected_option !== undefined
          ? send_obj[1].selected_option === ""?"":send_obj[1].selected_option - 1
          : "",
      create_project: 1,
      construction_type:
        send_obj[0].selected_option !== undefined
          ? send_obj[0].selected_option === ""?"":send_obj[0].selected_option - 1
          : "",
      construction_company_required: company_id.length > 0 ? 1 : 0,
      start_date:
        send_obj[1].start_date !== undefined
          ? formatDate(send_obj[1].start_date)
          : "",
      stop_date:
        send_obj[1].end_date !== undefined
          ? formatDate(send_obj[1].end_date)
          : "",
      budget_amount: 0,
      project_que_title: "Project Name"
    }).then(data => {
      try {
        if (data.code === "200") {
          localStorage.removeItem("SelectCompanyList");
          history.push("/projects");
        }
      } catch (e) {
        console.error(e);
      }
    });
  };
  const formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };
  const checkNext = count => {
    let newArr = [...questions];
    const arrObj = questions[count];

    if (count >= questions.length - 1) {
      if (arrObj.selected_option === 1 && companyListSelected.length > 0) {
        sendToBackend(newArr);
        setError("");
      } else if (arrObj.selected_option === 2) {
        sendToBackend(newArr);
        setError("");
      } else {
        setError("Add company details");
      }
    } else {
      if (
        arrObj.selected_option !== undefined &&
        arrObj.selected_option !== "" &&
        count <= 2
      ) {
        switch (count) {
          case 1:
            if (
              arrObj.selected_option === 1 &&
              arrObj.start_date !== "" &&
              arrObj.end_date !== ""
            ) {
              setCount(count + 1);
              setError("");
            } else if (arrObj.selected_option === 2) {
              arrObj.start_date = "";
              arrObj.end_date = "";
              newArr[count] = arrObj;
              setQuestions(newArr);
              setCount(count + 1);
              setError("");
            } else {
              setError("Start and End dates are required.");
            }
            break;
          default:
            setError("");
            setCount(count + 1);
        }
      } else {
        setError("Choose atleast one option.");
      }
    }
  };
  const checkSkip = count => {
    let newArr = [...questions];
    const arrObj = questions[count];
    arrObj.selected_option = "";
    switch (count) {
      case 1:
        arrObj.start_date = "";
        arrObj.end_date = "";
        newArr[count] = arrObj;
        setQuestions(newArr);
        setCount(count + 1);
        setError("");
        break;

      default:
        setCount(count + 1);
        setError("");
    }
  };

  function CompanySelector(companyData) {
    // var companyList=localStorage.setItem("SelectCompanyList",JSON.stringify(companyObject))
    var companyList1 = localStorage.getItem("SelectCompanyList");
    companyObject = companyList1 ? JSON.parse(companyList1) : [];
    companyObject.push(companyData);
    const uniqueFilterValues = Array.from(
      new Set(companyObject.map(a => a.id))
    ).map(id => {
      return companyObject.find(a => a.id === id);
    });
    localStorage.setItem(
      "SelectCompanyList",
      JSON.stringify(uniqueFilterValues)
    );
    setCompanyListSelected(uniqueFilterValues);
    setmodalVisibility(false);
  }

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
  // delete Array element based on click action
  const deleteCompanyFromArray = e => {
    setCompanyListSelected(
      companyListSelected.filter(function(number) {
        return number.id !== e;
      })
    );
  };
  localStorage.setItem(
    "SelectCompanyList",
    JSON.stringify(companyListSelected)
  );
  return (
    <div className="content-outerdiv">
      <Modal
        show={modalVisibility}
        className=""
        animation={false}
        size="lg"
        centered
      >
        <Modal.Body className="mt-0 pt-0">{dataInsideModel}</Modal.Body>
      </Modal>
      <div className="top-nav" style={{ background: "#263a93" }}></div>
      <div className="question-body-wrapper">
        <div className="justify-content-center">
          <div className="col-md-4 col-sm-12 col-12  question-area float-left">
            <div className="options-left">
              <div className="col-md-8 col-sm-8 col-8 pt-4 pb-4">
                <h4 className="text-center pl-3">Questions</h4>
              </div>
              {questions.map((currElement, index) => {
                return (
                  <div>
                    <div
                      className="col-md-12 col-sm-12 col-12 float-left d-flex alignitem-center"
                      style={{ height: "8vh !important" }}
                    >
                      <div className="float-left col-md-4 col-sm-4 col-4 ">
                        <div
                          className={`progressDot float-right${
                            count > index
                              ? " onQuestion"
                              : count === index
                              ? " onQuestionSelect"
                              : ""
                          }`}
                        >
                          {/*questions[index].selected_option !== undefined && questions[index].selected_option !== "" ?
                            <span><img src={check} className="check" alt="check" /></span> :*/ index +
                            1}
                        </div>
                      </div>
                      <div
                        className="float-left col-md-8 col-sm-8 col-8 align-self-center"
                        style={{
                          color: count >= index ? "#27171f" : "#888888"
                        }}
                      >
                        Question {index + 1}
                      </div>
                    </div>

                    {index < questions.length - 1 && (
                      <div
                        className="col-md-12 col-sm-12 col-12 float-left"
                        style={{ height: "8vh !important" }}
                      >
                        <div className="float-left col-md-4 col-sm-4 col-4  pt-2 pb-2">
                          <div className="flow-line offset-md-2"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-8 col-sm-12 col-12  question-area float-left">
            <div className="m-3 options">
              <div className="content-wrapper row">
                <div className="col-md-3 col-sm-12 col-12 float-left"></div>
                <div className="col-md-9 col-sm-12 col-12 float-left d-flex flex-column content-wrapper mt-2">
                  <div className="p-2">
                    <div className="col-md-6 col-sm-12 col-12 p-0 pt-3 pb-3 ">
                      {questions[count].text}
                    </div>
                    <div className="row q-options">
                      {questions[count].options.map(items => {
                        return (
                          <div
                            key={items.id}
                            className={
                              items.value === "Yes" || items.value === "No"
                                ? "float-left col-md-3 col-sm-4 col-4"
                                : items.value ===
                                  "No, I will add it later to tasks"
                                ? "float-left col-md-7 col-sm-4 col-4"
                                : "col-md-12 col-sm-12 col-12"
                            }
                          >
                            <div className="radio">
                              <label className="green_radio ">
                                <input
                                  type="radio"
                                  value={items.id}
                                  className="pl-2"
                                  onClick={e => {
                                    e.target.value &&
                                      updateObj(
                                        { selectedId: items.id },
                                        count
                                      );
                                    items.value !== "Yes" && setError("");
                                  }}
                                  checked={
                                    items.id ===
                                    questions[count].selected_option
                                      ? "checked"
                                      : ""
                                  }
                                />
                                <span className="checkmark_radio mt-2"></span>
                                <span className="yes-radio radio-yes">
                                  {items.value}
                                </span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="">
                      {"start_date" in questions[count] &&
                      "end_date" in questions[count] &&
                      questions[count].selected_option === 1 ? (
                        <div className="col-md-6 col-sm-12 col-12 p-0 mt-4 mb-2">
                          <div className="col-md-12 col-sm-12 col-12 p-0 mt-2">
                            <div className="input-group mb-1">Start date</div>
                            <div className="input-group mb-1 ">
                              <div className="custom-txtfld2 d-flex p-0">
                                <DatePicker
                                  type="text"
                                  className="form-control txtfld strnend"
                                  dateFormat="dd-MM-yyyy"
                                  minDate={new Date()}
                                  selected={questions[count].start_date}
                                  onChange={date =>
                                    updateObj({ start_date: date }, count)
                                  }
                                />
                                <div>
                                  <img
                                    className="calander_bg"
                                    src={task}
                                    alt={"Date picker"}
                                    width={"35px"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 p-0 mt-2 mb-2">
                            <div className="input-group mb-1">End date</div>
                            <div className="input-group ">
                              <div className="custom-txtfld2 d-flex p-0">
                                <DatePicker
                                  type="text"
                                  className="form-control txtfld strnend"
                                  dateFormat="dd-MM-yyyy"
                                  minDate={questions[count].start_date}
                                  selected={questions[count].end_date}
                                  disabled={
                                    questions[count].start_date !== undefined &&
                                    questions[count].start_date !== null &&
                                    questions[count].start_date !== ""
                                      ? false
                                      : true
                                  }
                                  onChange={date =>
                                    updateObj({ end_date: date }, count)
                                  }
                                />
                                <span>
                                  <img
                                    className="calander_bg"
                                    src={task}
                                    alt={"Date picker"}
                                    width={"35px"}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : "add_company" in questions[count] &&
                        questions[count].selected_option === 1 ? (
                        <div className="col-md-12 col-sm-12 col-12 p-0 pt-4 float-left">
                          {/* <button
                              className="btn-wrng rounded-circle mr-1"
                              type="button"
                              onClick={AddCompany}
                            >
                              +
                          </button><span>Add companies</span> */}
                          <div>
                            <img
                              src={PlusIcon}
                              className="footericons rounded-circle bg-white custom-cursor"
                              width="26px"
                              alt="PlusIcon"
                              onClick={AddCompany}
                            />
                            <span  onClick={AddCompany} className="custom-cursor">{"   Add companies"}</span>
                          </div>
                          <div className="height_addcompanies">
                            {companyListSelected.length > 0 &&
                              Object.keys(companyListSelected)
                                .reverse()
                                .map(e => (
                                  <div className="col-md-6 text-secondary float-left" key={e}>
                                    <div className="card task-border w-75 mt-2 pl-3">
                                      <span>
                                        <img
                                          src={CancelIcon}
                                          className="rounded-circle custom-cursor float-right p-1"
                                          width="25px"
                                          alt="close"
                                          title="Remove"
                                          onClick={() =>
                                            deleteCompanyFromArray(
                                              companyListSelected[e].id
                                            )
                                          }
                                        />
                                      </span>
                                      <h6 className="card-title my-0">
                                        Company name
                                      </h6>
                                      <p className="card-text">
                                        {companyListSelected[e].name}
                                      </p>
                                      <h6 className="card-title my-0">
                                        Vat number
                                      </h6>
                                      <p className="card-text">
                                        {companyListSelected[e].vat}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="col-md-10 col-sm-10 col-10 error-log p-0  mt-2 float-left">
                        <span className="text-danger">{error}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-btn-wrapper d-flex mt-5 mb-2">
                <div className="col-lg-3 col-md-2 col-sm-0 col-0 mt-4 "></div>
                <div className="col-lg-9 col-md-10 col-sm-12 col-12 d-flex mt-4 justify-content-end">
                  <div className="col-md-3 col-sm-4 col-4 pl-0 ">
                    {count < 2 && (
                      <div
                        className="btn btn-outline-warning  btn-block text-dark shadow_remove "
                        style={{ border: " 1px solid #e3e518" }}
                        onClick={() => {
                          count < 2 && checkSkip(count);
                        }}
                      >
                        Skip
                      </div>
                    )}
                  </div>
                  {count > 0 && (
                    <div className="col-md-3 col-sm-4 col-4  ">
                      <button
                        type="button"
                        className="btn btn-wrng  btn-block shadow_remove"
                        onClick={() => {
                          count > 0 && setCount(count - 1);
                          setError("");
                        }}
                      >
                        Previous
                      </button>
                    </div>
                  )}
                  <div className="col-md-3 col-sm-4 col-4 ">
                    <button
                      type="button"
                      className="btn btn-wrng btn-block shadow_remove"
                      onClick={() => {
                        count <= 2 && checkNext(count);
                      }}
                    >
                      {questions.length - 1 !== count ? "Next" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
