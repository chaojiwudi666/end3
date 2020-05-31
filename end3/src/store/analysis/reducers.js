import {GET_DATA} from './action-types';

export default {
    [GET_DATA](state,payload){        
        state.data=payload.data;           
        
   
        return state;
    },
   
   
};
