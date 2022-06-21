import { Gate, GateName, singleBitGates, valueEditableGates } from '../Gate'
import { circuitGates } from '../store/Circuit'

interface Qubit {
  name: string
}

interface Operation {
  gate?: { name: string; parameter: string }
  name?: string
  parameter?: string
  qubits: Qubit[]
}

interface Circuit {
  qubits: Qubit[]
  moments: Operation[][]
}

export function getEncodedCircuit(): Circuit {
  const circuit: Circuit = {
    qubits: [],
    moments: []
  }

  circuitGates[0].forEach((gate) => {
    circuit.qubits.push({
      name: `q${gate.register}`
    })
  })

  circuitGates
    .filter((_, index) => index % 2 == 1)
    .forEach((stepGates) => {
      const moment: Operation[] = []

      stepGates
        .filter((gate) => singleBitGates.includes(gate.name))
        .forEach((gate) => {
          if (!valueEditableGates.includes(gate.name)) {
            moment.push({
              gate: { name: gate.name, parameter: gate.value },
              qubits: [circuit.qubits[gate.register]]
            })
          } else if (gate.valueValid) {
            moment.push({
              gate: {
                name: gate.name,
                parameter: (Math.PI * eval(gate.value)).toString()
              },
              qubits: [circuit.qubits[gate.register]]
            })
          }
        })

      stepGates
        .filter(
          (gate) =>
            [GateName.Write, GateName.Measurement].includes(gate.name) &&
            gate.properPlaced
        )
        .forEach((gate) =>
          moment.push({
            name: gate.name,
            parameter: gate.value,
            qubits: [circuit.qubits[gate.register]]
          })
        )

      const swapGates: Gate[] = stepGates
        .filter((gate) => gate.name == GateName.Swap && gate.value == '1')
        .sort((gate1, gate2) => gate1.swapIndex - gate2.swapIndex)
      for (let i: number = 0; i < swapGates.length; i += 2) {
        moment.push({
          gate: { name: GateName.Swap, parameter: '1' },
          qubits: [
            circuit.qubits[swapGates[i].register],
            circuit.qubits[swapGates[i + 1].register]
          ]
        })
      }

      stepGates
        .filter((gate) => gate.name == GateName.Control && gate.value == '1')
        .reverse()
        .forEach((gate) =>
          moment
            .filter((operation) => 'gate' in operation)
            .forEach((operation) => {
              operation.gate!.name = '@'.concat(operation.gate!.name)
              operation.qubits.unshift(circuit.qubits[gate.register])
            })
        )

      circuit.moments.push(moment)
    })

  return circuit
}
