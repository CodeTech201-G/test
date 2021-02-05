import React from 'react';
import Alert from "react-bootstrap/Alert";

function EmailLogin({email,password,errorMessage,handleLogin,updateValue,loading,checkBox,updateCheckbox,ChangePage}) {
  return (
    <div className='mt-5'>
    {errorMessage ? <Alert 
    variant="danger"
    // onClose={() => setMessage("")}
    // dismissible
    className="w-100"
    >{errorMessage}</Alert> : null}
    <h4 className="textcolor">Login with email address</h4>
    <form className="loginForm " onSubmit={handleLogin}>
        <div className='mt-3'>
            <div className='form-group mb-3'>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={(e) => updateValue(e)}
                    disabled={loading}
                    className="form-control customInputForm"
                    placeholder="Email"
                    required
                />
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='password'>Password</label>
                <div className="passsection">
                    <input
                        // type={showPassword ? "text" : "password"}
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => updateValue(e)}
                        disabled={loading}
                        className="form-control customInputForm"
                        placeholder="Password"
                        required
                    />
                    {/* <span
                      className={ showPassword ? "text passvisible" : "password passvisible" }
                      onClick={() => setShowPassword(!showPassword)}
                     ></span> */}
                </div>
            </div>
            <label className="customCheckbox mb-4">Keep me Logged in
                <input type="checkbox" onChange={(e) => updateCheckbox()} checked={checkBox}/>
                <span className="Customcheckmark"></span>
            </label>
            <div className="col-md-12 text-center  mb-3 p-0">
                <button disabled={loading} className="btn login-btn col-12 text-center block btn-color mb-2">
                    Login
                            </button>
            </div>
            {/* <div className="text-center mb-5">
                <p className="textcolor password_text_fontsize custom-cursor textcolor-blue" onClick={()=>ChangePage('ForgetPassword')}><u>Forgot Password</u></p>
            </div> */}
        </div>
    </form>
</div>
  );
}

export default EmailLogin;
