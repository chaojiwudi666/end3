import {userLogin} from '../../services';
import Action from "../../utils/index";
import { message} from 'antd';
message.config({
    top: 20,
    duration: 2,
    maxCount: 3,
    rtl: true,
  });
//3.3添加接口实现
const effects = dispatch => ({
    async userToLogin(prams, state) {
       
        
        let res = await userLogin(prams);
        console.log(res);
        if(res.data.Status!=1){
            message.error(res.data.Message);
        }
        
    },
    

});

export default effects;
