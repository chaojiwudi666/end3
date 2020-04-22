import {RequireCaptchaByOpen,GetUserInfoByOpen,LoginByOpen,LoginUserData} from '@services';
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
    async GetVerCode(prams, state) {
       
        
        let res = await RequireCaptchaByOpen(prams);
        console.log(res);
        if(res.data.Status!=1){
            message.error(res.data.Message);
        }
        
    },async VerCodeLogin(prams, state) {
       
        console.log(prams);
        let res = await GetUserInfoByOpen({
            mobile:prams.mobile,   //手机
            token:prams.token,  //token
            captcha:prams.captcha, //验证码
       
        });

        console.log(res.data.Status);
        if(res.data.Status===1){
            let data = await LoginUserData();
            if(data.data.Status===1){
                sessionStorage.setItem("userInfo",JSON.stringify(data.data.Data));
                Action.saveLogin();
                console.log(data);
                prams.props.history.goBack();
               
            }else{
                message.error(data.data.Message);
            }
            
        }else{
            message.error(res.data.Message);
        }
        console.log(res);
        
    },async UserLogin(prams,state) {
       
        
        let res = await LoginByOpen({
            account:prams.account,  //账号  /party/xxxx/xxxxx/
            password:prams.password,
            appId:prams.appId,
            loginType:prams.loginType,
            token:prams.token,
        });
        console.log();
        if(res.data.Status===1){
            let data = await LoginUserData();
            if(data.data.Status===1){
                sessionStorage.setItem("userInfo",JSON.stringify(data.data.Data));
                Action.saveLogin();
                console.log(data);
                prams.props.history.goBack();
            }else{
                message.error(data.data.Message);
            }
           
        }else{
            message.error(res.data.Message);
        }
        console.log(res);
        
    }
    

});

export default effects;
