import {getadmininfo,saveadmininfo,getadmininfobyid,deleteadmininfobyids,updateadmininfobyid} from '../../services';
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
    async getadmininfo(prams, state,callback) {
       
      
        let res = await getadmininfo(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            let listData=[];
            let pageNo = 0;
            if(res.data.data.length===0){
                let data = await getadmininfo({...prams,page_no:prams.page_no>1?prams.page_no-1:1})
                listData = Actions.formateListData(data.data.data);
                pageNo = data.data.pageNo;
            }else{
                listData = Actions.formateListData(res.data.data);
                pageNo = res.data.pageNo;
            }
           
            listData.forEach((item)=>{
           
            if(item.role_id===1){
                item.role_id="管理员";
            }else if(item.role_id===2){
                item.role_id="宿管员"
            }
        });
     
        dispatch({
            type: 'systemManager/GET_USERLIST',
            payload: {
                listData:listData,
                total:res.data.total,
                page_no:pageNo
            }
        });

        }
        
    },async saveAdmininfo(prams, state ,callback) {
       
      
        let res = await saveadmininfo(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            callback&&callback();
        }
        console.log(res);
    },async deleteData(prams,state,callback){
        let res = await deleteadmininfobyids(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            callback&&callback();
            // dispatch({
            //     type: 'systemManager/DELETE_DATA',
            //     payload: {
            //         data: prams,
            //     }
            // });
        }
         
    },async getAdmininfobyId(prams, state ,callback) {
       
      
        let res = await getadmininfobyid(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
          
            dispatch({
                type: 'systemManager/GET_USERINFO',
                payload: {
                    userInfo: {
                        user:{
                            name:res.data.data[0].name,
                            phone:res.data.data[0].phone,
                            password:res.data.data[0].password,
                            remark:res.data.data[0].remark,
                            role_id:res.data.data[0].role_id,



                        }

                    }
                }
            });
        }
       
    },
    async updateAdmininfobyid(prams, state ,callback) {
       
      
        let res = await updateadmininfobyid(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            callback&&callback();
            
        }
    }

});

export default effects;
