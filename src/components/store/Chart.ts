import { ExportToCsv } from 'export-to-csv'
import { reactive } from 'vue'
import { resetArray } from '../utils/Array'
import { getStateFullName } from '../utils/String'
import { circuitGates, getRegisterNum, stepSelect } from './Circuit'
import { computation, sampleCircuit } from './Computation'

export interface StateVectorBar {
  stateNames: string[]
  realParts: number[]
  imaginaryParts: number[]
}

export interface ProbabilityBar {
  stateNames: string[]
  probabilities: number[]
}

export const stateVectorBar = reactive<StateVectorBar>({
  stateNames: [],
  realParts: [],
  imaginaryParts: []
})

export const probabilityBar = reactive<ProbabilityBar>({
  stateNames: [],
  probabilities: []
})

export function saveAsExcel(term: string) {
  function getStateVector(): {
    state: string
    real: number
    imaginary: number
  }[] {
    return stateVectorBar.stateNames.map((_, index) => ({
      state: stateVectorBar.stateNames[index],
      real: stateVectorBar.realParts[index],
      imaginary: stateVectorBar.imaginaryParts[index]
    }))
  }

  function getProbability(): {
    state: string
    probability: number
  }[] {
    return probabilityBar.stateNames.map((_, index) => ({
      state: probabilityBar.stateNames[index],
      probability: probabilityBar.probabilities[index]
    }))
  }

  const options = {
    fieldSeparator: ',',
    filename: '',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true
  }

  if (term == 'StateVector') {
    new ExportToCsv(
      Object.assign(options, { filename: 'StateVecotr' })
    ).generateCsv(getStateVector())
  } else if (term == 'Probability') {
    new ExportToCsv(
      Object.assign(options, { filename: 'Probability' })
    ).generateCsv(getProbability())
  }
}

export function changeChartDataToStepSelectStateVector(): void {
  if (
    computation.circuit == JSON.stringify(circuitGates) &&
    computation.samples.length > 0 &&
    computation.samples[0].stateVectors.length > 0
  ) {
    const stateNames: string[] = Array(Math.pow(2, getRegisterNum()))
      .fill('')
      .map((_, index) =>
        getStateFullName(index.toString(2).padStart(getRegisterNum(), '0'))
      )
    resetArray(stateVectorBar.stateNames, stateNames)
    resetArray(
      stateVectorBar.realParts,
      computation.samples[0].stateVectors[stepSelect.value / 2 - 1].realParts
    )
    resetArray(
      stateVectorBar.imaginaryParts,
      computation.samples[0].stateVectors[stepSelect.value / 2 - 1]
        .imaginaryParts
    )
    resetArray(probabilityBar.stateNames, stateNames)
    resetArray(
      probabilityBar.probabilities,
      computation.samples[0].stateVectors[stepSelect.value / 2 - 1]
        .probabilities
    )
  }
}
