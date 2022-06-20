import { GateName } from './Gate'

export const gateDescriptions: { [key in GateName]: string } = {
  [GateName.Null]: 'Null Gate',
  [GateName.Hadamard]:
    'Hadamard Gate,  rotate the states |0⟩ and |1⟩ to |+⟩ and |-⟩',
  [GateName.PauliX]:
    'Pauli-X Gate, rotate the qubit state around the x axis by π radians.',
  [GateName.PauliY]:
    'Pauli-Y Gate, rotate the qubit state around the y axis by π radians.',
  [GateName.PauliZ]:
    'Pauli-Z Gate, rotate the qubit state around the z axis by π radians.',
  [GateName.S]: 'S Gate, apply a phase of π/2 to the |1⟩ state',
  [GateName.T]: 'T Gate, apply a phase of π/4 to the |1⟩ state',
  [GateName.SquareRootX]:
    'Square Root of NOT Gate, rotate the qubit state around the x axis by π/2 radians.',
  [GateName.RotationX]:
    'Rotation X Gate, rotate the qubit state around the x axis by the given angle.',
  [GateName.RotationY]:
    'Rotation Y Gate, rotate the qubit state around the y axis by the given angle.',
  [GateName.RotationZ]:
    'Rotation Z Gate, rotate the qubit state around the z axis by the given angle.',
  [GateName.Swap]: 'Swap Gate, swap the states of two qubits.',
  [GateName.Control]:
    'Control Gate, perform a Gate on the target whenever the control is in state |1⟩',
  [GateName.Write]: 'Reset Operation, (Re)set a qubit to state |0⟩ or |1⟩',
  [GateName.Measurement]: 'Measurement Gate, measure in the z basis.'
}
