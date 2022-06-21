<script
  setup
  lang="ts"
>
  import { ref } from 'vue'

  import {
    checkValueValid,
    Display,
    emptyGate,
    Gate,
    GateName,
    valueEditableGates
  } from './Gate'
  import EditorDelete from './icons/EditorDelete.vue'
  import {
    arrangeWires,
    getMaxSwapIndex,
    getSwapGatePartner,
    trimCircuit
  } from './store/Circuit'

  const props = defineProps<{ gate: Gate }>()

  const inputFront = ref<string>('π·')
  const focus = ref<boolean>(false)
  const del = ref<boolean>(false)

  function onChange(): void {
    checkValueValid(props.gate)
    arrangeWires()
  }

  function onClick(): void {
    if (
      props.gate.name == GateName.Swap &&
      props.gate.swapIndex < getMaxSwapIndex()
    ) {
      Object.assign(getSwapGatePartner(props.gate) ?? emptyGate(), emptyGate())
    }
    Object.assign(props.gate, {
      name: GateName.Null,
      value: '',
      display: Display.Default
    })
    trimCircuit()
  }
</script>

<template>
  <div class="gate-editor">
    <div class="gate-editor-text">
      <input
        class="input-front"
        type="text"
        :value="inputFront"
        disabled
      />
      <div
        class="input-container"
        v-if="valueEditableGates.includes(gate.name)"
      >
        <span>{{ 'a' + gate.value + 'a' }}</span>
        <input
          class="input-value"
          type="text"
          v-model="gate.value"
          @change="onChange()"
          @mouseover="focus = true"
          @mouseout="focus = false"
          @mousedown.stop=""
          @mouseup.stop=""
        />
      </div>
    </div>
    <div
      class="gate-editor-delete"
      @mouseover="del = true"
      @mouseout="del = false"
      @mousedown.stop=""
      @mouseup.stop=""
      @click="onClick()"
    >
      <EditorDelete />
    </div>
  </div>
</template>

<style scoped>
  .gate-editor {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .gate-editor-text {
    visibility: v-bind(
      "valueEditableGates.includes(gate.name) ? 'visible' : 'hidden'"
    );
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.625rem 0.5rem 0.625rem;
    background-color: var(--gate-editor-background-color-white);
    border-radius: 0.75rem;
    filter: drop-shadow(rgba(0, 0, 0, 0.04) 0px 10px 8px)
      drop-shadow(rgba(0, 0, 0, 0.1) 0px 4px 3px);
  }
  .input-front {
    width: 1rem;
    height: 1.25rem;
    position: relative;
    padding: 0.25rem 0 0.25rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--gate-editor-background-color-white);
    border: none;
    border-radius: 0.25rem;
    outline: none;
    text-align: center;
    font-size: var(--gate-editor-font-size);
    font-family: var(--gate-editor-font-family);
    color: var(--gate-editor-text-color-black);
  }

  .input-container {
    height: 1.25rem;
    position: relative;
    padding: 0.25rem 0.25rem 0.25rem 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: inline-block;
    visibility: hidden;
    min-width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--gate-editor-font-size);
  }

  .input-value {
    width: 100%;
    height: 100%;
    display: inline-block;
    position: absolute;
    color: var(--gate-editor-text-color-black);
    border: none;
    border-radius: 0.25rem;
    outline: none;
    text-align: center;
    font-size: var(--gate-editor-font-size);
    font-family: var(--gate-editor-font-family);
    background-color: v-bind(
      "focus ? 'var(--gate-editor-text-background-color-gray)' : 'none'"
    );
  }
  .gate-editor-delete {
    width: 1rem;
    height: 1rem;
    margin: 0 0 0 0.25rem;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    border-radius: 9999rem;
    color: var(--gate-editor-text-color-black);
    background-color: v-bind(
      "del ? 'var(--gate-editor-delete-background-color-pink)' : 'var(--gate-editor-background-color-white)'"
    );
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
