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

export const gateDescriptionsBody: {
  [key in GateName]: (value?: string) => string
} = {
  [GateName.Null]: () => '',
  [GateName.Hadamard]: () => 'Rotate the states |0⟩ and |1⟩ to |+⟩ and |-⟩.',
  [GateName.PauliX]: () => '',
  [GateName.PauliY]: () => '',
  [GateName.PauliZ]: () => '',
  [GateName.S]: () => 'Apply a phase of e<sup>iπ/2</sup> to the |1⟩ state.',
  [GateName.T]: () => 'Apply a phase of e<sup>iπ/4</sup> to the |1⟩ state.',
  [GateName.SquareRootX]: () => '',
  [GateName.RotationX]: () => 'Rotate around the X-axis by the given angle.',
  [GateName.RotationY]: () => 'Rotate around the Y-axis by the given angle.',
  [GateName.RotationZ]: () => 'Rotate around the Z-axis by the given angle.',
  [GateName.Swap]: () => 'Swap the states of two qubits.',
  [GateName.Control]: () =>
    'Perform the gate on target qubits if the control qubits are in |1⟩.',
  [GateName.Write]: (value: string | undefined) =>
    `(Re)set the qubit to state |${value}⟩.`,
  [GateName.Measurement]: () => 'Perform a measurement in the Z basis.'
}
