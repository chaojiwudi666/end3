import {savevisitorinfo,getvisitorinfo} from '../../services';
import Actions from '../../utils/index';

//3.3添加接口实现
const effects = dispatch => ({
    async saveVisitorinfo(prams, state) {
       
        // let pram = {
        //     appId: prams,
        // };
        let res = await savevisitorinfo(prams);
        console.log(res);
        // dispatch({
        //     type: 'home/TRAVEL_INIT_INFO',
        //     payload: {
        //         initInfo: res.data.Data,
        //     }
        // });
    },
    async getVisitorinfo(prams, state) {
       
        let res = await getvisitorinfo(prams);  
        let listData = Actions.formateListData(res.data.data);
        
        console.log(listData);
        dispatch({
            type: 'visitManager/GET_LISTDATA',
            payload: {
                listData: listData,
                pageNo:res.pageNo
            }
        });
    },
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
