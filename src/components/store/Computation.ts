import { GateName } from '../Gate'
import { circuitGates, getRegisterNum, getStepNum } from './Circuit'

export interface StateVector {
  realParts: number[]
  imaginaryParts: number[]
  probabilities: number[]
}

export interface Measurement {
  step: number
  register: number
  value: number
}

export interface Sample {
  stateVectors: StateVector[]
  measurements: Measurement[]
}

export interface Computation {
  circuit: string
  samples: Sample[]
}

export const computation: Computation = { circuit: '', samples: [] }

export function sampleCircuit(sampleNum: number, stateVector: boolean): void {
  computation.circuit = JSON.stringify(circuitGates)
  computation.samples.splice(0, computation.samples.length)
  computation.samples.push({
    stateVectors: [],
    measurements: []
  })
  for (let i: number = 0; i < (getStepNum() - 1) / 2; i++) {
    const state: StateVector = {
      realParts: [],
      imaginaryParts: [],
      probabilities: []
    }
    const registerNum = getRegisterNum()
    const stateNum = Math.pow(2, registerNum)
    for (let j = 0; j < stateNum; j++) {
      const phi: number = Math.random() * Math.PI * 2
      state.realParts.push((1 / Math.sqrt(stateNum)) * Math.cos(phi))
      state.imaginaryParts.push((1 / Math.sqrt(stateNum)) * Math.sin(phi))
      state.probabilities.push(1 / Math.sqrt(stateNum))
    }
    computation.samples[0].stateVectors.push(state)
  }
  circuitGates.forEach((stepGates) =>
    stepGates.forEach((gate) => {
      if (gate.name == GateName.Measurement) {
        const measurement: Measurement = {
          step: (gate.step - 1) / 2,
          register: gate.register,
          value: Math.random() > 0.5 ? 1 : 0
        }
        computation.samples[0].measurements.push(measurement)
      }
    })
  )
}

export function updateCircuitMeasurement(measurements: Measurement[]) {
  measurements.forEach((measurement) => {
    if (
      measurement.step >= 0 &&
      measurement.step < (getStepNum() - 1) / 2 &&
      measurement.register >= 0 &&
      measurement.register < getRegisterNum() &&
      circuitGates[measurement.step * 2 + 1][measurement.register].name ==
        GateName.Measurement
    ) {
      circuitGates[measurement.step * 2 + 1][measurement.register].value =
        measurement.value.toString()
    }
  })
}
