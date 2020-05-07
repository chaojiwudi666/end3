import {getadmininfo,saveadmininfo} from '../../services';
import Actions from '../../utils/index';
import { message} from 'antd';
message.config({
    top: 20,
    duration: 1,
    maxCount: 3,
    rtl: true,
  });
//3.3添加接口实现
const effects = dispatch => ({
    async getadmininfo(prams, state) {
       
      
        let res = await getadmininfo(prams);
        let listData = Actions.formateListData(res.data.data);
        listData.forEach((item)=>{
            console.log(item);
            if(item.role_id===1){
                item.role_id="管理员";
            }else if(item.role_id===2){
                item.role_id="宿管员"
            }else if(item.role_id===4){
                item.role_id="学生"
            }
        });
        console.log(res.data.total);
        dispatch({
            type: 'systemManager/GET_USERLIST',
            payload: {
                listData:listData,
                total:res.data.total
            }
        });
    },async saveAdmininfo(prams, state ,callback) {
       
      
        let res = await saveadmininfo(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            callback();
        }
        console.log(res);
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
