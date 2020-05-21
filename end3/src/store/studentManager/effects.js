import { getstudentinfo, savestudentinfo, getstudentinfobyid, deletestudentinfobyids, updatestudentinfobyid } from '../../services';
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
    async getStudentinfo(prams, state, callback) {


        let res = await getstudentinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            let listData = [];
            let page_no = 0;
            if (res.data.data.length === 0) {
                let data = await getstudentinfo({ ...prams, page_no: prams.page_no > 1 ? prams.page_no - 1 : 1 })
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
                type: 'studentManager/GET_LISTDATA',
                payload: {
                    listData: listData,
                    total: res.data.total,
                    page_no: page_no
                }
            });

        }

    }, async saveStudentinfo(prams, state, callback) {


        let res = await savestudentinfo(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();
        }
        console.log(res);
    }, async deleteData(prams, state, callback) {
        let res = await deletestudentinfobyids(prams);
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

    }, async getStudentinfobyId(prams, state, callback) {


        let res = await getstudentinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {

            dispatch({
                type: 'studentManager/GET_USERINFO',
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
    async updateStudentinfobyid(prams, state, callback) {


        let res = await updatestudentinfobyid(prams);
        if (res.data.state < 0) {
            message.error(res.data.message.name);
        } else {
            callback && callback();

        }
    }

});

export default effects;
