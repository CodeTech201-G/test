import React, { useState, useEffect } from 'react';
import { APICALL } from "../../Services/ApiServices";
import { ProjectListAPI, MyNotifications } from "../../Services/ApiEndPoints";
import ProjectListAndNotification from './ProjectListAndNotification';
import MyProjectList from './MyProjectList';

function ProjectList() {
    const [res, setRes] = useState();
    const [projectList, setProjectList] = useState();
    const [NotificationList, setNotificationList] = useState();
    let [get_id] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [msg, setMsg] = useState('Loading projects....');
    const [notificationMsg, setNotificationMsg] = useState('Loading notifications....')
    const [searchValue, setsearchValue] = useState("");
    const page = ((window.location.pathname).includes('MyProjects'))
    const [error,setError] = useState();
    // Api call to get all projects of user
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        get_id = JSON.parse(localStorage.getItem("currentUser"));
    })
    useEffect(() => {
        APICALL.service(ProjectListAPI, "POST", {
            'user_id': get_id && get_id.id,
        })
            .then((data) => {
                try {
                    if (data.code === '200') {
                        setProjectList(data.data)
                        // sorting result based on project name
                        let ress=data.data;
                        ress=Object.values(ress).sort(function(a,b) {
                            return (a.project_name.toLowerCase() > b.project_name.toLowerCase()) ? 1 : ((b.project_name.toLowerCase() > a.project_name.toLowerCase()) ? -1 : 0);} );
                        setRes(ress);
                    }
                    else if (data.code === '400') {
                        if(data.message === "Projects does not exist")
                            setMsg('Project does not exist')
                        else
                            setMsg(data.message)
                    }
                } catch (e) {
                    console.error(e);
                }
            })
            page === false && APICALL.service(MyNotifications, "POST", {
            'uid': get_id && get_id.id,
        })
            .then((data) => {
                try {
                    if (data.status === '200') {
                        setNotificationList(data.notification_data);
                    }
                    else if (data.status === '400') {
                        if(data.message === "No Notifications Found")
                            setNotificationMsg('No notifications found')
                        else
                            setNotificationMsg(data.message)
                    }
                } catch (e) {
                    console.error(e);
                }
            })
    }, [get_id, page]);

    // store project details in localstorage 
    const handleClick = (e) => {
        let pdetails = projectList[e];
        pdetails.pid = e;
        filterData(e, 'singledata')
        localStorage.setItem("project_list_details", JSON.stringify(projectList[e]));
        localStorage.setItem("projectId", e);
    }

    //   filter function
    let excludeColumns = ["id"];
    const filterData = (value, type) => {
        if (type === "singledata") {
            excludeColumns = ["added_by", "latitude", "longitude", "project_added_on", "project_name", "qr_code"]
        }
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setRes(projectList);
        else {
            const filteredData = projectList
                ? Object.values(projectList).filter((item) => {
                    return Object.keys(item).some((key) =>
                        item[key] !== null
                            ? excludeColumns.includes(key)
                                ? false
                                : item[key].toString().toLowerCase().includes(lowercasedValue)
                            : null
                    );
                })
                : [null];
            setRes(filteredData)
            if(filteredData.length === 0){
                setError('Search not found')
            }
            else{
                setError(undefined);
            }
        }
    };
    //   searched element
    const SearchElements = (e) => {
        setsearchValue(e.target.value);
        filterData(e.target.value);
    };
    return (
        <div className={"container layout-space2"}>
            <div className="row m-auto">
                {page ? <MyProjectList res={res} handleClick={handleClick} SearchElements={SearchElements} searchValue={searchValue} msg={msg} error={error}/> :
                    <ProjectListAndNotification res={res} handleClick={handleClick} SearchElements={SearchElements} searchValue={searchValue} msg={msg} NotificationList={NotificationList} notificationMsg={notificationMsg} />}
            </div>
        </div>
    );
}

export default ProjectList;
