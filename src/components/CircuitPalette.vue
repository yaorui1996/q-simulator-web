<script
  setup
  lang="ts"
>
  import CommonDropzone from './CommonDropzone.vue'
  import { Gate } from './Gate'
  import { gateDescriptions } from './GateDescription'

  defineProps<{ paletteGates: Gate[] }>()
</script>

<template>
  <div class="circuit-palette">
    <div
      class="palette-dropzone-container"
      v-for="(paletteDropzoneGate, index) in paletteGates"
      :key="index"
    >
      <el-tooltip
        effect="dark"
        :content="gateDescriptions[paletteDropzoneGate.name]"
        placement="top-start"
        transition="el-fade-in-linear"
        :hide-after="10"
        popper-class="tip-class"
      >
        <CommonDropzone :gate="paletteDropzoneGate" />
      </el-tooltip>
    </div>
  </div>
</template>

<style>
  .circuit-palette {
    margin: var(--palette-margin);
    border-radius: var(--palette-border-radius);
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
      drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    padding: var(--palette-padding);
    width: fit-content;
    background: var(--palette-background-color-white);
    display: flex;
    flex-direction: row;
  }
  .palette-dropzone-container {
    margin: var(--palette-dropzone-container-margin);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tip-class {
    font-size: 0.75rem;
    max-width: 15rem;
  }
</style>
