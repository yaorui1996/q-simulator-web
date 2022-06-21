<script
  setup
  lang="ts"
>
  import CommonDropzone from './CommonDropzone.vue'
  import { Gate } from './Gate'
  import { gateDescriptionsBody, gateDescriptionsHead } from './GateDescription'

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
        effect="light"
        placement="bottom"
        :hide-after="10"
        popper-class="tooltip"
      >
        <template #content>
          <div
            class="tooltip-head"
            v-html="gateDescriptionsHead[paletteDropzoneGate.name]"
          ></div>
          <div
            class="tooltip-body"
            v-html="
              gateDescriptionsBody[paletteDropzoneGate.name](
                paletteDropzoneGate.value
              )
            "
          ></div>
        </template>
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
  .tooltip {
    pointer-events: none;
    max-width: 15rem;
    font-family: var(--font-family);
  }
  .tooltip-head {
    font-size: 1rem;
    font-weight: bold;
  }
  .tooltip-body {
    font-size: 0.875rem;
  }
</style>
