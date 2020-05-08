import axios from './axios';

//获取农户详情
// export const userLogin= prams => axios.get('/admininfo/login', {params: prams});
//初始化 
export const userLogin = prams => axios.post('/api/admininfo/login', prams);
export const getadmininfo = prams => axios.post('/api/admininfo/getadmininfo', prams);
export const saveadmininfo = prams => axios.post('/api/admininfo/saveadmininfo', prams);
export const getadmininfobyid = prams => axios.post('/api/admininfo/getadmininfobyid', prams);
export const deleteadmininfobyids = prams => axios.post('/api/admininfo/deleteadmininfobyids', prams);
export const savevisitorinfo = prams => axios.post('/api/visitorinfo/savevisitorinfo', prams);
export const getvisitorinfo = prams => axios.post('/api/visitorinfo/getvisitorinfo', prams);

