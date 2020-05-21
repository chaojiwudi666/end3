import { getmaintenanceinfo, savemaintenanceinfo, getmaintenanceinfobyid, deletemaintenanceinfobyids, updatemaintenanceinfobyid } from '../../services';
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
    async getmaintenanceinfo(prams, state, callback) {


        let res = await getmaintenanceinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            let listData = [];
            let page_no = 0;
            if (res.data.data.length === 0) {
                let data = await getmaintenanceinfo({ ...prams, page_no: prams.page_no > 1 ? prams.page_no - 1 : 1 })
                listData = Actions.formateListData(data.data.data);
                page_no = data.data.page_no;
            } else {
                listData = Actions.formateListData(res.data.data);
                page_no = res.data.page_no;
            }
            console.log(listData);
            listData.forEach((item) => {

                if (item.sex === 1) {
                    item.sex = "男";
                } else if (item.sex === 2) {
                    item.sex = "女"
                }
            });

            dispatch({
                type: 'maintenanceManager/GET_LISTDATA',
                payload: {
                    listData: listData,
                    total: res.data.total,
                    page_no: page_no
                }
            });

        }

    }, async savemaintenanceinfo(prams, state, callback) {


        let res = await savemaintenanceinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();
        }
        console.log(res);
    }, async deleteData(prams, state, callback) {
        let res = await deletemaintenanceinfobyids(prams);
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

    }, async getmaintenanceinfobyId(prams, state, callback) {


        let res = await getmaintenanceinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {

            dispatch({
                type: 'maintenanceManager/GET_USERINFO',
                payload: {
                    userInfo: {
                        user: {
                            phone:res.data.data[0].phone,
                            sex:res.data.data[0].sex,
                         
                        
                        
                            dormitory_number:res.data.data[0].dormitory_number,
                            class_id:res.data.data[0].class_id,
                            name: res.data.data[0].name,                                            
                            remark: res.data.data[0].remark,       
                        }

                    }
                }
            });
        }

    },
    async updatemaintenanceinfobyid(prams, state, callback) {


        let res = await updatemaintenanceinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();

        }
    }

});

export default effects;
