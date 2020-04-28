import {TRAVEL_INIT_INFO,TRAVEL_CONTENT_INFO,TRAVEL_BOTTOM_INFO,GET_INFOLIST,REST_PAGECOUNT,UPDATE_LOADING,UPDATE_REFRESH} from './action-types';

export default {
    [GET_INFOLIST](state,payload){        
        state.infoList=payload.infoList;           
        state.isHasMore=payload.isHasMore;
        state.pageSize=payload.pageSize;
   
        return state;
    },
    [REST_PAGECOUNT](state,payload){
        state.pageSizs=0;
        return state;
    },
    [UPDATE_REFRESH](state,payload){
        state.isRefresh = payload;
        return state;
    },
    [UPDATE_LOADING](state,payload){
        state.isLoading=payload;
        return state;
    },  
    [TRAVEL_INIT_INFO](state, payload) {

        state.initInfo=payload.initInfo;
        return state;
    },
    [TRAVEL_CONTENT_INFO](state, payload) {
        
        state.contentInfo=payload.contentInfo;
        return state;
    },
    [TRAVEL_BOTTOM_INFO](state, payload) {
        
        state.bottomInfo=payload.bottomInfo;
        return state;
    },
    // [GET_INFOLIST](state,payload){
    //     if(state.tabIndex===0){
    //         state.notifyNum=payload.total;
    //     }
    //     state.infoList=payload.infoList;
    //     state.total = payload.total;
    //     state.pageCount=payload.pageCount;
    //     state.queryPram=payload.queryPram;
    //     state.isHasMore=payload.isHasMore;
    //     console.log(payload);
    //     return state;
    // },
    // [REST_PAGECOUNT](state,payload){
    //     state.pageCount=0;
    //     return state;
    // },
    // [UPDATE_REFRESH](state,payload){
    //     state.isRefresh = payload;
    //     return state;
    // },
    // [UPDATE_LOADING](state,payload){
    //     state.isLoading=payload;
    //     return state;
    // },
    // [FARMER_DETAIL](state,payload){ 
    //     //3.4  dispatch过来的接口返回的数据reducer到界面
    //     state.farmDetail = payload.farmDetail;
    //     return state;
    // }
};
