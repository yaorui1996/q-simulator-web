import { GateName } from './Gate'

export const gateDescriptionsHead: { [key in GateName]: string } = {
  [GateName.Null]: 'Null Gate',
  [GateName.Hadamard]: 'Hadamard Gate',
  [GateName.PauliX]: 'Pauli-X Gate',
  [GateName.PauliY]: 'Pauli-Y Gate',
  [GateName.PauliZ]: 'Pauli-Z Gate',
  [GateName.S]: 'S Gate',
  [GateName.T]: 'T Gate',
  [GateName.SquareRootX]: 'Square Root of NOT Gate',
  [GateName.RotationX]: 'Rotation X Gate',
  [GateName.RotationY]: 'Rotation Y Gate',
  [GateName.RotationZ]: 'Rotation Z Gate',
  [GateName.Swap]: 'Swap Gate',
  [GateName.Control]: 'Control Gate',
  [GateName.Write]: 'Reset Operation',
  [GateName.Measurement]: 'Measurement Gate'
}

export const gateDescriptionsBody: { [key in GateName]: string } = {
  [GateName.Null]: '',
  [GateName.Hadamard]: 'Rotates the states |0⟩ and |1⟩ to |+⟩ and |-⟩.',
  [GateName.PauliX]: 'Rotates around the X-axis by π radians.',
  [GateName.PauliY]: 'Rotates around the Y-axis by π radians.',
  [GateName.PauliZ]: 'Rotates around the Z-axis by π radians.',
  [GateName.S]: 'Applies a phase of e<sup>iπ/2</sup> to the |1⟩ state.',
  [GateName.T]: 'Applies a phase of e<sup>iπ/4</sup> to the |1⟩ state.',
  [GateName.SquareRootX]: 'Rotates around the X-axis by π/2 radians.',
  [GateName.RotationX]: 'Rotates around the X-axis by the given angle.',
  [GateName.RotationY]: 'Rotates around the Y-axis by the given angle.',
  [GateName.RotationZ]: 'Rotates around the Z-axis by the given angle.',
  [GateName.Swap]: 'Swap the states of two qubits.',
  [GateName.Control]:
    'Performs the gate on the target if the control is in state |1⟩.',
  [GateName.Write]: '(Re)sets the qubit to state |0⟩ or |1⟩.',
  [GateName.Measurement]: 'Performs a measurement in the Z basis.'
}
