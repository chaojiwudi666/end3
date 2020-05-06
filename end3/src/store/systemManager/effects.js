import {getadmininfo} from '../../services';
import Actions from '../../utils/index';

//3.3添加接口实现
const effects = dispatch => ({
    async getadmininfo(prams, state) {
       
        let pram = {
            appId: prams,
        };
        let res = await getadmininfo(pram);
   
        // dispatch({
        //     type: 'systemManager/GET_USERLIST',
        //     payload: {
        //         initInfo: res.data.Data,
        //     }
        // });
    },async deleteData(prams,state){

         dispatch({
            type: 'systemManager/DELETE_DATA',
            payload: {
                data: prams,
            }
        });
    }

});

export default effects;
