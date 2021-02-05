import React from 'react';
import LocationIcon from '../../Static/Assets/my project icon (3).png';
import TaskIcon from '../../Static/Assets/my project icon (2).png';
import CompanyIcon from '../../Static/Assets/my project icon (1).png';
import Report from '../../Static/Assets/my project icon (4).png';
import QRCodeGenerator from '../QRCodeGenerater/QRCodeGenerator';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function ProjectListAndNotification({ res, handleClick, msg, NotificationList, notificationMsg }) {
    // const history = useHistory();
    const ChangeDateFormat = (key) => {
        return (key.split('-').join('/').toLowerCase());
    }
    return (
        <div className="col-md-12">
            <div className="col-md-8 float-left">
                <div className="conatiner">
                    <div className="row ml-1 mr-0">
                        {/* <p className="browserback" onClick={() => history.goBack()}>back</p> */}
                        <div className="col-md-8 pl-0">
                            {/* <p className="browserback float-left" onClick={() => history.goBack()}>back</p> */}
                            <h4 className="float-left ml-3"> My projects</h4>
                        </div>
                        <div className="col-md-4 text-right custom-pointer">
                            {res !== undefined && Object.keys(res).length > 4 && <Link to={"/MyProjects"} title="View all projects">View all</Link>}
                        </div>
                    </div>
                </div>
                {res === undefined && <h5 className="text-center pt-5 mt-5">{msg}</h5>}
                <div className="col-md-12 mb-3 ml-2">
                    <div className="row">
                        {res && Object.keys(res).slice(0, 4).map(e => (
                            <div className="col-md-6 col-sm-12" key={e}>
                                <div className="card my-3 pr-4 task-border shadow">
                                    <div className="card-body">
                                        <h6 className="card-title text-secondary">Project name</h6>
                                        <h6 className="card-text">{res[e].project_name}</h6>
                                        <h6 className="card-title text-secondary ">Added on</h6>
                                        <h6 className="card-text">{res[e].project_added_on !== null && ChangeDateFormat(res[e].project_added_on)}</h6>
                                        <h6 className="card-title text-secondary">Added by</h6>
                                        <h6 className="card-text">{res[e].added_by}</h6>
                                        <h6 className="card-title text-secondary">Project id</h6>
                                        <h6 className="card-text">{res[e].project_id}</h6>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="container">
                                            <div className="row pb-3">
                                                <div className="col-2 m-auto pb-2">
                                                    <Link to={`/projectAddressMarker/${res[e].project_id}`} onClick={() => handleClick(res[e].project_id)} title="Project location"><img src={LocationIcon} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Company'} /></Link>
                                                </div>
                                                <div className="col-2 m-auto pb-2">
                                                    <Link to={"/project_tasks"} onClick={() => handleClick(res[e].project_id)} title="Project tasks"><img src={TaskIcon} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Task'} /></Link>
                                                </div>
                                                <div className="col-2 m-auto pb-2">
                                                    <Link to={"/company/" + res[e].project_id} onClick={() => handleClick(res[e].project_id)} title="Project companies"><img src={CompanyIcon} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Company'} /></Link>
                                                </div>
                                                <div className="col-2 m-auto float-left text-center pb-2">
                                                    <Link to={`/reportsDIY/${res[e].project_id}`} onClick={() => handleClick(res[e].project_id)} title="Project report"><img src={Report} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Company'} /></Link>
                                                </div>
                                                <div className="col-2 m-auto pb-2">
                                                    {res[e].qr_code !== null && <QRCodeGenerator qrvalue={res[e].qr_code} w="40px" NameofClass="footericons custom-bg rounded-circle  shadow custom-pointer" pdfname={res[e].project_name} added_by={res[e].added_by} phone={res[e].phone}/>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-4 float-left pr-0">
                <div className="container">
                    <div className="row m-auto">
                        <h4 className="col-md-8 ">Notifications</h4>
                        <div className="col-md-4 text-right">
                            {NotificationList !== undefined && NotificationList.length > 5 && <Link to={"/myNotifications"} title="View all notifications">View all</Link>}
                        </div>
                    </div>
                </div>
                {NotificationList === undefined && <h5 className="text-center pt-5 mt-5">{notificationMsg}</h5>}
                <div className="col-md-12 mb-3">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 ">
                            <div className="card my-3 task-border shadow">
                                {NotificationList && Object.keys(NotificationList).slice(0, 6).map(e => (
                                    <div className="card-body pt-0 pb-1 m-0" key={e}>
                                        <div className="col-md-12 border-bottom p-3">
                                            <h6 className="card-text">{NotificationList[e].Title}</h6>
                                            <h6 className="card-text custom-font-size">{NotificationList[e].Body}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectListAndNotification;
