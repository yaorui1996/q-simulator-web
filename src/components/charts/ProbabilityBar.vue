<script
  setup
  lang="ts"
>
  import { EChartsOption } from 'echarts'
  import { ref } from 'vue'
  import VChart from 'vue-echarts'

  import { saveAsExcel } from '../store/State'

  const props = defineProps<{
    fullNames: string[]
    probabilities: string[]
  }>()

  const option = ref<EChartsOption>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        color: '#000000',
        fontWeight: 'bold'
      }
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
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#000000',
          fontWeight: 'bold'
        },
        data: props.fullNames
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 1,
        interval: 0.25
      }
    ],
    series: [
      {
        name: 'p',
        type: 'bar',
        label: {
          show: false,
          position: 'inside'
        },
        data: props.probabilities
      }
    ],
    toolbox: {
      show: true,
      feature: {
        dataView: {
          readOnly: true
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
</script>

<template>
  <v-chart
    class="probability-bar"
    :option="option"
  />
</template>

<style scoped>
  .probability-bar {
    width: var(--chart-width);
    height: var(--chart-height);
  }
</style>
