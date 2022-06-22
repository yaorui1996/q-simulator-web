<script
  setup
  lang="ts"
>
  import VChart from 'vue-echarts'

  import { probabilityBarOption } from '../store/Chart'
</script>

<template>
  <v-chart
    class="probability-bar"
    :option="probabilityBarOption"
  />
</template>

<style scoped>
  .probability-bar {
    width: var(--chart-width);
    height: var(--chart-height);
  }
</style>
