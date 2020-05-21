import { saveelectricityinfo, getelectricityinfo, getelectricityinfobyid, updateelectricityinfobyid, deleteelectricityinfobyids } from '../../services';
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
    async getelectricityinfo(prams, state, callback) {


        let res = await getelectricityinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            let listData = [];
            let page_no = 0;
            if (res.data.data.length === 0) {
                let data = await getelectricityinfo({ ...prams, page_no: prams.page_no > 1 ? prams.page_no - 1 : 1 })
                listData = Actions.formateListData(data.data.data);
                page_no = data.data.page_no;
            } else {
                listData = Actions.formateListData(res.data.data);
                page_no = res.data.page_no;
            }
           
            listData.forEach((item) => {

                item.layer_id = item.layer_id + "#"
            });
        
            dispatch({
                type: 'electricManager/GET_LISTDATA',
                payload: {
                    listData: listData,
                    total: res.data.total,
                    page_no: page_no
                }
            });

        }

    }, async saveelectricityinfo(prams, state, callback) {


        let res = await saveelectricityinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();
        }
        console.log(res);
    }, async deleteData(prams, state, callback) {
        let res = await deleteelectricityinfobyids(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();
            // dispatch({
            //     type: 'systemManager/DELETE_DATA',
            //     payload: {
            //         data: prams,
            //     }
            // });
        }

    }, async getelectricityinfobyId(prams, state, callback) {


        let res = await getelectricityinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {

            dispatch({
                type: 'electricManager/GET_USERINFO',
                payload: {
                    userInfo: {
                        user: {
                            layer_id:res.data.data[0].layer_id,
                            floor_id:res.data.data[0].floor_id,
                         
                        
                        
                            hostel_id:res.data.data[0].hostel_id,
                                                                      
                            remark: res.data.data[0].remark,       
                        }

                    }
                }
            });
        }

    },
    async updateelectricityinfobyid(prams, state, callback) {


        let res = await updateelectricityinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();

        }
    }

});

export default effects;
