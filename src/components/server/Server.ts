import { ref } from 'vue'
import { ConstantBackoff, WebsocketBuilder } from 'websocket-ts'
import {
  changeChartDataToStepSelectStateVector,
  updateSamplingDistributionBar
} from '../store/Chart'
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

let lastConnectTime: number = 0

export const ws = new WebsocketBuilder('ws://101.6.96.206:5000/circuit')
  .withBackoff(new ConstantBackoff(1000)) // 1000ms = 1s
  .onOpen(() => {
    console.log('opened')
  })
  .onClose(() => {
    console.log('closed')
  })
  .onError(() => {
    console.log('error')
  })
  .onMessage((_, event: MessageEvent) => {
    const response = JSON.parse(event.data)
    handleResponse(response)
  })
  .onRetry(() => {
    console.log('retry')
  })
  .build()

export function sendRequest(
  sampleNum: number = 1,
  stateVector: boolean = true
): void {
  ws.send(
    JSON.stringify({
      request: {
        time: false,
        submitCircuit: true,
        acquireResult: true
      },
      circuit: getEncodedCircuit(),
      sample: sampleNum,
      stateVector: stateVector
    })
  )
}

export function handleResponse(response: any): void {
  // console.log('message', JSON.stringify(response, undefined, 2))
  if ('message' in response) {
    return
  }
  if ('time' in response) {
    lastConnectTime = Date.now()
  }
  if ('data' in response) {
    computation.samples.splice(0, computation.samples.length)
    if (response.data.length == 1 && response.verification.data.stateVector) {
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
    } else {
      response.data.forEach((sample: any) => {
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
      updateSamplingDistributionBar()
    }
  }
}

function ping() {
  ws.send(
    JSON.stringify({
      request: {
        time: true,
        submitCircuit: false,
        acquireResult: false
      }
    })
  )
  connected.value = Date.now() - lastConnectTime < 3000
}

setInterval(ping, 1000)
