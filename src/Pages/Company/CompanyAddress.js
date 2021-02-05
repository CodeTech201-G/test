import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';

function CompanyAddress({ updateField, form, onSubmit, disable, backButton, VatValid, VatDisable, PopupClose, errorMsg }) {
  const [countryList] = useState([
    { "value": 1, "label": "Afghanistan" }, { "value": 2, "label": "Aland Islands" }, { "value": 3, "label": "Albania" }, { "value": 4, "label": "Algeria" }, { "value": 5, "label": "American Samoa" }, { "value": 6, "label": "Andorra" }, { "value": 7, "label": "Angola" }, { "value": 8, "label": "Anguilla" }, { "value": 9, "label": "Antarctica" }, { "value": 10, "label": "Antigua and Barbuda" }, { "value": 11, "label": "Argentina" }, { "value": 12, "label": "Armenia" }, { "value": 13, "label": "Aruba" }, { "value": 14, "label": "Australia" }, { "value": 15, "label": "Austria" }, { "value": 16, "label": "Azerbaijan" }, { "value": 17, "label": "Bahamas" }, { "value": 18, "label": "Bahrain" }, { "value": 19, "label": "Bangladesh" }, { "value": 20, "label": "Barbados" }, { "value": 21, "label": "Belarus" }, { "value": 22, "label": "Belgium" }, { "value": 23, "label": "Belize" }, { "value": 24, "label": "Benin" }, { "value": 25, "label": "Bermuda" }, { "value": 26, "label": "Bhutan" }, { "value": 27, "label": "Bolivia" }, { "value": 28, "label": "Bonaire, Sint Eustatius and Saba" }, { "value": 29, "label": "Bosnia and Herzegovina" }, { "value": 30, "label": "Botswana" }, { "value": 31, "label": "Bouvet Island" }, { "value": 32, "label": "Brazil" }, { "value": 33, "label": "British Indian Ocean Territory" }, { "value": 34, "label": "Brunei Darussalam" }, { "value": 35, "label": "Bulgaria" }, { "value": 36, "label": "Burkina Faso" }, { "value": 37, "label": "Burma (Myanmar)" }, { "value": 38, "label": "Burundi" }, { "value": 39, "label": "Cambodia" }, { "value": 40, "label": "Cameroon" }, { "value": 41, "label": "Canada" }, { "value": 42, "label": "Cape Verde" }, { "value": 43, "label": "Cayman Islands" }, { "value": 44, "label": "Central African Republic" }, { "value": 45, "label": "Chad" }, { "value": 46, "label": "Chile" }, { "value": 47, "label": "China" }, { "value": 48, "label": "Christmas Island" }, { "value": 49, "label": "Cocos (Keeling) Islands" }, { "value": 50, "label": "Colombia" }, { "value": 51, "label": "Comoros" }, { "value": 52, "label": "Congo" }, { "value": 53, "label": "Cook Islands" }, { "value": 54, "label": "Costa Rica" }, { "value": 55, "label": "Croatia (Hrvatska)" }, { "value": 56, "label": "Cuba" }, { "value": 57, "label": "Curacao" }, { "value": 58, "label": "Cyprus" }, { "value": 59, "label": "Czech Republic" }, { "value": 60, "label": "Democratic Republic of Congo" }, { "value": 61, "label": "Denmark" }, { "value": 62, "label": "Djibouti" }, { "value": 63, "label": "Dominica" }, { "value": 64, "label": "Dominican Republic" }, { "value": 65, "label": "Ecuador" }, { "value": 66, "label": "Egypt" }, { "value": 67, "label": "El Salvador" }, { "value": 68, "label": "Equatorial Guinea" }, { "value": 69, "label": "Eritrea" }, { "value": 70, "label": "Estonia" }, { "value": 71, "label": "Ethiopia" }, { "value": 72, "label": "Falkland Islands (Malvinas)" }, { "value": 73, "label": "Faroe Islands" }, { "value": 74, "label": "Fiji" }, { "value": 75, "label": "Finland" }, { "value": 76, "label": "France" }, { "value": 77, "label": "French Guiana" }, { "value": 78, "label": "French Polynesia" }, { "value": 79, "label": "French Southern Territories" }, { "value": 80, "label": "Gabon" }, { "value": 81, "label": "Gambia" }, { "value": 82, "label": "Georgia" }, { "value": 83, "label": "Germany" }, { "value": 84, "label": "Ghana" }, { "value": 85, "label": "Gibraltar" }, { "value": 86, "label": "Greece" }, { "value": 87, "label": "Greenland" }, { "value": 88, "label": "Grenada" }, { "value": 89, "label": "Guadeloupe" }, { "value": 90, "label": "Guam" }, { "value": 91, "label": "Guatemala" }, { "value": 92, "label": "Guernsey" }, { "value": 93, "label": "Guinea" }, { "value": 94, "label": "Guinea-Bissau" }, { "value": 95, "label": "Guyana" }, { "value": 96, "label": "Haiti" }, { "value": 97, "label": "Heard and McDonald Islands" }, { "value": 98, "label": "Honduras" }, { "value": 99, "label": "Hong Kong" }, { "value": 100, "label": "Hungary" }, { "value": 101, "label": "Iceland" }, { "value": 102, "label": "India" }, { "value": 103, "label": "Indonesia" }, { "value": 104, "label": "Iran" }, { "value": 105, "label": "Iraq" }, { "value": 106, "label": "Ireland" }, { "value": 107, "label": "Isle Of Man" }, { "value": 108, "label": "Israel" }, { "value": 109, "label": "Italy" }, { "value": 110, "label": "Ivory Coast" }, { "value": 111, "label": "Jamaica" }, { "value": 112, "label": "Japan" }, { "value": 113, "label": "Jersey" }, { "value": 114, "label": "Jordan" }, { "value": 115, "label": "Kazakhstan" }, { "value": 116, "label": "Kenya" }, { "value": 117, "label": "Kiribati" }, { "value": 118, "label": "Korea (North)" }, { "value": 119, "label": "Korea (South)" }, { "value": 120, "label": "Kuwait" }, { "value": 121, "label": "Kyrgyzstan" }, { "value": 122, "label": "Laos" }, { "value": 123, "label": "Latvia" }, { "value": 124, "label": "Lebanon" }, { "value": 125, "label": "Lesotho" }, { "value": 126, "label": "Liberia" }, { "value": 127, "label": "Libya" }, { "value": 128, "label": "Liechtenstein" }, { "value": 129, "label": "Lithuania" }, { "value": 130, "label": "Luxembourg" }, { "value": 131, "label": "Macau" }, { "value": 132, "label": "Macedonia" }, { "value": 133, "label": "Madagascar" }, { "value": 134, "label": "Malawi" }, { "value": 135, "label": "Malaysia" }, { "value": 136, "label": "Maldives" }, { "value": 137, "label": "Mali" }, { "value": 138, "label": "Malta" }, { "value": 139, "label": "Marshall Islands" }, { "value": 140, "label": "Martinique" }, { "value": 141, "label": "Mauritania" }, { "value": 142, "label": "Mauritius" }, { "value": 143, "label": "Mayotte" }, { "value": 144, "label": "Mexico" }, { "value": 145, "label": "Micronesia" }, { "value": 146, "label": "Moldova" }, { "value": 147, "label": "Monaco" }, { "value": 148, "label": "Mongolia" }, { "value": 149, "label": "Montenegro" }, { "value": 150, "label": "Montserrat" }, { "value": 151, "label": "Morocco" }, { "value": 152, "label": "Mozambique" }, { "value": 153, "label": "Namibia" }, { "value": 154, "label": "Nauru" }, { "value": 155, "label": "Nepal" }, { "value": 156, "label": "Netherlands" }, { "value": 157, "label": "New Caledonia" }, { "value": 158, "label": "New Zealand" }, { "value": 159, "label": "Nicaragua" }, { "value": 160, "label": "Niger" }, { "value": 161, "label": "Nigeria" }, { "value": 162, "label": "Niue" }, { "value": 163, "label": "Norfolk Island" }, { "value": 164, "label": "Northern Mariana Islands" }, { "value": 165, "label": "Norway" }, { "value": 166, "label": "Oman" }, { "value": 167, "label": "Pakistan" }, { "value": 168, "label": "Palau" }, { "value": 169, "label": "Palestinian Territory, Occupied" }, { "value": 170, "label": "Panama" }, { "value": 171, "label": "Papua New Guinea" }, { "value": 172, "label": "Paraguay" }, { "value": 173, "label": "Peru" }, { "value": 174, "label": "Philippines" }, { "value": 175, "label": "Pitcairn" }, { "value": 176, "label": "Poland" }, { "value": 177, "label": "Portugal" }, { "value": 178, "label": "Puerto Rico" }, { "value": 179, "label": "Qatar" }, { "value": 180, "label": "Republic of Serbia" }, { "value": 181, "label": "Reunion" }, { "value": 182, "label": "Romania" }, { "value": 183, "label": "Russia" }, { "value": 184, "label": "Rwanda" }, { "value": 185, "label": "S. Georgia and S. Sandwich Isls." }, { "value": 186, "label": "Saint Barthelemy" }, { "value": 187, "label": "Saint Kitts and Nevis" }, { "value": 188, "label": "Saint Lucia" }, { "value": 189, "label": "Saint Martin (French part)" }, { "value": 190, "label": "Saint Vincent and the Grenadines" }, { "value": 191, "label": "Samoa" }, { "value": 192, "label": "San Marino" }, { "value": 193, "label": "Sao Tome and Principe" }, { "value": 194, "label": "Saudi Arabia" }, { "value": 195, "label": "Senegal" }, { "value": 196, "label": "Seychelles" }, { "value": 197, "label": "Sierra Leone" }, { "value": 198, "label": "Singapore" }, { "value": 199, "label": "Sint Maarten (Dutch part)" }, { "value": 200, "label": "Slovak Republic" }, { "value": 201, "label": "Slovenia" }, { "value": 202, "label": "Solomon Islands" }, { "value": 203, "label": "Somalia" }, { "value": 204, "label": "South Africa" }, { "value": 205, "label": "South Sudan" }, { "value": 206, "label": "Spain" }, { "value": 207, "label": "Sri Lanka" }, { "value": 208, "label": "St. Helena" }, { "value": 209, "label": "St. Pierre and Miquelon" }, { "value": 210, "label": "Sudan" }, { "value": 211, "label": "Suriname" }, { "value": 212, "label": "Svalbard and Jan Mayen Islands" }, { "value": 213, "label": "Swaziland" }, { "value": 214, "label": "Sweden" }, { "value": 215, "label": "Switzerland" }, { "value": 216, "label": "Syria" }, { "value": 217, "label": "Taiwan" }, { "value": 218, "label": "Tajikistan" }, { "value": 219, "label": "Tanzania" }, { "value": 220, "label": "Thailand" }, { "value": 221, "label": "Timor-Leste" }, { "value": 222, "label": "Togo" }, { "value": 223, "label": "Tokelau" }, { "value": 224, "label": "Tonga" }, { "value": 225, "label": "Trinidad and Tobago" }, { "value": 226, "label": "Tunisia" }, { "value": 227, "label": "Turkey" }, { "value": 228, "label": "Turkmenistan" }, { "value": 229, "label": "Turks and Caicos Islands" }, { "value": 230, "label": "Tuvalu" }, { "value": 231, "label": "Uganda" }, { "value": 232, "label": "Ukraine" }, { "value": 233, "label": "United Arab Emirates" }, { "value": 234, "label": "United Kingdom" }, { "value": 236, "label": "United States" }, { "value": 235, "label": "United States Minor Outlying Islands" }, { "value": 237, "label": "Uruguay" }, { "value": 238, "label": "Uzbekistan" }, { "value": 239, "label": "Vanuatu" }, { "value": 240, "label": "Vatican City State (Holy See)" }, { "value": 241, "label": "Venezuela" }, { "value": 242, "label": "Viet Nam" }, { "value": 243, "label": "Virgin Islands (British)" }, { "value": 244, "label": "Virgin Islands (U.S.)" }, { "value": 245, "label": "Wallis and Futuna Islands" }, { "value": 246, "label": "Western Sahara" }, { "value": 247, "label": "Yemen" }, { "value": 248, "label": "Zambia" }, { "value": 249, "label": "Zimbabwe" }
  ])
  return (
    <div className="col-md-12">
      <section className="container col-lg-12 col-12 px-0 pt-4 edit-addresses ">
        <p className="browserback float-left" onClick={() => PopupClose()}>back</p>
        <h5 className="mb-0 pb-4 ml-3 pt-1 pl-4">Company details</h5>
        <form onSubmit={(e) => onSubmit(e, VatValid?5: 4)}>
          <div className="ml-4 pl-3">
            {VatDisable === false && disable === true?
            <h6>Please check VAT number</h6>:disable === true?<h6>This VAT number is already known in our database with following details.</h6>:<h6>Please enter the company details</h6>}
            <div className="col-md-12 col-lg-12 col-12 px-0 mt-3 ">
              <div className="row m-auto">
                <div className="col-md-12 col-xl-5 col-lg-4 col-12 pl-0 mobs-space tab-space">
              <label className="">VAT number</label>
              <input
                type="text"
                name="VAT"
                className="form-control input-class"
                value={form.VAT}
                onChange={updateField}
                id="VAT"
                required
                aria-describedby="VATHelp"
                placeholder="Enter VAT number(eg. 1234)"
                disabled={VatDisable}
              />
            </div>
            {VatDisable !== true &&<div className="col-md-12 col-xl-5 col-lg-2 col-12 mob-top-space mobs-space tab-space mt-2 pt-2">
                  <button className="btn mt-3 btn-color btn-small" onClick={(e)=>onSubmit(e,'vatValidation')}>Verify VAT</button>
            </div>}
          </div>
        </div>
            <div className="col-md-12 col-xl-5 col-lg-4 col-12 pl-0  mob-titles">
              <label className="">Company name</label>
              <input
                type="text"
                name="CompanyName"
                className="form-control input-class"
                value={form.CompanyName}
                onChange={updateField}
                id="CompanyName"
                required
                aria-describedby="CompanyNameHelp"
                placeholder="Company name"
                disabled={disable}
              />
            </div>
            <div className="col-md-12 col-lg-12 col-12 px-0 mt-3 ">
              <div className="row m-auto">
                <div className="col-md-12 col-xl-5 col-lg-4 col-12 pl-0 mobs-space tab-space">
                  <label className="">Street</label>
                  <input
                    type="text"
                    name="street"
                    className="form-control input-class"
                    value={form.street}
                    onChange={updateField}
                    id="Street"
                    required
                    aria-describedby="StreetHelp"
                    placeholder="Street"
                    disabled={disable}
                  />
                </div>
                <div className="col-md-12 col-xl-3 col-lg-2 col-12 mob-top-space mobs-space tab-space">
                  <label className="">Number</label>
                  <input
                    type="text"
                    name="Number"
                    className="form-control input-class"
                    value={form.Number}
                    onChange={updateField}
                    id="Number"
                    required
                    aria-describedby="NumberHelp"
                    placeholder="Number"
                    disabled={disable}
                  />
                </div>
                <div className="col-md-12 col-xl-3 col-lg-2 col-12 mob-top-space mobs-space tab-space">
                  <label className="">Box</label>
                  <input
                    type="text"
                    name="Box"
                    className="form-control input-class"
                    value={form.Box}
                    onChange={updateField}
                    id="Box"
                    required
                    aria-describedby="BoxHelp"
                    placeholder="Box"
                    disabled={disable}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-12 col-12 px-0 mt-3">
              <div className="row m-auto">
                <div className="col-md-12 col-xl-5 col-lg-4 col-12 pl-0 mobs-space tab-space">
                  <label className="">Postal code</label>
                  <input
                    type="number"
                    name="postalCode"
                    className="form-control input-class"
                    value={form.postalCode}
                    onChange={updateField}
                    id="postalCode"
                    required
                    aria-describedby="postalCodeHelp"
                    placeholder="Postal code"
                    disabled={disable}
                  />
                </div>
                <div className="col-md-12 col-xl-6 col-lg-4 col-12 mob-top-space mobs-space tab-space">
                  <label className="">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control input-class"
                    value={form.city}
                    onChange={updateField}
                    id="city"
                    required
                    aria-describedby="CityHelp"
                    placeholder="City"
                    disabled={disable}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-xl-5 col-lg-4 col-12 mb-2 pl-0 mobs-space tab-space">
              <label className="">Country</label>
              <select className="form-control input-class"
                name="country"
                value={form.country}
                disabled={disable}
                onChange={updateField}
                required
                >
                <option value="" >{'Select'}</option>
                {Object.values(countryList).map(ele => <option key={ele.value} value={ele.label}>{ele.label}</option>)}
              </select>
            </div>
            <div className="col-md-12 col-xl-12 col-lg-4 col-12 mb-2 pl-0 mobs-space tab-space">
               <p>Please enter the company contact details</p>
            </div>
            <div className="col-md-12 col-lg-12 col-12 px-0 mt-3 ">
              <div className="row m-auto">
                <div className="col-md-12 col-xl-5 col-lg-4 col-12 mb-2 pl-0 mobs-space tab-space">
                  <label className="">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control input-class"
                    value={form.email}
                    onChange={updateField}
                    id="email"
                    // required
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    disabled={disable}
                  />
                   {<p className="text-danger">{errorMsg.emailError}</p>}
                </div>
                <div className="col-md-4 col-xl-6 col-lg-4 col-12 mob-top-space mobs-space tab-space">
                  <label className="">Phone number</label>
                  <PhoneInput
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                    }}
                    // onlyCountries={['in', 'fr', 'us','be','nl','de','ae','gb','tr']}
                    // country='in'
                    autocompleteSearch={true}
                    countryCodeEditable={true}
                    value={form.phoneNumber}
                    onChange={updateField}
                    // inputClass="padding-left-numbers phone_input_width"
                    placeholder="Enter phone number"
                    className="phoneNumber-field input-class"
                    disabled={disable}
                    required
                    isValid={(inputNumber, country, countries) => {
                      return countries.some((country) => {
                      return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                      });
                    }}
                  />
                  {<p className="text-danger">{errorMsg.PhoneNumberError}</p>}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-xl-5 col-lg-4 col-12 mb-2 pl-0 mobs-space tab-space">
              <label className="">Website</label>
              <input
                type="text"
                name="website"
                className="form-control input-class"
                value={form.website}
                onChange={updateField}
                id="website"
                aria-describedby="websiteHelp"
                placeholder="Website"
                required
                disabled={disable}
              />
            </div>
            {/* </div> */}
            <div className="col-md-6 col-lg-12 col-12  mt-4 mb-5 pr-4 mobs-space tab-space float-right">
              <div className="row m-auto justify-content-end">
                {disable !== true && <button
                  type="submit"
                  className="ml-2 action-btn btn-left btns btn btn-primary btn-color"
                // onClick={()=>updateShow(true)}
                >
                  {" "}
                Finish{" "}
                </button>}
                {/* {disable === true  && VatValid !== true && <button
                  type="submit"
                  className="ml-2 action-btn btn-left btns btn btn-primary btn-color"
                  onClick={() => backButton(4)}
                >
                  {" "}
                Edit{" "}
                </button>}
                {disable === true && VatValid !==true && <button
                  type="submit"
                  className="ml-2 action-btn btn-left btns btn btn-primary btn-color"
                // onClick={()=>updateShow(true)}
                >
                  {" "}
                Finish{" "}
                </button>} */}
                { form.VATValid === true && <button
                  type="submit"
                  className="ml-2 action-btn btn-left btns btn btn-primary btn-color"
                  onClick={()=>backButton(5)}
                >
                  {" "}
                Close{" "}
                </button>}
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CompanyAddress;
