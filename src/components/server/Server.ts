import { ref } from 'vue'
import { ConstantBackoff, WebsocketBuilder } from 'websocket-ts'
import { changeChartDataToStepSelectStateVector } from '../store/Chart'
import {
  getStepNum,
  getRegisterNum,
  circuitGates,
  stepSelect
} from '../store/Circuit'
import {
  computation,
  Measurement,
  StateVector,
  updateCircuitMeasurement
} from '../store/Computation'
import { getEncodedCircuit } from './Encoder'

export const connected = ref<boolean>(false)

export const ws = new WebsocketBuilder('ws://101.6.96.206:5000/circuit')
  .withBackoff(new ConstantBackoff(1000)) // 1000ms = 1s
  .onOpen(() => {
    console.log('opened')
    connected.value = true
  })
  .onClose(() => {
    console.log('closed')
    connected.value = false
  })
  .onError(() => {
    console.log('error')
    connected.value = false
  })
  .onMessage((_, event: MessageEvent) => {
    const response = JSON.parse(event.data)
    handleResponse(response)
  })
  .onRetry(() => {
    console.log('retry')
  })
  .build()

export function sendRequest(): void {
  ws.send(JSON.stringify(getEncodedCircuit()))
}

export function handleResponse(response: any): void {
  console.log('message', JSON.stringify(response, undefined, 2))
  if ('message' in response) {
    return
  } else {
    computation.samples.splice(0, computation.samples.length)
    if (response.data.length == 1) {
      const sample = response.data[0]
      computation.samples.push({
        stateVectors: sample.stateVector.map((item: any) => ({
          realParts: item.real,
          imaginaryParts: item.imaginary,
          probabilities: item.probability
        })),
        measurements: sample.measurement.map((item: any) => ({
          step: item.moment,
          register: parseInt(item.qubit[0].name.replace('q', '')),
          value: item.value
        }))
      })
      updateCircuitMeasurement(computation.samples[0].measurements)
      computation.circuit = JSON.stringify(circuitGates)
      if (stepSelect.value == 0) {
        stepSelect.value = getStepNum() - 1
      }
      changeChartDataToStepSelectStateVector()
    } else if (response.data.length > 1) {
      response.data.forEach((sample: any, index: number) => {
        computation.samples.push({
          stateVectors: [],
          measurements: sample.measurement.map((item: any) => ({
            step: item.moment,
            register: parseInt(item.qubit[0].name.replace('q', '')),
            value: item.value
          }))
        })
      })
      computation.circuit = JSON.stringify(circuitGates)
    }
  }
}
