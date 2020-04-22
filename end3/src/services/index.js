import axios from '@services/axios';

//获取农户详情
export const GetTravelFarmhouseDetail= prams => axios.get('/TravelSvr.svc/GetTravelFarmhouseDetailByWebApi', {params: prams});
//初始化 
export const webInit = prams => axios.post('/MainBizSvr.svc/Webinit', prams);

