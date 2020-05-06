import {GET_USERLIST,DELETE_DATA} from './action-types';
export default {
    [GET_USERLIST](state,payload){     
        // console.log(state);   
      
        // state.data = payload.data;
        
        return state;
    },
    [DELETE_DATA](state,payload){
        
        state.data = payload.data;
        return state;
    }
    
};
