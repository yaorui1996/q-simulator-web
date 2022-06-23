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

export function updateCircuitMeasurement(measurements: Measurement[]) {
  measurements.forEach((measurement) => {
    if (
      measurement.step >= 0 &&
      measurement.step < getStepNum() / 2 &&
      measurement.register >= 0 &&
      measurement.register < getRegisterNum() &&
      circuitGates[measurement.step * 2][measurement.register].name ==
        GateName.Measurement
    ) {
      circuitGates[measurement.step * 2][measurement.register].value =
        measurement.value.toString()
    }
  })
}
