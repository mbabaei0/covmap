import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { graphic } from 'echarts';

@Component({
  selector: 'cov-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.sass']
})
export class CountryChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges{
  @Input() countryName: string;
  @Input() data: number[];
  @Input() maxValue: number;
  @Input() labels: string[];


  option: any = {};
  echartsInstance;

  chartAxisTextColor = 'red';
  chartAxisLineColor = 'green';
  chartAxisSplitLine = '#839AA8';
  chartInnerLineColor = '#D3EBCD';
  chartLineBottomShadowColor = '#635666';
  chartGradientFrom = '#635666';
  chartGradientTo = '#AEDBCE';


  constructor() { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].isFirstChange()) {
      this.echartsInstance.setOption({
        series: [
          {
            data: this.data.map(v => this.maxValue),
          },
          {
            data: this.data,
          },
          {
            data: this.data,
          },
        ],
      });
    }
  }
  ngAfterViewInit() {
    this.option = Object.assign({}, {
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        axisLabel: {
          color: this.chartAxisTextColor,
          fontSize: 12,
        },
        axisLine: {
          lineStyle: {
            color: this.chartAxisLineColor,
            width: '2',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: this.chartAxisSplitLine,
            width: '1',
          },
        },
      },
      yAxis: {
        data: this.labels,
        axisLabel: {
          color: this.chartAxisTextColor,
          fontSize: 12,
        },
        axisLine: {
          lineStyle: {
            color: this.chartAxisLineColor,
            width: '2',
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        { // For shadow
          type: 'bar',
          data: this.data.map(v => this.maxValue),
          cursor: 'default',
          itemStyle: {
            normal: {
              color: this.chartInnerLineColor,
            },
            opacity: 1,
          },
          barWidth: '40%',
          barGap: '-100%',
          barCategoryGap: '30%',
          animation: false,
          z: 1,
        },
        { // For bottom line
          type: 'bar',
          data: this.data,
          cursor: 'default',
          itemStyle: {
            normal: {
              color: this.chartLineBottomShadowColor,
            },
            opacity: 1,
          },
          barWidth: '40%',
          barGap: '-100%',
          barCategoryGap: '30%',
          z: 2,
        },
        {
          type: 'bar',
          barWidth: '35%',
          data: this.data,
          cursor: 'default',
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: this.chartGradientFrom,
              }, {
                offset: 1,
                color: this.chartGradientTo,
              }]),
            },
          },
          z: 3,
        },
      ],
    });
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }


}
