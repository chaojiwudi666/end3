import reducers from './reducers';
import effects from './effects';
//3.2 定义store里面dispatch的字段
export const state = {
  userList:[],
  userInfo:{
    user:{
      phone:'',
      maintenance_type:1,
     
     
      remark:"",
      dormitory_number:0,
   
    }
    
  },
  dormitory_number:"",
  listData:[],
  page_no:1,
  page_size:10,
  total:0
   
};

export default {
  name: 'repairManager',
  state,
  reducers,
  effects
};
