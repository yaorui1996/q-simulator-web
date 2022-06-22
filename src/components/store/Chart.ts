import { EChartsOption } from 'echarts'
import { ExportToCsv } from 'export-to-csv'
import { reactive } from 'vue'

import { resetArray } from '../utils/Array'
import { getStateFullName } from '../utils/String'
import { circuitGates, getRegisterNum, stepSelect } from './Circuit'
import { computation } from './Computation'

export const stateVectorBarOption = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      color: '#000000',
      fontWeight: 'bold'
    },
    valueFormatter: (value: string) => Number(value).toFixed(3)
  },
  legend: {
    data: ['Re', 'Im']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: true
    },
    axisLabel: {
      show: true,
      color: '#000000',
      fontWeight: 'bold',
      interval: 0,
      rotate: 90
    },
    data: []
  },
  yAxis: {
    type: 'value',
    min: -1,
    max: 1,
    interval: 0.25
  },
  series: [
    {
      name: 'Re',
      type: 'bar',
      label: {
        show: false,
        position: 'inside'
      },
      data: []
    },
    {
      name: 'Im',
      type: 'bar',
      label: {
        show: false,
        position: 'inside'
      },
      data: []
    }
  ],
  toolbox: {
    show: true,
    feature: {
      dataView: {
        readOnly: true,
        optionToContent: function (opt: any): string {
          let axisData = opt.xAxis[0].data
          let series = opt.series
          let table =
            '<table border="1" cellspacing="0" cellpadding="2" style="width:100%;text-align:center">' +
            '<thead><tr>' +
            '<th width="20%">State</th>' +
            `<th>${series[0].name}</th>` +
            `<th>${series[1].name}</th>` +
            '</tr></thead><tbody>'
          for (let i: number = 0; i < axisData.length; i++) {
            table +=
              '<tr>' +
              `<td>${axisData[i]}</td>` +
              `<td>${series[0].data[i]}</td>` +
              `<td>${series[1].data[i]}</td>` +
              '</tr>'
          }
          table += '</tbody></table>'
          return table
        }
      },
      mySaveAsExcel: {
        show: true,
        title: 'Save As Excel',
        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
        onclick: function () {
          saveAsExcel('StateVector')
        }
      }
    }
  },
  color: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ]
})

export const probabilityBarOption = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      color: '#000000',
      fontWeight: 'bold'
    },
    valueFormatter: (value: string) => Number(value).toFixed(3)
  },
  legend: {
    data: ['p']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: true
    },
    axisLabel: {
      show: true,
      color: '#000000',
      fontWeight: 'bold',
      interval: 0,
      rotate: 90
    },
    data: []
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 1,
    interval: 0.25
  },
  series: [
    {
      name: 'p',
      type: 'bar',
      label: {
        show: false,
        position: 'inside'
      },
      data: []
    }
  ],
  toolbox: {
    show: true,
    feature: {
      dataView: {
        readOnly: true,
        optionToContent: function (opt: any): string {
          let axisData = opt.xAxis[0].data
          let series = opt.series
          let table =
            '<table border="1" cellspacing="0" cellpadding="2" style="width:100%;text-align:center">' +
            '<thead><tr>' +
            '<th width="20%">State</th>' +
            `<th>${series[0].name}</th>` +
            '</tr></thead><tbody>'
          for (let i: number = 0; i < axisData.length; i++) {
            table +=
              '<tr>' +
              `<td>${axisData[i]}</td>` +
              `<td>${series[0].data[i]}</td>` +
              '</tr>'
          }
          table += '</tbody></table>'
          return table
        }
      },
      mySaveAsExcel: {
        show: true,
        title: 'Save As Excel',
        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
        onclick: function () {
          saveAsExcel('Probability')
        }
      }
    }
  },
  color: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ]
})

export function saveAsExcel(term: string) {
  function getStateVector(): {
    state: string
    real: number
    imaginary: number
  }[] {
    return stateVectorBarOption.xAxis.data.map((_, index) => ({
      state: stateVectorBarOption.xAxis.data[index],
      real: stateVectorBarOption.series[0].data[index],
      imaginary: stateVectorBarOption.series[1].data[index]
    }))
  }

  function getProbability(): {
    state: string
    probability: number
  }[] {
    return probabilityBarOption.xAxis.data.map((_, index) => ({
      state: probabilityBarOption.xAxis.data[index],
      probability: probabilityBarOption.series[0].data[index]
    }))
  }

  const options = {
    fieldSeparator: ',',
    filename: '',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true
  }

  if (term == 'StateVector') {
    new ExportToCsv(
      Object.assign(options, { filename: 'StateVecotr' })
    ).generateCsv(getStateVector())
  } else if (term == 'Probability') {
    new ExportToCsv(
      Object.assign(options, { filename: 'Probability' })
    ).generateCsv(getProbability())
  }
}

export function changeChartDataToStepSelectStateVector(): void {
  if (
    computation.circuit == JSON.stringify(circuitGates) &&
    computation.samples.length > 0 &&
    computation.samples[0].stateVectors.length > 0
  ) {
    const stateNames: string[] = Array(Math.pow(2, getRegisterNum()))
      .fill('')
      .map((_, index) =>
        getStateFullName(index.toString(2).padStart(getRegisterNum(), '0'))
      )

    resetArray(stateVectorBarOption.xAxis.data, stateNames)
    resetArray(
      stateVectorBarOption.series[0].data,
      computation.samples[0].stateVectors[(stepSelect.value - 1) / 2].realParts
    )
    resetArray(
      stateVectorBarOption.series[1].data,
      computation.samples[0].stateVectors[(stepSelect.value - 1) / 2]
        .imaginaryParts
    )
    stateVectorBarOption.xAxis.axisLabel.show = getRegisterNum() <= 5
    resetArray(probabilityBarOption.xAxis.data, stateNames)
    resetArray(
      probabilityBarOption.series[0].data,
      computation.samples[0].stateVectors[(stepSelect.value - 1) / 2]
        .probabilities
    )
    probabilityBarOption.xAxis.axisLabel.show = getRegisterNum() <= 5
  }
}
