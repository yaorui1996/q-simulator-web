import { reactive, ref } from 'vue'

import {
  checkValueValid,
  connectStepGates,
  Display,
  emptyGate,
  emptyStep,
  Gate,
  GateName,
  isGateValid,
  isStepEmpty,
  uncontrollableGates,
  valueEditableGates
} from '../Gate.js'

export const stepMin = 4
export const stepMax = 10
export const registerMin = 1
export const registerMax = 6
export const dragDropzonePos = reactive<{ left: number; top: number }>({
  left: 0,
  top: 0
})
export const dragDropzoneGate = reactive<Gate>(emptyGate())
export const paletteGates = reactive<Gate[]>([])
export const circuitGates = reactive<Gate[][]>([])
export const checkingCircuitGatesError = ref<boolean>(false)
export const stepFocus = ref<number>(0)
export const stepSelect = ref<number>(0)

export function initPalette(): void {
  paletteGates.splice(0, paletteGates.length) // clear paletteGates
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 0,
      register: -1,
      name: GateName.Hadamard
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 1,
      register: -1,
      name: GateName.PauliX
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 2,
      register: -1,
      name: GateName.PauliY
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 3,
      register: -1,
      name: GateName.PauliZ
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 4,
      register: -1,
      name: GateName.S
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 5,
      register: -1,
      name: GateName.T
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 6,
      register: -1,
      name: GateName.SquareRootX
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 7,
      register: -1,
      name: GateName.RotationX,
      value: '1/2'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 8,
      register: -1,
      name: GateName.RotationY,
      value: '1/2'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 9,
      register: -1,
      name: GateName.RotationZ,
      value: '1/2'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 10,
      register: -1,
      name: GateName.Swap,
      value: '1'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 11,
      register: -1,
      name: GateName.Control,
      value: '1'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 12,
      register: -1,
      name: GateName.Write,
      value: '0'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 13,
      register: -1,
      name: GateName.Write,
      value: '1'
    })
  )
  paletteGates.push(
    Object.assign(emptyGate(), {
      step: 14,
      register: -1,
      name: GateName.Measurement
    })
  )
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
  if (gate.name == GateName.Swap) {
    Object.assign(dragDropzoneGate, {
      swapIndex: gate.swapIndex == 0 ? getMaxSwapIndex() + 1 : gate.swapIndex
    })
    Object.assign(getSwapGatePartner(dragDropzoneGate) ?? emptyGate(), {
      display: Display.Drag
    })
  }
}

export function removeDragDropzone(): void {
  Object.assign(dragDropzoneGate, emptyGate())
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
    stepGates.push(
      Object.assign(emptyGate(), {
        step: index,
        register: i,
        name: index == 0 ? GateName.Write : GateName.Null,
        value: index == 0 ? '0' : ''
      })
    )
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
    const lastRegisterGates: Gate[] = circuitGates
      .slice(1, getStepNum() - 1)
      .map((stepGates) => stepGates[stepGates.length - 1])
    if (lastRegisterGates.every((gate) => !isGateValid(gate))) {
      circuitGates.forEach((stepGates) => stepGates.pop())
    } else {
      break
    }
  }
}

