import { Component, OnInit } from '@angular/core';

import {EChartOption} from 'echarts';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})


export class HistoryComponent implements OnInit {

  
  options1: any;
  options2: any;

  constructor() {

  }

  ngOnInit() {
    this.options1 = {
      title:{
        text: "Stats for last Year"
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };
    this.options2 = {
      title: {
          text: 'View Number for each story',
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
      },
      yAxis: {
          type: 'category',
          data: ['s1','s2','s3','s4','s5','s6']
      },
      series: [
          {
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
      ]
  };
  }

}
