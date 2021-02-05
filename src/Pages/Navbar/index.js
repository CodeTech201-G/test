import React from 'react';
import Logo from './images/logo.png'
import './Navbar.css';
import { useHistory } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer'
import { useAuthDispatch, logout, sessionTimeout } from '../../Context';
import MyAccountImg from '../../Static/Assets/MyAccount-white.png';
import Dashboard from '../../Static/Assets/Dashboard.png';
import Logout from '../../Static/Assets/logout.png';
import AddProjectIcon from '../../Static/Assets/AddProject-white.png';
import { Link } from 'react-router-dom';

function NavBar({ isAuthenticated }) {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  // logout functionality
  const handleLogout = () => {
    logout(dispatch);
    localStorage.setItem('isLogged', false);
    localStorage.clear();
    sessionStorage.clear();
    history.push('/login');
  };

  //////////////////////////////////////////
  /**
   *      Session Timeout for logout
   */
  //////////////////////////////////////////
  const handleOnIdle = event => {
    // console.log('user is idle', event)
    // console.log('last active', getLastActiveTime())
    if (JSON.parse(localStorage.getItem('keepLogin')) === false) {
      sessionTimeout(dispatch)
      handleLogout()
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  const handleOnActive = event => {
    // console.log('user is active', event)
    // console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = (e) => {
    // console.log('user did something', e)
  }
  // const { getRemainingTime, getLastActiveTime } = useIdleTimer({
  // 15 minutes session timeout
  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })
  return (
    <div className="col-md-12 Navbar-color">
      <div className={isAuthenticated?"container":"col-md-11 m-auto"}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/"><img src={Logo} alt="logo" width="35px" /></a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <p onClick={handleLogout} className="text-white navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >Logout <span className="sr-only">(current)</span></p> */}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              {/* <li class="nav-item active ">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li> */}
            </ul>
            {isAuthenticated && <ul className="navbar-nav">
              <li className="nav-item pl-3">
                <img src={AddProjectIcon} alt="logout" width="22px" />
                <Link to={"/createProject/"} className="text-white ml-2" >Add project</Link>
              </li>
              <li className="nav-item pl-3">
                <img src={Dashboard} alt="logout" width="17px" />
                <Link to={"/"} className="text-white ml-2" >Dashboard </Link>
              </li>
              <li className="nav-item pl-3">
                <img src={MyAccountImg} alt="logout" width="15px" />
                <Link to={"/myAccount"} className="text-white ml-2" >My Account </Link>
              </li>
              <li className="nav-item pl-3">
                <img src={Logout} alt="logout" width="20px" />
                <span onClick={handleLogout} className="text-white ml-2 custom-cursor" >Logout </span>
              </li>
            </ul>}
            {(isAuthenticated === null || isAuthenticated === false) && <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-small Download-app-btn custom-btn-border-color custom-highlight">Download mobile app</button>
              </li>
            </ul>}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
