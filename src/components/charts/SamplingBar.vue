<script
  setup
  lang="ts"
>
  import VChart from 'vue-echarts'

  import { samplingBarOption } from '../store/Chart'
</script>

<template>
  <v-chart
    class="sampling-bar"
    :option="samplingBarOption"
  />
</template>

<style scoped>
  .sampling-bar {
    width: var(--chart-width);
    height: var(--chart-height);
  }
</style>
