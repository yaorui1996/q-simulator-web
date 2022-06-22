<script
  setup
  lang="ts"
>
  import VChart from 'vue-echarts'

  import { stateVectorBarOption } from '../store/Chart'
</script>

<template>
  <v-chart
    class="state-vector-bar"
    :option="stateVectorBarOption"
  />
</template>

<style scoped>
  .state-vector-bar {
    width: var(--chart-width);
    height: var(--chart-height);
  }
</style>
