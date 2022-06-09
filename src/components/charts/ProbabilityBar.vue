<script
  setup
  lang="ts"
>
  import { EChartsOption } from 'echarts'
  import { ref } from 'vue'
  import VChart from 'vue-echarts'

  const props = defineProps<{
    stateVectorsName: string[]
    probability: string[]
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
        data: props.stateVectorsName
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
        data: props.probability
      }
    ],
    toolbox: {
      show: true,
      feature: {
        dataView: {
          readOnly: true
        },
        saveAsImage: {}
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
