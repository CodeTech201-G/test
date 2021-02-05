import React from 'react';

function ProjectContact({updateField,form,onSubmit}) {
    
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-5">
      <div className="form-group mb-3 text-center">
          <input
            type="checkbox"
            name="yourself"
            className=""
            checked={form.yourself}
            onChange={updateField}
            id="yourself"
            aria-describedby="lastNameHelp"
          />
           <label className="textcolor1">Yourself</label>
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">First name</label>
          {form.yourself === false?<input
            type="text"
            name="firstName"
            className="form-control required"
            value={form.firstName}
            onChange={updateField}
            id="firstName"
            required
            aria-describedby="firstNameHelp"
            placeholder="First name"
          />:
          <input
          type="text"
          name="firstName"
          className="form-control required"
          value={form.firstName}
          onChange={updateField}
          id="firstName"
          aria-describedby="firstNameHelp"
          placeholder="First name"
        />}

        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Last name</label>
          {form.yourself === false?<input
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={updateField}
            id="lastName"
            required
            aria-describedby="lastNameHelp"
            placeholder="Last name"
          />:
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={updateField}
            id="lastName"
            aria-describedby="lastNameHelp"
            placeholder="Last name"
          />}
        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Email</label>
          {form.yourself === false?<input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={updateField}
            id="email"
            required
            aria-describedby="emailHelp"
            placeholder="Email"
          />:
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={updateField}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Email"
          />}

        </div>
        <div className="form-group mb-3">
          <label className="textcolor1">Mobile</label>
          {form.yourself === false?<input
            type="text"
            name="phoneNumber"
            className="form-control"
            value={form.phoneNumber}
            onChange={updateField}
            id="phoneNumber"
            aria-describedby="phoneNumberHelp"
            placeholder="PhoneNumber"
          />:
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            value={form.phoneNumber}
            onChange={updateField}
            id="phoneNumber"
            aria-describedby="phoneNumberHelp"
            placeholder="PhoneNumber"
          />}
        </div>
        <div className="col-md-12 text-center mt-5 p-0 pb-5">
              <button
                type="submit"
                className="btn btn-block mybtn tx-tfm bottom-buttons btn-color"
              >
                {" "}
                Save{" "}
              </button>
      </div>
      </div>
    </form>
  );
}

export default ProjectContact;
