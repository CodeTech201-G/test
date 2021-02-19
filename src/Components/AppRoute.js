import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '../Context';
// import NavBar from "../Pages/Navbar";


const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
	const userDetails = useAuthState();
	return (
		<>
      {/* {Boolean(userDetails.token) && <NavBar isAuthenticated={true}/>} */}
	  {/* {!Boolean(userDetails.token) && <NavBar isAuthenticated={false}/>} */}
		<Route
			path={path}
			render={(props) =>
				isPrivate && !Boolean(userDetails.token) ? (
					<Redirect to={{ pathname: '/login' }} />
				) : Boolean(userDetails.token) && path === "/login" ? <Redirect to={{ pathname: '/' }} /> :(
					<Component {...props} />
				)
			}
			{...rest}
		/>
		<div className="footer"><p></p></div>
		</>
	);
};

export default AppRoutes;
