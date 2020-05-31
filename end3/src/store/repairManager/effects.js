import { getmaintenanceinfo, savemaintenanceinfo, getmaintenanceinfobyid,updatemaintenancestatebyid, deletemaintenanceinfobyids, updatemaintenanceinfobyid } from '../../services';
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
            console.log(res.data.data);
            let listData = [];
            let page_no = 0;
            if (res.data.data.length === 0) {
                let data = await getmaintenanceinfo({ ...prams, page_no: prams.page_no > 1 ? prams.page_no - 1 : 1 })
                listData = Actions.formateListData(data.data.data);
                page_no = data.data.page_no;
            } else {
                console.log(res.data.data);
                listData = Actions.formateListData(res.data.data);
                console.log(listData[0].maintenance_type);
                page_no = res.data.page_no;
            }
            console.log(listData);
            let arr = ["地面/地砖","电器/开关/线路","卫浴洁具类","床/书橱/椅子","管道堵塞疏通","门窗","其他"]
            listData.forEach((item) => {           
                item.maintenance_type=arr[item.maintenance_type];
                
            });
            if(prams.dormitory_number){
                dispatch({
                    type: 'repairManager/GET_LISTDATA',
                    payload: {
                        listData: listData,
                        total: res.data.total,
                        page_no: page_no,
                        dormitory_number:prams.dormitory_number
                    }
                });

            }else{
                dispatch({
                    type: 'repairManager/GET_LISTDATA',
                    payload: {
                        listData: listData,
                        total: res.data.total,
                        page_no: page_no
                    }
                });

            }
            

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
                type: 'repairManager/GET_USERINFO',
                payload: {
                    userInfo: {
                        user: {
                            ...res.data.data[0],
                                 
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
    },
    async updatemaintenancestatebyId(prams, state, callback) {


        let res = await updatemaintenancestatebyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();

        }
    }



});

export default effects;
