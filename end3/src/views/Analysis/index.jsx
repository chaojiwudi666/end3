import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input, Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie'
// 引入柱状图（这里放你需要使用的echarts类型 很重要）
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import { HomeOutlined, UserOutlined, PlusOutlined, FormOutlined, CloseSquareOutlined, UnorderedListOutlined } from '@ant-design/icons';
import './index.scss';


//4.1对应映射的字段 
const mapState = ({ analysis }) => ({
  data: analysis.data


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ analysis }) => ({
  gethygieneNum: analysis.gethygieneNum
});

const Analysis = (props) => {
  useEffect(() => {
    props.gethygieneNum();



  }, []);
  useEffect(() => {
    console.log(props.data);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
  

      title: { 
        text: '卫生评分统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#000'
        }
       },
      tooltip: {},
      xAxis: {
        data: ["脏乱差", "较脏", "一般", "干净", "非常干净"]
      },
      yAxis: {},
      series: [{
        name: '评分',
        type: 'bar',
        data: props.data
      }]
    });
    let dataArr=[];
    let dataTetxArr=["脏乱差", "较脏", "一般", "干净", "非常干净"];
    props.data.forEach((item,index)=>{
        dataArr.push({value:item,name:dataTetxArr[index]})


    });
    console.log(dataArr);
    var myChart1 = echarts.init(document.getElementById('main1'));
    var option1 = {
      backgroundColor: '#ffffff',

      title: {
        text: '卫生情况占比',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#000'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '卫生评分',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: dataArr.sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    myChart1.setOption(option1)
  }, [props.data]);
  return (
    <div className="analysis">
      <div className="top_wrapper">
      <div id="main" style={{ width: 700, height: 600 }}></div>
      <div id="main1" style={{ width: 600, height: 600 }}></div>
      </div>
      
      <div id="main2" style={{ width: 400, height: 400 }}></div>
      <div id="main3" style={{ width: 400, height: 400 }}></div>
    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(Analysis));