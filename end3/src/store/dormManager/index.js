import reducers from './reducers';
import effects from './effects';

//3.2 定义store里面dispatch的字段
export const state = {
  listData:[{
    key: '1',
    dormitoryNumber: 101,
    hostelId: 1,
    leader: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    dormitoryNumber: 102,
    hostelId: 1,
    leader: 'New York No. 1 Lake Park',
  },
  {
    key: '3',
    dormitoryNumber: 103,
    hostelId: 1,
    leader: 'New York No. 1 Lake Park',
  },
  {
    key: '4',
    dormitoryNumber: 104,
    hostelId: 1,
    leader: 'New York No. 1 Lake Park',
  }]
  
   
};

export default {
  name: 'dormManager',
  state,
  reducers,
  effects
};
