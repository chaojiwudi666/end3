import {userLogin} from '../../services';
import Action from "../../utils/index";
import { message} from 'antd';
message.config({
    top: 20,
    duration: 1,
    maxCount: 3,
    rtl: true,
  });
//3.3添加接口实现
const effects = dispatch => ({
    async userToLogin(prams, state,callback) {
        var data = {
            phone:prams.username,
            password:prams.password
        }
        let res = await userLogin(data);
        console.log(res);
        if(res.data.state>0){
            message.error(res.data.message.name);
        }else{
            callback();
        }
        
    },
    

});

export default effects;
