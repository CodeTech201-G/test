import React from 'react';

function ForgetPassword({ handleForgetPassword, forgetemail, updateValue, loading, ChangePage }) {
    return (
        <div className='mt-5'>
            <p className="browserback" onClick={() => ChangePage('EmailLogin')}>back</p>
            <h5 className="textcolor">Forget password</h5>
            <form className="loginForm mt-2" onSubmit={(e)=>handleForgetPassword(e)}>
                <div className='mt-3'>
                    <div className='form-group mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='forgetemail'
                            value={forgetemail}
                            onChange={(e) => updateValue(e)}
                            disabled={loading}
                            className="form-control customInputForm"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="col-md-12 text-center  mb-3 mt-5 p-0">
                        <button disabled={loading} className="btn login-btn col-12 text-center block btn-color mb-2">
                            ForgetPassword
                            </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ForgetPassword;
