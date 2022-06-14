import { ExportToCsv } from 'export-to-csv'
import { reactive } from 'vue'
import { resetArray } from '../utils/Array'
import { stepSelect } from './Circuit'
import { computation, isComputationEmpty, sampleCircuit } from './Computation'

export interface StateVectorBar {
  stateNames: string[]
  realParts: number[]
  imaginaryParts: number[]
}

export const stateVectorBar = reactive<StateVectorBar>({
  stateNames: [],
  realParts: [],
  imaginaryParts: []
})

export interface ProbabilityBar {
  stateNames: string[]
  probabilities: number[]
}

export const probabilityBar = reactive<ProbabilityBar>({
  stateNames: [],
  probabilities: []
})

const states = {
  registerNum: 0,
  stateNum: 0
}
states.registerNum = 3
states.stateNum = Math.pow(2, states.registerNum)
for (let i = 0; i < states.stateNum; i++) {
  const name: string = i.toString(2).padStart(states.registerNum, '0')
  const phi: number = Math.random() * Math.PI * 2

  stateVectorBar.stateNames.push(getStateFullName(name))
  stateVectorBar.realParts.push(
    (1 / Math.sqrt(states.stateNum)) * Math.cos(phi)
  )
  stateVectorBar.imaginaryParts.push(
    (1 / Math.sqrt(states.stateNum)) * Math.sin(phi)
  )

  probabilityBar.stateNames.push(getStateFullName(name))
  probabilityBar.probabilities.push(1 / Math.sqrt(states.stateNum))
}

export function getStateFullName(name: string): string {
  return '|' + name + '⟩'
}

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

export function changeChartDataToStepSelect() {
  if (isComputationEmpty()) {
    sampleCircuit(1, true, false)
  }
  resetArray(
    stateVectorBar.realParts,
    computation.samples[0].stateVectors[stepSelect.value / 2 - 1].realParts
  )
  resetArray(
    stateVectorBar.imaginaryParts,
    computation.samples[0].stateVectors[stepSelect.value / 2 - 1].imaginaryParts
  )
  resetArray(
    probabilityBar.probabilities,
    computation.samples[0].stateVectors[stepSelect.value / 2 - 1].probabilities
  )
}
