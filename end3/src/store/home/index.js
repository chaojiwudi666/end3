import reducers from './reducers';
import effects from './effects';

//3.2 定义store里面dispatch的字段
export const state = {
    initInfo:{}, //
    contentInfo:{},
    bottomInfo:{},
    infoList:[], //列表对象
    pageNo:1,
    pageSize:0,
    pageCount:10,
    isHasMore:false,
    isLoading:false,
    isRefresh:false,
   
};

export default {
  name: 'home',
  state,
  reducers,
  effects
};
