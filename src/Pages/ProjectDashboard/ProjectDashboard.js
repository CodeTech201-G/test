import React from 'react';
import { Link } from 'react-router-dom';
import Location from '../../Static/Assets/location.png';
// import contact from '../../Static/Assets/contact.png';
import Tasks from '../../Static/Assets/tasks.png';
import Company from '../../Static/Assets/company.png';
import Report from '../../Static/Assets/report.png';
import QRCodeGenerator from '../QRCodeGenerater/QRCodeGenerator';
import { useParams } from "react-router";

function ProjectDashboard(props) {
	const ProjectData = JSON.parse(localStorage.getItem('project_list_details'))
	let params = useParams();
	return (
		<div style={{ padding: 10 }}>
			<div className="container">
				<h1 className="pagetitle col-11 textcolor1 text-center float-left pb-5">{("Renovation 1")}</h1>
				<div className="col-4 float-left text-center pb-4">
					<Link to={`/projectAddressMarker/${params.id}`}><img src={Location} className="footericons rounded-circle bg-white shadow" width='90px' alt={'Location'} /></Link>
					<p>Location</p>
				</div>
				{/* <div className="col-4 float-left text-center pb-4">
					<Link to="#"><img src={contact} className="footericons rounded-circle bg-white shadow" width='90px' alt={'Contact'} /></Link>
					<p>Contact</p>
				</div> */}
				<div className="col-4 float-left text-center pb-4">
					<Link to="/project_tasks"><img src={Tasks} className="footericons rounded-circle bg-white shadow" width='90px' alt={'Tasks'} /></Link>
					<p>Tasks</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					<Link to={"/company/" + params.id}><img src={Company} className="footericons rounded-circle bg-white shadow" width='90px' alt={'Company'} /></Link>
					<p>Company</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					<Link to="#"><img src={Report} className="footericons rounded-circle bg-white shadow" width='90px' alt={'Report'} /></Link>
					<p>Report</p>
				</div>
				<div className="col-4 float-left text-center pb-4">
					{ProjectData !== null &&<QRCodeGenerator qrvalue={ProjectData.qr_code} w="90px" NameofClass="footericons" pdfname={ProjectData.project_name} />}
				</div>
			</div>
		</div>
	);
}

export default ProjectDashboard;
