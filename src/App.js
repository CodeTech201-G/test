import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import "./App.css";
import routes from './Config/routes.js';
import { AuthProvider } from './Context';
import AppRoute from './Components/AppRoute';
import LoadingIcon from "./LoadingIcon"

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					{routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							// isPrivate={route.isPrivate}
							isPrivate={localStorage.getItem('true') === 'true'?true:false}
						/>
					))}
				</Switch>
				<LoadingIcon />
			</Router>
		</AuthProvider>
	);
}

export default App;
