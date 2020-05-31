import { getvisitorinfo, savevisitorinfo, getvisitorinfobyid, deletevisitorinfobyids, updatevisitorinfobyid } from '../../services';
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
    async getVisitorinfo(prams, state, callback) {


        let res = await getvisitorinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            let listData = [];
            let page_no = 0;
            if (res.data.data.length === 0) {
                let data = await getvisitorinfo({ ...prams, page_no: prams.page_no > 1 ? prams.page_no - 1 : 1 })
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
                type: 'visitManager/GET_LISTDATA',
                payload: {
                    listData: listData,
                    total: res.data.total,
                    page_no: page_no
                }
            });

        }

    }, async saveVisitorinfo(prams, state, callback) {


        let res = await savevisitorinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();
        }
        console.log(res);
    }, async deleteData(prams, state, callback) {
        let res = await deletevisitorinfobyids(prams);
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

    }, async getVisitorinfobyId(prams, state, callback) {


        let res = await getvisitorinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {

            dispatch({
                type: 'visitManager/GET_USERINFO',
                payload: {
                    userInfo: {
                        user: {
                           ...res.data.data[0]      
                        }

                    }
                }
            });
        }

    },
    async updateVisitorinfobyid(prams, state, callback) {


        let res = await updatevisitorinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();

        }
    }

});

export default effects;
