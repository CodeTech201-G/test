import React, { useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import './login-module.css';
import EmailLogin from './EmailLogin';
import ForgetPassword from './ForgetPassword';

function Login(props) {
	const [email, setEmail] = useState('');
	const [forgetemail, setForgetemail] = useState('');
	const [password, setPassword] = useState('');
	const [checkBox, setCheckBox] = useState(false);
	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();
	// const [showPassword, setShowPassword] = useState(false);
	const [page,setPage] = useState('EmailLogin')
	const type_of_login = '1';

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			if(email === 'admin' && password === 'admin'){
				console.log('ok--------');
				localStorage.setItem("isAuthenticated",true);
				props.history.push('/home');
			}
			// await loginUser(dispatch, { email, password, type_of_login });
			//console.log("response login : ", response);
			// if (!response.username) return;
			// props.history.push('/dashboard');
			if (checkBox) {
				localStorage.setItem('keepLogin', true)
			} else {
				localStorage.setItem('keepLogin', false)
			}
		} catch (error) {
			console.log(error);
		}
	};
	const updateValue = (e) => {
		if (e.target.id === 'email')
			setEmail(e.target.value)
		else if(e.target.id === 'forgetemail')
			setForgetemail(e.target.value)
		else
			setPassword(e.target.value)
	}

	const updateCheckbox = (e) => {
		setCheckBox(!checkBox);
	}

	const ChangePage=(e)=>{
		setPage(e)
	}
	const handleForgetPassword=(e)=>{
		e.preventDefault();
		console.log('forget password api integration');
	}
	return (
		<section className={"loginWrap layout-space3"}>
			<div className="mainlogin">
				<div className="login-form">
					{page === "EmailLogin" &&<EmailLogin errorMessage={errorMessage} updateValue={updateValue} email={email} password={password} checkBox={checkBox} updateCheckbox={updateCheckbox} loading={loading} handleLogin={handleLogin} ChangePage={ChangePage}/>}
					{page === "ForgetPassword" &&<ForgetPassword ChangePage={ChangePage} forgetemail={forgetemail} updateValue={updateValue} handleForgetPassword={handleForgetPassword}/>}
				</div>
				<div className="login-bg"></div>
			</div>
		</section>
	);
}

export default Login;
