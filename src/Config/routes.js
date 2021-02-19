import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import home from '../Pages/Home';

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
	},
	{
		path: '/',
		component: home,
		isPrivate: false,
	},
	{
		path: '/*',
		component: NotFound,
		isPrivate: true,
	}
];

export default routes;
