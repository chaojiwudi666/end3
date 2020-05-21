import {GET_LISTDATA,DELETE_DATA,GET_USERINFO} from './action-types';
export default {
    [GET_LISTDATA](state,payload){     
        console.log(payload.page_no);   
      
        state.listData = payload.listData;
        state.total = payload.total;
        state.page_no = payload.page_no;

        return state;
    },
    [DELETE_DATA](state,payload){
        
        state.data = payload.data;
        return state;
    },[GET_USERINFO](state,payload){
        console.log(payload.userInfo);
        state.userInfo = payload.userInfo;
        return state;
    },
    
};
