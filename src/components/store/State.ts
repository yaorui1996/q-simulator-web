import { ExportToCsv } from 'export-to-csv'
import { reactive } from 'vue'

export interface States {
  registerNum: number
  stateNum: number
  names: string[]
  fullNames: string[]
  vectorsRe: string[]
  vectorsIm: string[]
  probabilities: string[]
}

export const states = reactive<States>({
  registerNum: 0,
  stateNum: 0,
  names: [],
  fullNames: [],
  vectorsRe: [],
  vectorsIm: [],
  probabilities: []
})

states.registerNum = 3
states.stateNum = Math.pow(2, states.registerNum)
for (let i = 0; i < states.stateNum; i++) {
  const name: string = i.toString(2).padStart(states.registerNum, '0')
  const phi: number = Math.random() * Math.PI * 2
  states.names.push(name)
  states.fullNames.push(getStateFullName(name))
  states.vectorsRe.push(
    ((1 / Math.sqrt(states.stateNum)) * Math.cos(phi)).toFixed(3)
  )
  states.vectorsIm.push(
    ((1 / Math.sqrt(states.stateNum)) * Math.sin(phi)).toFixed(3)
  )
  states.probabilities.push((1 / Math.sqrt(states.stateNum)).toFixed(3))
}

export function getStateFullName(name: string): string {
  return '|' + name + '⟩'
}

export function saveAsExcel(term: string) {
  interface StateVector {
    state: string
    real: string
    imaginary: string
  }

  interface Probability {
    state: string
    probability: string
  }

  function getStateVectorJson(): StateVector[] {
    const stateVectorJson: StateVector[] = []
    for (let i = 0; i < states.stateNum; i++) {
      stateVectorJson.push({
        state: states.names[i],
        real: states.vectorsRe[i],
        imaginary: states.vectorsIm[i]
      })
    }
    return stateVectorJson
  }

  function getProbabilityJson(): Probability[] {
    const probabilityJson: Probability[] = []
    for (let i = 0; i < states.stateNum; i++) {
      probabilityJson.push({
        state: states.names[i],
        probability: states.probabilities[i]
      })
    }
    return probabilityJson
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
    ).generateCsv(getStateVectorJson())
  } else if (term == 'Probability') {
    new ExportToCsv(
      Object.assign(options, { filename: 'Probability' })
    ).generateCsv(getProbabilityJson())
  }
}
