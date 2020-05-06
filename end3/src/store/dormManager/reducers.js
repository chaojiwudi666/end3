import {GET_LIST} from './action-types';

export default {
    
    [GET_LIST](state, payload) {
        
        state.listData=payload.listData;
        return state;
    },   
};
