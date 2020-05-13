import reducers from './reducers';
import effects from './effects';

//3.2 定义store里面dispatch的字段
export const state = {
  visitInfo:{
    visitor:{
      phone:'',
      student_name:"",
      name:"",
      remark:"",
      visit_time:""
    }
    
  },
  
  listData:[],
  page_no:1,
  page_size:10,
  total:0
  
   
};

export default {
  name: 'visitManager',
  state,
  reducers,
  effects
};
