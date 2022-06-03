import { reactive } from 'vue'

import {
  Display,
  emptyGate,
  emptyStep,
  Gate,
  GateName,
  isGateValid,
  isStepEmpty,
  uncontrollableGate
} from './Gate'

export const stepMin = 4
export const stepMax = 10
export const registerMin = 3
export const registerMax = 6

export const dragDropzoneGate = reactive<Gate>(emptyGate())
export const paletteGates = reactive<Gate[]>([])
export const circuitGates = reactive<Gate[][]>([])

export function initPalette(): void {
  paletteGates.splice(0, paletteGates.length) // clear paletteGates
  paletteGates.push({
    step: 0,
    register: -1,
    name: GateName.PauliX,
    value: '',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  })
  paletteGates.push({
    step: 1,
    register: -1,
    name: GateName.PauliY,
    value: '',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  })
  paletteGates.push({
    step: 2,
    register: -1,
    name: GateName.Control,
    value: '',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  })
  paletteGates.push({
    step: 3,
    register: -1,
    name: GateName.Write,
    value: '0',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  })
  paletteGates.push({
    step: 4,
    register: -1,
    name: GateName.Write,
    value: '1',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  })
  paletteGates.push({
    step: 5,
    register: -1,
    name: GateName.Measurement,
    value: '',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  })
}

export function initCircuit(): void {
  circuitGates.splice(0, circuitGates.length) // clear circuitGates
  circuitGates.push(emptyStep(0, registerMin)) // set first step
  trimCircuit()
}

export function initDragDropzone(gate: Gate): void {
  Object.assign(dragDropzoneGate, {
    step: -1,
    register: -1,
    name: gate.name,
    value: gate.value,
    display: Display.Drag
  })
}

export function removeDragDropzone(): void {
  Object.assign(dragDropzoneGate, {
    step: -2,
    register: -2
  })
}

export function getStepNum(): number {
  return circuitGates.length
}

export function getRegisterNum(): number {
  return getStepNum() > 0 ? circuitGates[0].length : 0
}

export function appendRegister(): void {
  const i: number = getRegisterNum()
  circuitGates.forEach((stepGates, index) =>
    stepGates.push({
      step: index,
      register: i,
      name: GateName.Null,
      value: '',
      display: Display.Default,
      wireInput: false,
      wireOutput: false,
      connectTop: false,
      connectBottom: false
    })
  )
}

export function removeRegister(): void {
  const lastRegisterGates: Gate[] = circuitGates.map(
    (stepGates) => stepGates[stepGates.length - 1]
  )
  if (lastRegisterGates.every((gate) => !isGateValid(gate))) {
    circuitGates.forEach((stepGates) => stepGates.pop())
  }
}

export function trimRegister(): void {
  while (getRegisterNum() > registerMin) {
    const lastRegisterGates: Gate[] = circuitGates.map(
      (stepGates) => stepGates[stepGates.length - 1]
    )
    if (lastRegisterGates.every((gate) => !isGateValid(gate))) {
      circuitGates.forEach((stepGates) => stepGates.pop())
    } else {
      break
    }
  }
}

export function trimStep(): void {
  // insert empty step from end to start
  for (let i = getStepNum() - 1; i >= 0; i--) {
    if (isStepEmpty(circuitGates[i])) {
      if (getStepNum() > 1) {
        circuitGates.splice(i, 1)
      }
    } else {
      if (i == 0 || !isStepEmpty(circuitGates[i - 1])) {
        circuitGates.splice(i, 0, emptyStep(0, getRegisterNum()))
      } else {
        i--
      }
    }
  }
  // fill step
  if (getStepNum() % 2 == 0) {
    circuitGates.push(emptyStep(0, getRegisterNum()))
  }
  while (getStepNum() < 2 * stepMin + 1) {
    circuitGates.push(emptyStep(0, getRegisterNum()))
  }
}

export function trimCircuit(): void {
  trimRegister()
  trimStep()
  arrangeIndex()
  arrangeWires()
}

export function arrangeIndex(): void {
  for (let i = 0; i < getStepNum(); i++) {
    for (let j = 0; j < getRegisterNum(); j++) {
      Object.assign(circuitGates[i][j], {
        step: i,
        register: j
      })
    }
  }
}

export function arrangeWires(): void {
  if (getRegisterNum() > 0) {
    const wires: boolean[] = Array(getRegisterNum()).fill(false)

    circuitGates.forEach((stepGates) => {
      stepGates.forEach((gate, index) => {
        gate.connectTop = false
        gate.connectBottom = false

        gate.wireInput = wires[index]
        if (gate.name == GateName.Write) {
          wires[index] = true
        } else if (gate.name == GateName.Measurement) {
          wires[index] = false
        }
        gate.wireOutput = wires[index]
      })

      const controlGateTag: string[] = stepGates.map((gate) =>
        gate.name == GateName.Control
          ? 'Control'
          : uncontrollableGate.includes(gate.name)
          ? 'Uncontrollable'
          : 'Controllable'
      )
      const firstControlGate: number = controlGateTag.indexOf('Control')
      if (firstControlGate >= 0) {
        const lastControlGate: number = controlGateTag.lastIndexOf('Control')
        let connectStart: number = firstControlGate
        let connectEnd: number = lastControlGate
        const firstControllableGate: number =
          controlGateTag.indexOf('Controllable')
        if (firstControllableGate >= 0) {
          const lastControllableGate: number =
            controlGateTag.lastIndexOf('Controllable')
          connectStart = Math.min(firstControlGate, firstControllableGate)
          connectEnd = Math.max(lastControlGate, lastControllableGate)
        }
        for (let i: number = connectStart; i <= connectEnd; i++) {
          if (i > connectStart) {
            stepGates[i].connectTop = true
          }
          if (i < connectEnd) {
            stepGates[i].connectBottom = true
          }
        }
      }
    })
  }
}
