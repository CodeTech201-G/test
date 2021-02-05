import React from 'react';
import './dashboard.module.css';
import { Link } from 'react-router-dom';
import AddProjects from '../../Static/Assets/addProject.png';
import MyProjects from '../../Static/Assets/myProjects.png';
import MyAccount from '../../Static/Assets/myAccount.png';
import MyNotification from '../../Static/Assets/myNotifications.png';

function Dashboard(props) {

	return (
		<div style={{ padding: 10 }}>
			<div className="container">
			<h1 className="pagetitle col-11 text-center float-left pb-5">{("Dashboard")}</h1>
				<div className="col-4 float-left text-center pb-4">
					<Link to="/createProject"><img src={AddProjects} className="footericons rounded-circle bg-white shadow" width='90px' alt={'AddProject'} /></Link>
					<p>Add project</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					<Link to="/projects"><img src={MyProjects} className="footericons rounded-circle bg-white shadow" width='90px' alt={'MyProjects'} rounded="true" /></Link>
					<p>My projects</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					<Link to="/myAccount"><img src={MyAccount} className="footericons rounded-circle bg-white shadow" width='90px' alt={'MyAccount'} rounded="true" /></Link>
					<p>My account</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					<Link to="/myNotifications"><img src={MyNotification} className="footericons rounded-circle bg-white shadow" width='90px' alt={'MyNotifications'} rounded="true" /></Link>
					<p>My notifications</p>
				</div>
				{/* <div className="col-4 float-left text-center pb-4">
					<Link to="#"><img src={Weather} className="footericons" width='90px' alt={''} rounded="true" /></Link>
					<p>Location weather</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					<Link to="#"><img src={MyTasks} className="footericons" width='90px' alt={''} rounded="true" /></Link>
					<p>My tasks</p>
				</div> */}
			</div>
		</div>
	);
}

export default Dashboard;
