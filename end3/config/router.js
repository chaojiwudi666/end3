import topRouter from './cloudtop.router';
const todo = {
  key: 'todo',
  name: 'todo',
  path: null,
  children: [{
    key: '/todo/manager',
    name: 'todoManager',
    path: '/todo/manager',
    exact: true,
    component: 'views/ToDo',
    model: 'store/todo'
  }]
};

export default [
  todo,
  topRouter
];
