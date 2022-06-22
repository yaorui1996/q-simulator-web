export enum Display {
  Default,
  Focus,
  Drag,
  Select,
  Error
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

export const valueEditableGates: GateName[] = [
  GateName.RotationX,
  GateName.RotationY,
  GateName.RotationZ
]

export const uncontrollableGates: GateName[] = [
  GateName.Write,
  GateName.Measurement
]

export interface Gate {
  // index of register and step, start from 0
  // circuit (0, N); palette (-1, N); blank (-1, -1); undefined (-2, -2)
  step: number
  register: number
  name: GateName
  value: string
  valueValid: boolean
  swapIndex: number
  properPlaced: boolean
  display: Display
  wireInput: boolean
  wireOutput: boolean
  connectTop: boolean
  connectBottom: boolean
}

export function emptyGate(): Gate {
  return {
    step: -2,
    register: -2,
    name: GateName.Null,
    value: '',
    valueValid: true,
    swapIndex: 0,
    properPlaced: true,
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
  }
}

export function isGateInPaletteDropzone(gate: Gate): boolean {
  return gate.register == -1 && gate.step >= 0
}

export function isGateInCircuitDropzone(gate: Gate): boolean {
  return gate.register >= 0 && gate.step >= 0
}

export function isGateInDragDropzone(gate: Gate): boolean {
  return gate.register == -1 && gate.step == -1
}

export function isGateValid(gate: Gate): boolean {
  return gate.name !== GateName.Null
}

export function isGateSelected(gate: Gate): boolean {
  return gate.display == Display.Select
}

export function emptyStep(stepIndex: number, registerNum: number): Gate[] {
  return Array(registerNum)
    .fill(null)
    .map((_, index) =>
      Object.assign(emptyGate(), { step: stepIndex, register: index })
    )
}

export function isStepEmpty(stepGates: Gate[]): boolean {
  return stepGates.every((gate) => !isGateValid(gate))
}

export function connectStepGates(
  stepGates: Gate[],
  connectStart: number,
  connectEnd: number
): void {
  stepGates
    .filter((_, index) => index > connectStart && index <= connectEnd)
    .forEach((gate) => (gate.connectTop = true))
  stepGates
    .filter((_, index) => index >= connectStart && index < connectEnd)
    .forEach((gate) => (gate.connectBottom = true))
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
