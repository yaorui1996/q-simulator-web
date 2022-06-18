export enum Display {
  Default,
  Focus,
  Drag,
  Select
}

export enum GateName {
  Null = 'Null',
  Hadamard = 'Hadamard',
  PauliX = 'PauliX',
  PauliY = 'PauliY',
  PauliZ = 'PauliZ',
  S = 'S',
  T = 'T',
  SquareRootX = 'SquareRootX',
  RotationX = 'RotationX',
  RotationY = 'RotationY',
  RotationZ = 'RotationZ',
  Swap = 'Swap',
  Control = 'Control',
  Write = 'Write',
  Measurement = 'Measurement'
}

export const singleBitGates: GateName[] = [
  GateName.Hadamard,
  GateName.PauliX,
  GateName.PauliY,
  GateName.PauliZ,
  GateName.S,
  GateName.T,
  GateName.SquareRootX,
  GateName.RotationX,
  GateName.RotationY,
  GateName.RotationZ
]

export const uncontrollableGates: GateName[] = [
  GateName.Write,
  GateName.Measurement
]

export const valueEditableGates: GateName[] = [
  GateName.RotationX,
  GateName.RotationY,
  GateName.RotationZ
]

export interface Gate {
  // index of register and step, start from 0
  // circuit (0, N); palette (-1, N); blank (-1, -1); undefined (-2, -2)
  step: number
  register: number
  name: GateName
  value: string
  valueValid: boolean
  display: Display
  wireInput: boolean
  wireOutput: boolean
  connectTop: boolean
  connectBottom: boolean
  properPlaced: boolean
}

export function emptyGate(): Gate {
  return {
    step: -2,
    register: -2,
    name: GateName.Null,
    value: '',
    valueValid: true,
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false,
    properPlaced: true
  }
}

export function getGateDropzone(gate: Gate): string {
  if (gate.register == -1) {
    if (gate.step == -1) {
      return 'blank'
    } else if (gate.step >= 0) {
      return 'palette'
    }
  } else if (gate.register >= 0 && gate.step >= 0) {
    return 'circuit'
  }
  return 'undefined'
}

export function isGateInPaletteDropzone(gate: Gate): boolean {
  return getGateDropzone(gate) == 'palette'
}

export function isGateInCircuitDropzone(gate: Gate): boolean {
  return getGateDropzone(gate) == 'circuit'
}

export function isGateInDragDropzone(gate: Gate): boolean {
  return getGateDropzone(gate) == 'blank'
}

export function isGateValid(gate: Gate): boolean {
  return gate.name !== GateName.Null
}

export function isGateSelected(gate: Gate): boolean {
  return gate.display == Display.Select
}

export function setGateDisplay(gate: Gate, display: Display): void {
  Object.assign(gate, { display: display })
}

export function emptyStep(stepIndex: number, registerNum: number): Gate[] {
  const step: Gate[] = []
  for (let i = 0; i < registerNum; i++) {
    step.push({
      step: stepIndex,
      register: i,
      name: GateName.Null,
      value: '',
      valueValid: true,
      display: Display.Default,
      wireInput: false,
      wireOutput: false,
      connectTop: false,
      connectBottom: false,
      properPlaced: true
    })
  }
  return step
}

export function isStepEmpty(stepGates: Gate[]): boolean {
  return stepGates.every((gate) => !isGateValid(gate))
}

export function connectStepGates(
  stepGates: Gate[],
  connectStart: number,
  connectEnd: number
): void {
  for (let i: number = connectStart; i <= connectEnd; i++) {
    if (i > connectStart) {
      stepGates[i].connectTop = true
    }
    if (i < connectEnd) {
      stepGates[i].connectBottom = true
    }
  }
}

export function checkValueValid(gate: Gate): void {
  try {
    eval(gate.value)
    gate.valueValid = true
  } catch (e) {
    gate.valueValid = false
    if (e instanceof SyntaxError) {
    }
  }
}