export function trimStep(): void {
  // insert empty step from end to start
  for (let i: number = getStepNum() - 1; i > 0; i--) {
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
  if (getStepNum() % 2 == 1) {
    circuitGates.push(emptyStep(0, getRegisterNum()))
  }
  while (getStepNum() < 2 * stepMin) {
    circuitGates.push(emptyStep(0, getRegisterNum()))
  }
}

export function trimCircuit(): void {
  checkAllValueValid()
  trimStep()
  initCircuitWith0()
  trimRegister()
  arrangeIndex()
  arrangeWires()
  checkAllProperPlaced()
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
  const wires: boolean[] = Array(getRegisterNum()).fill(false)

  // disconnect all gate
  circuitGates.flat().forEach((gate) => {
    gate.connectTop = false
    gate.connectBottom = false
  })

  // connect swap gate
  arrangeSwapIndex()
  const swapGates: Gate[] = circuitGates
    .flat()
    .filter((gate) => gate.name == GateName.Swap)
  swapGates.forEach((gate) => (gate.value = '0'))
  for (let i = 1; i < getMaxSwapIndex(); i += 2) {
    let swapGate1: Gate = swapGates.find((gate) => gate.swapIndex == i)!
    let swapGate2: Gate = swapGates.find((gate) => gate.swapIndex == i + 1)!
    if (swapGate1.register > swapGate2.register) {
      const swapGateTemp: Gate = swapGate1
      swapGate1 = swapGate2
      swapGate2 = swapGateTemp
    }
    if (swapGate1.step == swapGate2.step) {
      if (
        circuitGates[swapGate1.step]
          .slice(swapGate1.register, swapGate2.register + 1)
          .every((gate) => !gate.connectTop && !gate.connectBottom)
      ) {
        swapGate1.value = '1'
        swapGate2.value = '1'
        connectStepGates(
          circuitGates[swapGate1.step],
          swapGate1.register,
          swapGate2.register
        )
      }
    }
  }

  circuitGates.forEach((stepGates) => {
    // set wire input and output
    stepGates.forEach((gate, index) => {
      gate.wireInput = wires[index]
      if (gate.name == GateName.Write) {
        wires[index] = true
      } else if (gate.name == GateName.Measurement) {
        wires[index] = false
      }
      gate.wireOutput = wires[index]
    })

    // classify gate by controllable
    const gateControllableTag: string[] = stepGates.map((gate) =>
      gate.name == GateName.Control
        ? 'Control'
        : uncontrollableGates.includes(gate.name) ||
          gate.name == GateName.Null ||
          (gate.name == GateName.Swap && gate.value == '0') ||
          (valueEditableGates.includes(gate.name) && !gate.valueValid)
        ? 'Uncontrollable'
        : 'Controllable'
    )

    // connect control gate
    if (
      gateControllableTag.includes('Control') &&
      gateControllableTag.includes('Controllable')
    ) {
      stepGates
        .filter((gate) => gate.name == GateName.Control)
        .forEach((gate) => (gate.value = '1'))
      const connectStart = Math.min(
        gateControllableTag.indexOf('Control'),
        gateControllableTag.indexOf('Controllable')
      )
      const connectEnd = Math.max(
        gateControllableTag.lastIndexOf('Control'),
        gateControllableTag.lastIndexOf('Controllable')
      )
      connectStepGates(stepGates, connectStart, connectEnd)
    } else {
      stepGates
        .filter((gate) => gate.name == GateName.Control)
        .forEach((gate) => (gate.value = '0'))
    }
  })
}

export function checkAllValueValid(): void {
  circuitGates
    .flat()
    .filter((gate) => valueEditableGates.includes(gate.name))
    .forEach((gate) => {
      checkValueValid(gate)
    })
}

export function checkAllProperPlaced(): void {
  circuitGates.forEach((stepGates) => {
    const isControlInStep: boolean = stepGates.some(
      (gate) => gate.name == GateName.Control
    )
    stepGates
      .filter((gate) => uncontrollableGates.includes(gate.name))
      .forEach((gate) => {
        gate.properPlaced = !(
          isControlInStep &&
          (gate.connectTop || gate.connectBottom)
        )
      })
  })
}

export function getMaxSwapIndex(): number {
  const swapIndices: number[] = circuitGates
    .flat()
    .filter((gate) => gate.name == GateName.Swap)
    .map((gate) => gate.swapIndex)
  return swapIndices.length > 0 ? Math.max(...swapIndices) : 0
}

export function getMinSwapIndex(): number {
  const swapIndices: number[] = circuitGates
    .flat()
    .filter((gate) => gate.name == GateName.Swap)
    .map((gate) => gate.swapIndex)
  return swapIndices.length > 0 ? Math.min(...swapIndices) : 0
}

export function getSwapGatePartner(swapGate: Gate): Gate | undefined {
  return circuitGates
    .flat()
    .find(
      (gate) =>
        gate.swapIndex ==
        (swapGate.swapIndex % 2 == 0
          ? swapGate.swapIndex - 1
          : swapGate.swapIndex + 1)
    )
}

export function arrangeSwapIndex(): void {
  const swapGates: Gate[] = circuitGates
    .flat()
    .filter((gate) => gate.name == GateName.Swap)
  if (swapGates.length < getMaxSwapIndex()) {
    swapGates
      .sort((gate1, gate2) => gate1.swapIndex - gate2.swapIndex)
      .forEach((gate, index) => (gate.swapIndex = index + 1))
  }
}

export function getCircuitGatesErrorNum(): number {
  return circuitGates
    .flat()
    .filter(
      (gate) =>
        ([GateName.Control, GateName.Swap].includes(gate.name) &&
          gate.value == '0') ||
        (uncontrollableGates.includes(gate.name) && !gate.properPlaced) ||
        (valueEditableGates.includes(gate.name) && !gate.valueValid)
    ).length
}

export function initCircuitWith0(): void {
  console.log('!!!')
  circuitGates[0].forEach((gate) => {
    Object.assign(gate, { name: GateName.Write, value: '0' })
  })
}
