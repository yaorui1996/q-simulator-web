<script
  setup
  lang="ts"
>
  import { reactive, ref } from 'vue'
  import vSelect from 'vue-select'

  import StateVectorBar from './charts/StateVectorBar.vue'
  import ProbabilityBar from './charts/ProbabilityBar.vue'

  import {
    registerNum,
    stateNum,
    stateVectorsName,
    stateVectorsRe,
    stateVectorsIm,
    probability,
  } from './Store'

  for (let i = 0; i < stateNum; i++) {
    stateVectorsName[i] = '|' + i.toString(2).padStart(registerNum, '0') + '⟩'
    let phi: number = Math.random() * Math.PI * 2
    stateVectorsRe[i] = ((1 / Math.sqrt(stateNum)) * Math.cos(phi)).toFixed(3)
    stateVectorsIm[i] = ((1 / Math.sqrt(stateNum)) * Math.sin(phi)).toFixed(3)
    probability[i] = (1 / Math.sqrt(stateNum)).toFixed(3)
  }

  const options = reactive<string[]>(['State Vector Bar', 'Probability Bar'])
  const selected = ref<string>('State Vector Bar')
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
      v-if="selected == 'State Vector Bar'"
      :state-vectors-name="stateVectorsName"
      :state-vectors-re="stateVectorsRe"
      :state-vectors-im="stateVectorsIm"
    />
    <ProbabilityBar
      class="state-vector-bar"
      v-if="selected == 'Probability Bar'"
      :state-vectors-name="stateVectorsName"
      :probability="probability"
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
    width: 50%;
    --vs-border-radius: 0.375rem;
    --vs-border-color: rgba(60, 60, 60, 0.1);
    font-weight: bold;
    font-family: var(--font-family);
  }
</style>
