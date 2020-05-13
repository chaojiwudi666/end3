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



