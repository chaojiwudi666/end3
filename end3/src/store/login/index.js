import reducers from './reducers';
import effects from './effects';

export const state = {
  loginState: 'login',
  initInfo:{},
 
};

export default {
  name: 'login',
  state,
  reducers,
  effects
};
