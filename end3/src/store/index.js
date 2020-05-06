import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';

const immer = immerPlugin();

const store = init({
  plugins: [immer]
});
console.log(store);

export default store;
