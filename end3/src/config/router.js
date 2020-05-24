const myRoute = [
  {
  key: '/home',
  name: 'home',
  path: '/home',
  exact: true,
  component: 'views/Home',
  model: 'store/home'
},{
  key: '/systemManager',
  name: 'systemManager',
  path: '/systemManager',
  exact: true,
  component: 'views/SystemManager',
  model: 'store/systemManager',
},{
  key: '/electricManager',
  name: 'electricManager',
  path: '/electricManager',
  exact: true,
  component: 'views/ElectricManager',
  model: 'store/electricManager',
},{
  key: '/userInfoManager',
  name: 'userInfoManager',
  path: '/userInfoManager',
  exact: true,
  component: 'views/UserInfoManager',
  model: 'store/userInfoManager',
},{
  key: '/dormManager',
  name: 'dormManager',
  path: '/dormManager',
  exact: true,
  component: 'views/DormManager',
  model: 'store/dormManager',
},{
  key: '/hygieneManager',
  name: 'hygieneManager',
  path: '/hygieneManager',
  exact: true,
  component: 'views/HygieneManager',
  model: 'store/hygieneManager',
},{
  key: '/visitManager',
  name: 'visitManager',
  path: '/visitManager',
  exact: true,
  component: 'views/VisitManager',
  model: 'store/visitManager',
},{
  key: '/repairManager',
  name: 'repairManager',
  path: '/repairManager',
  exact: true,
  component: 'views/RepairManager',
  model: 'store/repairManager',
},{
  key: '/studentManager',
  name: 'studentManager',
  path: '/studentManager',
  exact: true,
  component: 'views/StudentManager',
  model: 'store/studentManager',
},{
  key: '/dormrepair',
  name: 'dormrepair',
  path: '/dormrepair',
  exact: true,
  component: 'views/Dormrepair',
  model: 'store/dormrepair',
}
]
export default myRoute;
//1.新页面在这里添加路由