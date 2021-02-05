import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CompanyAddress from './CompanyAddress';
// import VATValidation from './VATValidation';
import { APICALL } from "../../Services/ApiServices";
import { AddCompanyUrl } from "../../Services/ApiEndPoints";
import { VarifyVAT } from "../../Services/ApiEndPoints";
import SurpriceImg from '../../Static/Assets/new-product.png';
import { Modal } from "react-bootstrap";

function AddCompany({ changePage }) {
    const [page, setPage] = useState('CompanyAddress');
    const history = useHistory();
    const [disable, setDisable] = useState(true);
    const [VatDisable, setVatDisable] = useState(false);
    const [VatValid, setVatValid] = useState();
    const [show, setShow] = useState(false);
    const [companyShow, setcompanyShow] = useState(false);
    const [msg, setMsg] = useState();
    const [VATError,setVATError] = useState();
    const [errorMsg,setErrorMsg]=useState({
        "emailError":"",
        "PhoneNumberError":"",
        "WebsiteError":""
    });
    const [get_id] = useState(JSON.parse(localStorage.getItem("currentUser")))
    const [form, setState] = useState({
        "CompanyName": "",
        "street": "",
        "Number": "",
        "Box": "",
        "postalCode": "",
        "city": "",
        "country": "",
        "website": "",
        "phoneNumber": "",
        "email": "",
        "CompanyOwner": false,
        "VAT": "",
        "VATValid": false
    });
    // update form input data to variable 
    const updateField = e => {
        if (e.target !== undefined) {
            setState({
                ...form,
                [e.target.name]: e.target.value
            });
        } else {
            setState({
                ...form,
                "phoneNumber": e
            });
        }
    };
    // Redirect to next pages on submit
    const handleSubmit = (e, pages) => {
        e.preventDefault();
        if (pages === 'CompanyAddress') {
            setPage('OverviewCompanyAddress');
        } else
            if (pages === 'vatValidation') {
                APICALL.service(VarifyVAT, "POST", {
                    'vat': form.VAT
                }).then((res) => {
                    try {
                        if (res.code === '201') {
                            setPage('CompanyAddress')
                            setDisable(undefined);
                            setVatDisable(true);
                            setErrorMsg({ ...errorMsg,
                                "PhoneNumberError":"",
                                "emailError":""
                            })
                        }
                        else if (res.code === '200') {
                            setErrorMsg({ ...errorMsg,
                                "PhoneNumberError":"",
                                "emailError":""
                            })
                            setState({
                                ...form,
                                "CompanyName": res.data.companyname,
                                "street": res.data.address.street,
                                "Number": res.data.address.number,
                                "Box": res.data.address.box,
                                "postalCode": res.data.address.postal_code,
                                "city": res.data.address.city,
                                "country": res.data.address.country,
                                "website": res.data.company_type,
                                "phoneNumber": res.data.phone,
                                "email": res.data.email,
                                "CompanyOwner": false,
                                "VAT": res.data.vat,
                                "VATValid": true,
                            });
                            setPage('OverviewCompanyAddress')
                            setVatValid(true);
                            setDisable(true);
                            setVatDisable(true);
                        }
                        else{
                            setVATError(true)
                            setMsg(res.message)
                        }
                    } catch (e) {
                        console.error(e);
                    }
                })
            }
            else if (pages === 'OverviewCompanyAddress') {
                setPage('OverviewCompanyAddress')
            }
            else {
                if (form.email !== undefined) {
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            
                    if (!pattern.test(form.email)) {
                       
                        setErrorMsg({ ...errorMsg,
                            "emailError":"Please enter valid email address.",
                            "PhoneNumberError":""
                        })
            
                    }
                    else if(form.phoneNumber !==undefined && (form.phoneNumber).length <6){
                        setErrorMsg({ ...errorMsg,
                            "PhoneNumberError":"Please enter valid phone number.",
                            "emailError":""
                        })
                    }
                    else{
                        setErrorMsg({ ...errorMsg,
                            "PhoneNumberError":"",
                            "emailError":""
                        })
                        APICALL.service(AddCompanyUrl, "POST",
                            {
                                'user_id': get_id.id,
                                'company_title': form.CompanyName,
                                'phone': (form.phoneNumber === undefined || form.phoneNumber === null || form.phoneNumber === "")?"":("+"+form.phoneNumber),
                                'company_email': form.email,
                                'company_vat': form.VAT,
                                'company_type': ' ',
                                'company_website': form.website,
                                'box': form.Box,
                                'city': form.city,
                                'street': form.street,
                                'postal': form.postalCode,
                                'number': form.Number,
                                'country': form.country,
                                'address_title': form.street
                            })
                            .then((res) => {
                                try {
                                    if (res.code === '200') {
                                        setShow(true)
                                        setMsg(res.message)
                                    }
                                    else if (res.code === '201') {
                                        setcompanyShow(true)
                                        setMsg(res.message)
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            })
                    }
            
                  }
                 
        }

    }
    // // back button functionality
    const backButton = (e) => {
        if (page === 'CompanyAddress')
            setPage('CompanyAddress');
        else if (e === 5)
            changePage('selectCompany');
        else if (page === 'OverviewCompanyAddress')
            setPage('CompanyAddress')
        else if (page === 4)
            setPage('OverviewCompanyAddress')
        else {
            history.goBack();
        }
    }

    // popup close
    const PopupClose = () => {
        if(VATError){
            setVATError(false)  
        }else{
            setShow(false);
            changePage('selectCompany');
        }
    }
    return (
        <div className={show || companyShow || VATError ? "container animated  layout-space" : "container  layout-space"}>
            {/* {errorMsg && <p className="text-danger">{errorMsg}</p>} */}
            {/* <div className="col-md-12 topsection-wrap  mt-0 px-0 pt-4"> */}
            {/* <div className="row divBa">
          <div className="col-2">
            <p className="browserback" onClick={backButton}>back</p>
          </div>
          <h1 className="pagetitle col-8 textcolor1 text-center">{page ===1 ?("Varification"):("Company details")}</h1>
        </div> */}
            <Modal show={show || companyShow || VATError} className="text-center" centered size="sm">
                {(companyShow || VATError) && <Modal.Header>
                    <h2 className="text-center model-title">Alert</h2>
                </Modal.Header>}
                <Modal.Body className="mt-0 pt-0">
                    {show && <img src={SurpriceImg} alt="suprice img" className="pt-5" width="150px" />}
                    {(companyShow) && <p className="text-muted">
                        {msg}
                    </p>}
                    {VATError &&
                    <h6 className="p-2">{msg}</h6>
                    }
                    {show && <p className="pb-3 pt-2">
                        {msg}
                    </p>}
                    <div className="col-md-12 text-center  p-0 mb-3">
                        <button
                            type="submit"
                            className="btn mybtn btn-light tx-tfm btn-color w-100"
                            onClick={() => PopupClose()}
                        >
                            {VATError?("Close"):("OK")}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="row m-auto">
                {/* {page === 1&& <SelectCompany onSubmit={handleSubmit}/>} */}
                {/* {page === "vatValidation" && <VATValidation updateField={updateField} form={form} onSubmit={handleSubmit} />} */}
                {page === "CompanyAddress" && <CompanyAddress updateField={updateField} form={form} onSubmit={handleSubmit} VatValid={VatValid} disable={disable} VatDisable={VatDisable} PopupClose={PopupClose} errorMsg={errorMsg}/>}
                {page === "OverviewCompanyAddress" && form.email !== "" && <CompanyAddress updateField={updateField} form={form} onSubmit={handleSubmit} backButton={backButton} disable={true} VatValid={VatValid} VatDisable={VatDisable} errorMsg={errorMsg} PopupClose={PopupClose}/>}
            </div>
            {/* </div> */}
        </div>
    );
}

export default AddCompany;
