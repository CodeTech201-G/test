import React from 'react';

function CompanyOverview({form,onSubmit}) {
  // overview of form data
  return (
    <form onSubmit={(e)=>onSubmit(e,4)}>
      <div className="mt-5">
          <p>Please enter the company details</p>
        <div className="form-group mb-3">
          <label className="textcolor1">Company name</label>
          <input
            type="text"
            className="form-control"
            value={form.CompanyName}
            id="CompanyName"
            disabled
            aria-describedby="CompanyNameHelp"
            placeholder="Company name"
          />
        </div>
        <div className="form-group mb-3">
          <p className="textcolor1">Address Details</p>
          <label className="textcolor1">Street number</label>
          <input
            type="number"
            className="form-control"
            value={form.StreetNumber}
            id="StreetNumber"
            disabled
            aria-describedby="StreetNumberHelp"
            placeholder="Street Number"
          />
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Number</label>
          <input
            type="text"
            className="form-control"
            value={form.Number}
            id="Number"
            disabled
            aria-describedby="NumberHelp"
            placeholder="Number"
          />
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Box</label>
          <input
            type="text"
            className="form-control"
            value={form.Box}
            id="Box"
            disabled
            aria-describedby="BoxHelp"
            placeholder="Box"
          />
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Postal code</label>
          <input
            type="number"
            className="form-control"
            value={form.postalCode}
            id="postalCode"
            disabled
            aria-describedby="postalCodeHelp"
            placeholder="Postal code"
          />
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">City</label>
          <input
            type="text"
            className="form-control"
            value={form.city}
            id="city"
            disabled
            aria-describedby="CityHelp"
            placeholder="City"
          />
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Country</label>
          <input
            type="text"
            className="form-control"
            value={form.country}
            id="country"
            disabled
            aria-describedby="CountryHelp"
            placeholder="country"
          />
        </div>
        <div className="col-md-12 text-center mt-5 p-0 pb-5">
              <button
                type="submit"
                className="btn btn-block mybtn bg-color tx-tfm bottom-buttons"
                onClick={(e)=>onSubmit(e,5)}
              >
                {" "}
                Confirm{" "}
              </button>
              <button
                type="edit"
                className="btn btn-block mybtn bg-color tx-tfm bottom-buttons"
                onClick={(e)=>onSubmit(e,3)}
              >
                {" "}
                Edit{" "}
              </button>
      </div>
      </div>
    </form>
  );
}

export default CompanyOverview;
