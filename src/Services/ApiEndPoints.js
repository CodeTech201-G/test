export const ENV_URL = "https://test.cetautomatix-backend.infanion.com/";
export const REGEX_URL = 'api/v1/';
export const BASE_URL = ENV_URL + REGEX_URL;

export const LoginUrl = BASE_URL + "login-user";
export const VarifyVAT = BASE_URL + "verify-vat";
export const AddProject = BASE_URL + "add-project";
export const AddCompanyUrl = BASE_URL + "add-company";
export const CompanyList  = BASE_URL + "get-company-list";
export const CheckUserProject = BASE_URL + "check-user-project";
export const TaskList = BASE_URL + "get-tasks";
export const SingleTask = BASE_URL + "get/task";
export const AddTasks = BASE_URL + "add-tasks";
export const UpdateTask = BASE_URL + "update_task";
export const TaskDataList = BASE_URL + "get-all-task-details";
export const ProjectListAPI = BASE_URL + "get-project-list";
export const AddProjectsQuestions = BASE_URL + "add-project-questions";
export const MyAccountDetails = BASE_URL + "get-account-details";
export const MyProjectDashboard = BASE_URL + "get-dashboard-details";
export const MyNotifications = BASE_URL + "getAllNotification";
export const updateNotifications = BASE_URL + "updateNotificationStatus";
export const UpdatePersonalInfo = BASE_URL + "update-account-details";
export const EditProject = BASE_URL + 'edit_project';
export const UpdateProject = BASE_URL + 'update_project';
export const ManagePictures = BASE_URL + 'manage_images';
export const ExportDIY = BASE_URL+'report_data';

//follow the below example to add your url endpoints

// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';