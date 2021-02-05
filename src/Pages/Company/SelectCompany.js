/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import SearchBox from "../Common/SearchBox";
import DetailsIcon from '../../Static/Assets/Group10897.png';
import CancelIcon from '../../Static/Assets/cancel-icon.png';
import PlusIcon from "../../Static/Assets/PlusIcon.png";
import './Company.css';
import { Modal } from "react-bootstrap";
import { APICALL } from "../../Services/ApiServices";
import { CompanyList, MyProjectDashboard } from "../../Services/ApiEndPoints";
import AddCompany from './AddCompany';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';


function SelectCompany({ CompanySelector }) {
    const [searchVal, setsearchVal] = useState("");
    const [res, setRes] = useState();
    const [error,setError] = useState();
    // const [toggle, setToggle] = useState();
    const [show, setShow] = useState(false);
    const [cid, setCid] = useState();
    const [detailShow, setDetailShow] = useState(false);
    const [filter, setFilter] = useState();
    const [page, setPage] = useState('selectCompany')
    const [msg, setMsg] = useState('Loading companies....')
    const history = useHistory();
    const SearchElements = (e) => {
        setsearchVal(e.target.value);
        filterData(e.target.value);
    }
    const [Result, setResult] = useState();
    let params = useParams();
    const [get_id] = useState(JSON.parse(localStorage.getItem("currentUser")))
    let IsCompanyPage = (window.location.pathname).includes('company')
    useEffect(() => {
        // API call to get companies list
        IsCompanyPage === false && page === "selectCompany" && APICALL.service(CompanyList, "GET")
            .then((data) => {
                try {
                    if (data.code === '200') {
                        setResult(data.data);
                        // sorting based on company name
                        let ress=data.data;
                        ress=Object.values(ress).sort(function(a,b) {
                            return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0);} );
                        setRes(ress);
                    }
                    else {
                        setMsg(data.message)
                    }
                } catch (e) {
                    console.error(e);
                }
            })
        IsCompanyPage === true &&
            APICALL.service(MyProjectDashboard, "POST", {
                "user_id": get_id.id,
                "project_id": params.id,
            }).then((data) => {
                try {
                    if (data.code === '200') {
                        if (data.company_details !== "") {
                            if (data.company_details === undefined) {
                                setMsg('Company is not added to this project')
                            }
                            setRes(data.data.company_details);
                            setResult(data.data.company_details);
                        }
                        else {
                            setMsg('Company is not added')
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            })
    }, [IsCompanyPage, get_id.id, page, params.id]);
    const changePage = (e) => {
        setPage(e);
    }
    // serchbox functionality
    let excludeColumns1 = ["address_id", "company_type", "email", "name", "phone", "user_id", "vat", "website","address_details",];
    let excludeColumns = ["id"];
    const filterData = (value, type) => {
        if (type === 'detail')
            excludeColumns = excludeColumns1;
        const lowercasedValue = value.toString().toLowerCase().trim();
        if (lowercasedValue === "") setRes(Result);
        else {
            const filteredData = (Result ? Object.values(Result).filter(item => {
                return Object.keys(item).some(key =>
                    item[key] !== null ? excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue) : null
                );
            }) : [null])
            //   setRes(filteredData)
            if(filteredData.length === 0){
                setError('Search not found')
            }
            else{
                setError(undefined)
            }
            if (excludeColumns.length > 1)
                setFilter(filteredData);
            else
                setRes(filteredData)
        }
    }
    // conform popup triggering
    const OnClickFundtion = (e) => {
        setShow(true);
        setCid(e)
    }
    // overview of company details popup triggering
    const DetailShowFunction = (e) => {
        filterData(e, 'detail')
        setDetailShow(true);
        setCid(e);
    }
    // popup close function
    const PopupSubmit = (e,info) => {
        console.log(filter);
        // if (e !== "close")
        //     setToggle(cid);
        if(info === 'filter'){
            CompanySelector(filter[e]);
        }
        else if (CompanySelector !== undefined && e !== "close") {
            CompanySelector(res[e]);
        }
        setShow(false);
        setDetailShow(false);

    }
    const regex = /(<([^>]+)>)/ig;
    let address;
    return (
        <>
            {page === "selectCompany" && <div className={show || detailShow ? "container animated" : "container layout-space2"}>
                <Modal show={show || detailShow} className="text-start" animation={false} centered>
                    <Modal.Header className="p-2 m-0">
                        <h3 className="text-center model-title p-0">{detailShow ? "Company details" : "Alert"}</h3>
                        <div>
                            {detailShow !== false &&
                                <img src={CancelIcon} className="rounded-circle custom-cursor" width="25px" alt="close" onClick={() => PopupSubmit("close")} />
                            }
                        </div>
                    </Modal.Header>
                    <Modal.Body className="mt-0 pt-0">
                        {detailShow === false &&
                            <>
                                <h4 className="text-center">Are you want sure want to add this company?</h4>
                                <div className="col-md-12 text-center mt-5 p-0 mb-5">
                                    <div className="col-md-6 float-left">
                                        <button
                                            type="submit"
                                            className="btn mybtn btn-light tx-tfm btn-color w-100"
                                            onClick={() => PopupSubmit(cid)}
                                        >
                                            {("Yes")}
                                        </button>
                                    </div>
                                    <div className="col-md-6 float-right">
                                        <button
                                            type="submit"
                                            className="btn mybtn btn-light tx-tfm btn-color w-100"
                                            onClick={() => setShow(false)}
                                        >
                                            {("No")}
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        {/* 
                show details of company in popup based on detailShow variable
               */}
                        {detailShow === true && filter && Object.keys(filter).map(e => (
                            
                            < div key={e}>
                                <table class="table table-borderless table-centralised mb-0 pb-0">
                                    <tbody>
                                    <tr>
                                        <th className="textcolor2 mb-0 pb-1 font-weight-normal pt-0 pr-0">VAT Number</th>
                                        <td className="p-0">{": "+filter[e].vat}</td>
                                    </tr>
                                    <tr>
                                        <th className="textcolor2 mb-0 pb-1 font-weight-normal pt-0 pr-0">Name</th>
                                        <td className="p-0">{": "+filter[e].name}</td>
                                    </tr>
                                    <tr>
                                        <th className="textcolor2 mb-0 pb-1 font-weight-normal pt-0 pr-0">Address</th>
                                        <td className="p-0">{": "+filter[e].address_details.street + " " + filter[e].address_details.city + "," + filter[e].address_details.country + "," + filter[e].address_details.postal_code}</td>
                                    </tr>
                                    <tr>
                                        <th className="textcolor2 mb-0 pb-1 font-weight-normal pt-0 pr-0">Phone number</th>
                                        <td className="p-0">{": "+filter[e].phone}</td>
                                    </tr>
                                    <tr>
                                        <th className="textcolor2 mb-0 pb-1 font-weight-normal pt-0 pr-0">Email</th>
                                        <td className="p-0">{": "+filter[e].email}</td>
                                    </tr>
                                    <tr>
                                        <th className="textcolor2 mb-0 pb-1 font-weight-normal pt-0 pr-0">Website</th>
                                        <td className="p-0">{": "+filter[e].website}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                {/* <p className="textcolor2 mb-0 pb-1">Name:<span className="pl-2 text-dark"> {filter[e].name}</span> </p>
                                <p className="textcolor2 mb-0 pb-1">Address:<span className="pl-2 text-dark"> {filter[e].address_details.street + " " + filter[e].address_details.city + "," + filter[e].address_details.country + "," + filter[e].address_details.postal_code}</span></p>
                                <p className="textcolor2 mb-0 pb-1">VAT Number:<span className="pl-2 text-dark">{filter[e].vat}</span></p>
                                <p className="textcolor2 mb-0 pb-1">Phone number:<span className="pl-2 text-dark">{filter[e].phone}</span></p>
                                <p className="textcolor2 mb-0 pb-1">Email:<span className="pl-2 text-dark">{filter[e].email}</span></p>
                                <p className="textcolor2 mb-0 pb-1">Website:<span className="pl-2 text-dark">{filter[e].website}</span></p> */}
                                <div className="text-center ml-5 pl-5">
                                    {/* {IsCompanyPage === false && <button
                                        type="submit"
                                        className="btn btn-outline-none btn-block btn-color"
                                        onClick={() => PopupSubmit()}
                                    >
                                        {("Add")}
                                    </button>} */}
                                    {IsCompanyPage === false && <div className="ml-3 pl-4">
                                    <img
                                            src={PlusIcon}
                                            className="footericons  bg-white custom-cursor pr-0 float-left pt-1"
                                            width="35px"
                                            alt="PlusIcon"
                                            onClick={() => PopupSubmit(e,'filter')}
                                        />
                                    <h5 className="float-left ml-0 pt-2 pl-1 custom-cursor" onClick={() => PopupSubmit(e,'filter')}> Add company</h5>
                                    </div>}
                                </div>
                            </div>))}
                    </Modal.Body>
                </Modal>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12 mb-2">
                            <div className="row">
                                <div className="col-md-5">
                                    {IsCompanyPage &&<p className="browserback float-left pt-1" onClick={() => history.goBack()}>back</p>}
                                    <h4 className={IsCompanyPage?"float-left ml-3":"float-left"}>{IsCompanyPage === false ? "Select company" : "Company"}</h4></div>
                                <div className="col-md-3">
                                    {/* {<button onClick={(e) => changePage('addCompany')} className="btn btn-color btn-sm btn-outline float-left">Add</button>} */}
                                    {IsCompanyPage === false && <>
                                        <img
                                            src={PlusIcon}
                                            className="footericons  bg-white custom-cursor pr-0 float-left pt-1"
                                            width="30px"
                                            alt="PlusIcon"
                                            onClick={(e) => changePage('addCompany')}
                                        />
                                        <h6 className="float-left ml-0 pt-2 pl-1 custom-cursor" onClick={(e) => changePage('addCompany')}> Add company</h6>
                                    </>}
                                </div>
                                <div className="col-md-4 pr-0">
                                    {res &&<SearchBox onSearchValue={SearchElements} searchVal={searchVal} placeholder={'Search'} />}
                                </div>
                            </div>
                        </div>
                        <div className={IsCompanyPage?"col-md-12 mb-3 ml-3":"col-md-12 mb-3 pt-1"}>
                            {error !== undefined && res.length<=0 &&<p className="text-center">{error}</p>}
                            {!res && <h5 className="text-center mt-5">{msg}</h5>}
                            <div className={IsCompanyPage?"row ml-3":"row"}>
                                {res && Object.keys(res).map(e => (
                                    <div className="col-md-4 mb-3" key={e}>
                                        <div className={IsCompanyPage?"col-md-12 bg-white p-3":"col-md-12 bg-light p-3"}>
                                            <h6>{res[e].vat}</h6>
                                            <h6>{res[e].name}</h6>
                                               {address=res[e].address_details.street + " " + res[e].address_details.city + "," + res[e].address_details.country + "," + res[e].address_details.postal_code, <p>{(address) !== undefined && (address.length) > 20 ? 
                                                (address).replace(regex, '').substring(0,15)+'...': (address)}</p>}
                                            <div className="container">
                                            <div className="row">
                                                <div className="ml-auto">
                                                    <div className="col-md-3 float-left p-0">
                                                        <img className={"user-img rounded-circle custom-cursor"} src={DetailsIcon} alt="user-img" width="29px" onClick={() => DetailShowFunction(res[e].id)}></img>
                                                    </div>
                                                    <div className="col-md-4 float-left p-0">
                                                        {IsCompanyPage === false && <button className="btn ml-2 btn-sm btn-outline custom-bg-highlight custom-company-button" onClick={() => OnClickFundtion(e)}>Select</button>}
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
                </div>
            </div>}
            {page === "addCompany" && <AddCompany changePage={changePage} />}
        </>
    );
}

export default SelectCompany;
