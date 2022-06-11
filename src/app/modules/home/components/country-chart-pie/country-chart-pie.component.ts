import { Component, OnInit } from '@angular/core';
const colors = {warningLight: 'red', infoLight :'yellow', dangerLight:'orange', successLight:'green', primaryLight:'blue' }

@Component({
  selector: 'cov-country-chart-pie',
  templateUrl: './country-chart-pie.component.html',
  styleUrls: ['./country-chart-pie.component.sass']
})

export class CountryChartPieComponent implements OnInit {

  chartAxisTextColor = 'red';
  chartAxisLineColor = 'green';
  chartAxisSplitLine = '#839AA8';
  chartInnerLineColor = '#D3EBCD';
  chartLineBottomShadowColor = '#635666';
  chartGradientFrom = '#635666';
  chartGradientTo = '#AEDBCE';

  options: any =  {
    backgroundColor: 'gray',
    color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
      textStyle: {
        color: this.chartAxisLineColor,
      },
    },
    series: [
      {
        name: 'Countries',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Germany' },
          { value: 310, name: 'France' },
          { value: 234, name: 'Canada' },
          { value: 135, name: 'Russia' },
          { value: 1548, name: 'USA' },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor:this.chartLineBottomShadowColor,
          },
        },
        label: {
          normal: {
            textStyle: {
              color: this.chartAxisTextColor,
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: this.chartAxisLineColor,
            },
          },
        },
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
  }

}
