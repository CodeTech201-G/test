import React from 'react';

function VATValidation({ form, updateField, onSubmit }) {
   
    return (
        <div className="layout-space2">
            <form onSubmit={(e)=>onSubmit(e,'vatValidation')}>
                <span>Please enter your VAT number.</span>
                <div className="form-group mb-3 pt-4">
                    <input
                        type="text"
                        name="VAT"
                        className="form-control"
                        value={form.VAT}
                        onChange={updateField}
                        id="VAT"
                        required
                        aria-describedby="VATHelp"
                        placeholder="Enter VAT number(eg. 1234)"
                    />
                </div>
                <div className="col-md-12 text-center mt-5 p-0 pb-5">
                    <button
                        type="submit"
                        className="btn btn-block mybtn btn-color tx-tfm bottom-buttons"
                    >
                        {" "}
                Verify VAT{" "}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default VATValidation;
