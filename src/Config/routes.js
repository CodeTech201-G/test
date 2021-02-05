import Login from '../Pages/Login';
// import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/NotFound';
import ProjectTasks from '../Pages/ProjectTasks/ProjectTasks';
import AddTask from '../Pages/ProjectTasks/AddTask';
import CreateProject from '../Pages/Projects/CreateProject'
import SelectCompany from '../Pages/Company/SelectCompany';
// import ProjectDashboard from '../Pages/ProjectDashboard/ProjectDashboard';
import ProjectListView from '../Pages/Projects/ProjectList';
import QuestionPages from '../Pages/QuestionComponents';
import GoogleMapComponent from '../Pages/GoogleMap/google_map_component';
import TaskData from '../Pages/ProjectTasks/TaskData';
import MyAccountPage from '../Pages/MyAccount/MyAccount';
import TaskPictures from '../Pages/ProjectTasks/TaskPictures';
import MyNotification from '../Pages/MyAccount/my_notification';
import DIY from '../Pages/MyAccount/DIY';
import ProjectAddressMarker from '../Pages/GoogleMap/projectAddress';
import ReportsDIY from '../Pages/Reports/reportPage.js';

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
	},
	{
		path: '/project_tasks',
		component: ProjectTasks,
		isPrivate: true,
	},
	{
		path: '/add_task/:id',
		component: AddTask,
		isPrivate: true,
	},
	{
		path: '/add_task',
		component: AddTask,
		isPrivate: true,
	},
	{
		path: '/company/:id',
		component: SelectCompany,
		isPrivate: true,
	},
	{
		path: '/company',
		component: SelectCompany,
		isPrivate: true,
	},
	// {
	// 	path: '/projectDashboard/:id',
	// 	component: ProjectDashboard,
	// 	isPrivate: true,
	// },
	{
		path: '/createProject',
		component: CreateProject,
		isPrivate: true,
	},
	// {
	// 	path: '/projects',
	// 	component: ProjectListView,
	// 	isPrivate: true,
	// },
	{
		path: '/MyProjects',
		component: ProjectListView,
		isPrivate: true,
	},
	{
		path: '/project_question/:id',
		component: QuestionPages,
		isPrivate: true,
	},
	{
		path: '/google_map_api',
		component: GoogleMapComponent,
		isPrivate: true,
	},
	{
		path: '/projectAddressMarker/:id',
		component: ProjectAddressMarker,
		isPrivate: true,
	},
	{
		path: '/task_data/:id',
		component: TaskData,
		isPrivate: true,
	},
	{
		path: '/task_pictures/:id',
		component: TaskPictures,
		isPrivate: true,
	},
	{
		path: '/task_pictures',
		component: TaskPictures,
		isPrivate: true,
	},
	{
		path: '/diy',
		component: DIY,
		isPrivate: true,

	},
	{
		path: '/reportsDIY/:id',
		component: ReportsDIY,
		isPrivate: true,

	},
	{
		path: '/myNotifications',
		component: MyNotification,
		isPrivate: true,

	},
	{
		path: '/myAccount',
		component: MyAccountPage,
		isPrivate: true,

	},
	{
		path: '/',
		component: ProjectListView,
		isPrivate: true,
	},
	{
		path: '/*',
		component: NotFound,
		isPrivate: true,
	}
];

export default routes;
