import {GET_LISTDATA} from './action-types';

export default {
    [GET_LISTDATA](state,payload){        
        state.listData=payload.listData;           
        state.pageNo=payload.pageNo;
   
        return state;
    }
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
