<script
  setup
  lang="ts"
>
  import VChart from 'vue-echarts'

  import { samplingDistributionBarOption } from '../store/Chart'
</script>

<template>
  <v-chart
    class="sampling-distribution-bar"
    :option="samplingDistributionBarOption"
  />
</template>

<style scoped>
  .sampling-distribution-bar {
    width: var(--chart-width);
    height: var(--chart-height);
  }
</style>
