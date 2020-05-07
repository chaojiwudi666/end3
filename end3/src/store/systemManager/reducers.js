import {GET_USERLIST,DELETE_DATA} from './action-types';
export default {
    [GET_USERLIST](state,payload){     
        console.log(payload.total);   
      
        state.listData = payload.listData;
        state.total = payload.total;
        return state;
    },
    [DELETE_DATA](state,payload){
        
        state.data = payload.data;
        return state;
    }
    
};
