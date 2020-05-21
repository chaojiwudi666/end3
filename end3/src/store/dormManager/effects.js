import { getdormitoryinfo, savedormitoryinfo, getdormitoryinfobyid, deletedormitoryinfobyids, updatedormitoryinfobyid } from '../../services';
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
    async getdormitoryinfo(prams, state, callback) {


        let res = await getdormitoryinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            let listData = [];
            let page_no = 0;
            if (res.data.data.length === 0) {
                let data = await getdormitoryinfo({ ...prams, page_no: prams.page_no > 1 ? prams.page_no - 1 : 1 })
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
                type: 'dormManager/GET_LISTDATA',
                payload: {
                    listData: listData,
                    total: res.data.total,
                    page_no: page_no
                }
            });

        }

    }, async savedormitoryinfo(prams, state, callback) {


        let res = await savedormitoryinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();
        }
        console.log(res);
    }, async deleteData(prams, state, callback) {
        let res = await deletedormitoryinfobyids(prams);
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

    }, async getdormitoryinfobyId(prams, state, callback) {


        let res = await getdormitoryinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {

            dispatch({
                type: 'dormManager/GET_USERINFO',
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
    async updatedormitoryinfobyid(prams, state, callback) {


        let res = await updatedormitoryinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();

        }
    }

});

export default effects;
