import reducers from './reducers';
import effects from './effects';
//3.2 定义store里面dispatch的字段
export const state = {
  userList:[],
  userInfo:{
    user:{
      dormitory_number:'',
      hygienic_condition:"",
      remark:"",
     
    }
    
  },
  
  listData:[],
  page_no:1,
  page_size:10,
  total:0
   
};

export default {
  name: 'hygieneManager',
  state,
  reducers,
  effects
};
