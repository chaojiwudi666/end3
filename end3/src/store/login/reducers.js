import {Get_VerCode} from './action-types';

export default {
    [Get_VerCode](state, payload) {

        state.initInfo=payload.initInfo;
        return state;
    }
};
