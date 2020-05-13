import {savevisitorinfo,getvisitorinfo,getvisitorinfobyid,updatevisitorinfobyid,deletevisitorinfobyids} from '../../services';
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
    async saveVisitorinfo(prams, state,callback) {
       
        // let pram = {
        //     appId: prams,
        // };
        let res = await savevisitorinfo(prams);
        console.log(res);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            callback&&callback();
           
        }
       
    },
    async getVisitorinfo(prams, state,callback) {
       
        let res = await getvisitorinfo(prams);  
        
        
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            let listData=[];
            let page_no = 0;
            if(res.data.data.length===0){
                let data = await getvisitorinfo({...prams,page_no:prams.page_no>1?prams.page_no-1:1})
                listData = Actions.formateListData(data.data.data);
                page_no = data.data.page_no;
            }else{
                listData = Actions.formateListData(res.data.data);
                page_no = res.data.page_no;
            }
     
        dispatch({
            type: 'visitManager/GET_LISTDATA',
            payload: {
                listData:listData,
                total:res.data.total,
                page_no:page_no
            }
        });

        }
    },async deleteData(prams,state,callback){
        let res = await deletevisitorinfobyids(prams);
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
         
    },async getVisitorinfobyid(prams, state ,callback) {
       
      
        let res = await getvisitorinfobyid(prams);
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
    async updateVisitorinfobyid(prams, state ,callback) {
       
      
        let res = await updatevisitorinfobyid(prams);
        if(res.data.state<0){
            message.error(res.data.message.name);
        }else{
            callback&&callback();
            
        }
    }
    // async GetTravelFooter(prams, state) {
       
    //     let pram = {
    //         appId: prams,
    //     };
    //     let res = await GetTravelFooter(pram);
        
    //     dispatch({
    //         type: 'home/TRAVEL_BOTTOM_INFO',
    //         payload: {
    //             bottomInfo: res.data.Data,
    //         }
    //     });
        
    // }, async getHotActivities(prams, state) {
        
       
    //     let res = await GetTravelContentListBase({
    //         pageNo: 1,
    //         appId : prams.appId,
    //         pageSize: prams.pageSize,
    //         modilarId :prams.modilarId
    //     });    
    //     dispatch({
    //         type: 'home/GET_INFOLIST',
    //         payload: {                
    //             infoList: res.data.Data.Contents, 
    //             pageSize:prams.pageSize,
               
    //             isHasMore:res.data.Data.length&&(res.data.Data.length%10===0)?true:false                                      
    //         }
    //     });
    // },async postTravelPraise(prams, state) {                   
        
      
    //     let res = await TravelPraise({requestParams:Actions.DES(JSON.stringify(prams)).toString()});
    //     console.log(res);
        
        
   
    // }

});

export default effects;
