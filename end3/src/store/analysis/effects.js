import {gethygienenum} from '../../services';
import Actions from '../../utils/index';
import { message } from 'antd';
message.config({
    top: 20,
    duration: 1,
    maxCount: 3,
    rtl: true,
});
//3.3添加接口实现
const effects = dispatch => ({
    async gethygieneNum(prams, state,callback) {
       
    
        let res = await gethygienenum();
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            dispatch({
                type: 'analysis/GET_DATA',
                payload: {
                    data: res.data.data,
                }
            });
    
            callback && callback();
            // dispatch({
            //     type: 'systemManager/DELETE_DATA',
            //     payload: {
            //         data: prams,
            //     }
            // });
        }
        
    },
    // async GetTravelIndexPage(prams, state) {
       
        
    //     let res = await GetTravelIndexPage(prams);
   
    //     dispatch({
    //         type: 'home/TRAVEL_CONTENT_INFO',
    //         payload: {
    //             contentInfo: res.data.Data,
    //         }
    //     });
    // },
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
