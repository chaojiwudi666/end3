import axios from './axios';

//获取农户详情
// export const userLogin= prams => axios.get('/admininfo/login', {params: prams});
//初始化 
//登录
export const userLogin = prams => axios.post('/api/admininfo/login', prams);
//系统管理
export const getadmininfo = prams => axios.post('/api/admininfo/getadmininfo', prams);
export const saveadmininfo = prams => axios.post('/api/admininfo/saveadmininfo', prams);
export const getadmininfobyid = prams => axios.post('/api/admininfo/getadmininfobyid', prams);
export const updateadmininfobyid = prams => axios.post('/api/admininfo/updateadmininfobyid', prams);
export const deleteadmininfobyids = prams => axios.post('/api/admininfo/deleteadmininfobyids', prams);
//来访者管理
export const savevisitorinfo = prams => axios.post('/api/visitorinfo/savevisitorinfo', prams);
export const getvisitorinfo = prams => axios.post('/api/visitorinfo/getvisitorinfo', prams);
export const getvisitorinfobyid = prams => axios.post('/api/visitorinfo/getvisitorinfobyid', prams);
export const updatevisitorinfobyid = prams => axios.post('/api/visitorinfo/updatevisitorinfobyid', prams);
export const deletevisitorinfobyids = prams => axios.post('/api/visitorinfo/deletevisitorinfobyids', prams);
//学生管理
export const savestudentinfo = prams => axios.post('/api/studentinfo/savestudentinfo', prams);
export const getstudentinfo = prams => axios.post('/api/studentinfo/getstudentinfo', prams);
export const getstudentinfobyid = prams => axios.post('/api/studentinfo/getstudentinfobyid', prams);
export const updatestudentinfobyid = prams => axios.post('/api/studentinfo/updatestudentinfobyid', prams);
export const deletestudentinfobyids = prams => axios.post('/api/studentinfo/deletestudentinfobyids', prams);

//宿舍管理
export const savedormitoryinfo = prams => axios.post('/api/dormitoryinfo/savedormitoryinfo', prams);
export const getdormitoryinfo = prams => axios.post('/api/dormitoryinfo/getdormitoryinfo', prams);
export const getdormitoryinfobyid = prams => axios.post('/api/dormitoryinfo/getdormitoryinfobyid', prams);
export const updatedormitoryinfobyid = prams => axios.post('/api/dormitoryinfo/updatedormitoryinfobyid', prams);
export const deletedormitoryinfobyids = prams => axios.post('/api/dormitoryinfo/deletedormitoryinfobyids', prams);

//电费管理
export const saveelectricityinfo = prams => axios.post('/api/electricityinfo/saveelectricityinfo', prams);
export const getelectricityinfo = prams => axios.post('/api/electricityinfo/getelectricityinfo', prams);
export const getelectricityinfobyid = prams => axios.post('/api/electricityinfo/getelectricityinfobyid', prams);
export const updateelectricityinfobyid = prams => axios.post('/api/electricityinfo/updateelectricityinfobyid', prams);
export const deleteelectricityinfobyids = prams => axios.post('/api/electricityinfo/deleteelectricityinfobyids', prams);

//报修管理
export const savemaintenanceinfo = prams => axios.post('/api/maintenanceinfo/savemaintenanceinfo', prams);
export const getmaintenanceinfo = prams => axios.post('/api/maintenanceinfo/getmaintenanceinfo', prams);
export const getmaintenanceinfobyid = prams => axios.post('/api/maintenanceinfo/getmaintenanceinfobyid', prams);
export const updatemaintenanceinfobyid = prams => axios.post('/api/maintenanceinfo/updatemaintenanceinfobyid', prams);
export const deletemaintenanceinfobyids = prams => axios.post('/api/maintenanceinfo/deletemaintenanceinfobyids', prams);
export const updatemaintenancestatebyid = prams => axios.post('/api/maintenanceinfo/updatemaintenancestatebyid', prams);

//卫生管理hygiene_info
export const savehygieneinfo = prams => axios.post('/api/hygieneinfo/savehygieneinfo', prams);
export const gethygieneinfo = prams => axios.post('/api/hygieneinfo/gethygieneinfo', prams);
export const gethygieneinfobyid = prams => axios.post('/api/hygieneinfo/gethygieneinfobyid', prams);
export const updatehygieneinfobyid = prams => axios.post('/api/hygieneinfo/updatehygieneinfobyid', prams);
export const deletehygieneinfobyids = prams => axios.post('/api/hygieneinfo/deletehygieneinfobyids', prams);
export const gethygienenum = prams => axios.post('/api/hygieneinfo/gethygienenum', prams);


//个人信息管理
export const updatestudentpassword = prams => axios.post('/api/studentinfo/updatestudentpassword', prams);



