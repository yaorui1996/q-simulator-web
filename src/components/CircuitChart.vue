<script
  setup
  lang="ts"
>
  import { reactive, ref } from 'vue'
  import vSelect from 'vue-select'

  import ProbabilityBar from './charts/ProbabilityBar.vue'
  import StateVectorBar from './charts/StateVectorBar.vue'
  import { states } from './store/State'

  const options = reactive<string[]>(['State Vector', 'Probability'])
  const selected = ref<string>('State Vector')
</script>

<template>
  <div class="circuit-chart">
    <v-select
      class="select-chart"
      v-model="selected"
      :clearable="false"
      :options="options"
    />
    <StateVectorBar
      class="state-vector-bar"
      v-if="selected == 'State Vector'"
      :full-names="states.fullNames"
      :vectors-re="states.vectorsRe"
      :vectors-im="states.vectorsIm"
    />
    <ProbabilityBar
      class="state-vector-bar"
      v-if="selected == 'Probability'"
      :full-names="states.fullNames"
      :probabilities="states.probabilities"
    />
  </div>
</template>

<style scoped>
  .circuit-chart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 0 0.625rem 0;
    padding: 1rem 0.625rem 1rem 0.625rem;
    border-radius: 0.75rem;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
      drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    background: var(--circuit-chart-background-color-white);
  }
  .select-chart {
    margin: 0 0.625rem 1.5rem 0.625rem;
    width: 40%;
    --vs-border-radius: 0.375rem;
    --vs-border-color: rgba(60, 60, 60, 0.1);
    font-weight: bold;
    font-family: var(--font-family);
  }
</style>
