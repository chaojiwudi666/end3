import axios from './axios';

//获取农户详情
export const userLogin= prams => axios.get('/admininfo/login', {params: prams});
//初始化 
export const webInit = prams => axios.post('/MainBizSvr.svc/Webinit', prams);

