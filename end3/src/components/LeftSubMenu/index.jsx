import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { ToolOutlined,SolutionOutlined,UserAddOutlined, ThunderboltOutlined,SettingOutlined,BarsOutlined,ShopOutlined,SafetyOutlined,BankOutlined} from '@ant-design/icons';
import "./index.scss";
const { SubMenu } = Menu;

// const imgObj = [{
//   key:"sub1",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub2",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub3",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub4",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub5",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub6",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub7",
//   img: <AppstoreOutlined/>
// },{
//   key:"sub8",
//   img: <AppstoreOutlined/>
// }];

const LeftSubMenu = (props)=> {
  console.log(props.location.pathname.split("/")[1]);
  let current = props.location.pathname.split("/")[1];

  const [state,setState] = useState({
    current:[current],
    rootSubmenuKeys:props.data
    // rootSubmenuKeys : [{
    //   key:'home',
    //   title:"首页"
    // },{
    //   key:'systemManager',
    //   title:'系统管理',
    // }, {
    //   key:'sub2',
    //   title:'电费管理'
    // }, {
    //   key:'sub4',
    //   title:'个人信息管理'
    // }, {
    //   key:'sub5',
    //   title:'寝室信息管理'
    // }, {
    //   key:'sub6',
    //   title:'卫生管理'
    // }, {
    //   key:'sub7',
    //   title:'来访人员管理'
    // }, {
    //   key:'sub8',
    //   title:'报修管理'
    // }],

  });
  useEffect(()=>{
    setState({
      ...state,
      current
    });
  },[props.location.pathname]);
const handleClick = (e)=>{
  console.log(props);
  setState({
    ...state,
    current: e.key,
  });
  props.history.push("/"+e.key);
}

    return (
      <div className="leftSubMenu">
        <Menu
        mode="inline"
        selectedKeys={state.current}
        onClick={(e)=>handleClick(e)}
        style={{ width:"100%" ,height:"100%"}}
        theme="dark"
       
      >
        <p className="title">
          <BankOutlined />
          <span>宿舍管理</span>  
          
        </p>
        {
          state.rootSubmenuKeys.map((item,index)=>{
            return(
        
                 <Menu.Item
                key={item.key}
                
              >
                <span>
                    {item.icon}
                <span>{item.title}</span>
                  </span>
                {/* <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item> */}
              </Menu.Item>
           
                 

            )
            
          })
        }
       
        {/* <SubMenu
          key="sub2"
          title={
            <span>
              <AppstoreOutlined />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <SettingOutlined />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
      </div>
    );
  }



export default withRouter(LeftSubMenu);