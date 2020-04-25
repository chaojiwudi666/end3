import axios from 'axios';

import { message } from 'antd';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
      'Content-Type': 'application/json; charset=utf-8',
  }
});

//const token = "9683e1ce6b8d9cd98bb5fb92f7a1b0a6ce0cd18a86d97ba6b6a786eaf99a763e311b66e0a85dbfbd93950c589a55f454bcd9c844f221bd789194566a5b45d0641586328570270";

axiosInstance.interceptors.request.use(config => {
    if( config.url.indexOf('http')>-1){

    }else{
      // config.url = `/Service${config.url}`;
      // config.headers['token'] = sessionStorage.getItem("token");;
    }
   
  return config;
}, error => {
  message.error('请求错误');
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  // if (response.data.code === 10010 || response.data.data === 'TOKEN_INVALID') {
  //   message.config({
  //     maxCount: 1
  //   });
  //   message.warning('登录已过期，请重新登录');
  //   setTimeout(() => {
  //     window.location.href = '/login';
  //   }, 1000);
  // }
  
  return response;
}, error => {
  return Promise.reject(error.response);
});

export default axiosInstance;
