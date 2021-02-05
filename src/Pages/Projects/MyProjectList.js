import React from 'react';
import SearchBox from "../Common/SearchBox";
import LocationIcon from '../../Static/Assets/my project icon (3).png';
import TaskIcon from '../../Static/Assets/my project icon (2).png';
import CompanyIcon from '../../Static/Assets/my project icon (1).png';
import Report from '../../Static/Assets/my project icon (4).png';
import QRCodeGenerator from '../QRCodeGenerater/QRCodeGenerator';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function MyProjectList({ res, handleClick, SearchElements, searchValue, msg, error }) {
    const history = useHistory();
    return (
        <div className="col-md-12">
            <div className="">
                <div className="row">
                    <div className="col-md-8 pl-0">
                        <p className="browserback float-left" onClick={() => history.goBack()}>back</p>
                        <h4 className="float-left ml-3 pl-2">My projects</h4>
                    </div>
                    <div className="col-md-4 pl-4">
                       {res && <SearchBox onSearchValue={SearchElements} searchVal={searchValue} placeholder={'Search'} />}
                    </div>
                </div>
            </div>
            {error !==undefined && res.length<1 &&<h5 className="text-center pt-5 mt-5">{error}</h5>}
            {res === undefined && <h5 className="text-center pt-5 mt-5">{msg}</h5>}
            <div className="col-md-12 mb-3 pr-0">
                <div className="row ml-3">
                    {res && Object.keys(res).map(e => (
                        <div className="col-md-4 col-sm-12 " key={e}>
                            <div className="card my-3 task-border shadow">
                                <div className="card-body pb-0">
                                    <h6 className="card-title text-secondary">Project name</h6>
                                    <h6 className="card-text">{res[e].project_name}</h6>
                                    <h6 className="card-title text-secondary">Added on</h6>
                                    <h6 className="card-text">{res[e].project_added_on}</h6>
                                    <h6 className="card-title text-secondary">Added by</h6>
                                    <h6 className="card-text">{res[e].added_by}</h6>
                                    <h6 className="card-title text-secondary">Project id</h6>
                                    <h6 className="card-text pb-0">{res[e].project_id}</h6>
                                </div>
                                <div className="col-md-12 p-0 mt-0">
                                    <div className="col-2 float-left text-center p-4 ml-1">
                                        <Link to={`/projectAddressMarker/${e}`} onClick={() => handleClick(res[e].project_id)} title="Project location" ><img src={LocationIcon} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Company'}/></Link>
                                    </div>
                                    <div className="col-2 float-left text-center p-4">
                                        <Link to={"/project_tasks"} onClick={() => handleClick(res[e].project_id)} title="Project tasks"><img src={TaskIcon} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Task'} /></Link>
                                    </div>
                                    <div className="col-2 float-left text-center p-4">
                                        <Link to={"/company/" + e} onClick={() => handleClick(res[e].project_id)} title="Project company"><img src={CompanyIcon} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Company'} /></Link>
                                    </div>
                                    <div className="col-2 float-left text-center p-4">
                                        <Link to={`/reportsDIY/${e}`} onClick={() => handleClick(res[e].project_id)} title="Report"><img src={Report} className="footericons custom-bg rounded-circle  shadow" width='40px' alt={'Report'} /></Link>
                                    </div>
                                    <div className="col-2 float-left text-center p-4">
                                        {res[e].qr_code !== null && <QRCodeGenerator qrvalue={res[e].qr_code} w="40px" NameofClass="footericons custom-bg rounded-circle  shadow custom-pointer" pdfname={res[e].project_name} added_by={res[e].added_by}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyProjectList;
