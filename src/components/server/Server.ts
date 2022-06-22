import { ConstantBackoff, WebsocketBuilder } from 'websocket-ts'
import { GateName } from '../Gate'
import { changeChartDataToStepSelectStateVector } from '../store/Chart'
import { getStepNum, getRegisterNum, circuitGates } from '../store/Circuit'
import {
  computation,
  Measurement,
  StateVector,
  updateCircuitMeasurement
} from '../store/Computation'
import { getEncodedCircuit } from './Encoder'

export let ws = new WebsocketBuilder('ws://101.6.96.206:5000/circuit')
  .withBackoff(new ConstantBackoff(1000)) // 1000ms = 1s
  .onOpen((i, ev) => {
    console.log('opened')
  })
  .onClose((i, ev) => {
    console.log('closed')
  })
  .onError((i, ev) => {
    console.log('error')
  })
  .onMessage((i, ev) => {
    if ('message' in JSON.parse(ev.data)) {
      return
    }
    const evdata = JSON.parse(ev.data)
    // console.log('message', i, JSON.stringify(JSON.parse(ev.data), undefined, 2))
    computation.samples.splice(0, computation.samples.length)
    computation.samples.push({
      stateVectors: [],
      measurements: []
    })
    for (let i = 0; i < getStepNum() / 2; i++) {
      const state: StateVector = {
        realParts: evdata.data.stateVector[i].real,
        imaginaryParts: evdata.data.stateVector[i].imaginary,
        probabilities: evdata.data.stateVector[i].probability
      }
      const registerNum = getRegisterNum()
      const stateNum = Math.pow(2, registerNum)
      for (let j = 0; j < stateNum; j++) {
        const phi: number = Math.random() * Math.PI * 2
        // state.realParts.push((1 / Math.sqrt(stateNum)) * Math.cos(phi))
        // state.imaginaryParts.push((1 / Math.sqrt(stateNum)) * Math.sin(phi))
        // state.probabilities.push(1 / Math.sqrt(stateNum))
      }
      computation.samples[0].stateVectors.push(state)
    }
    if (evdata.data.measurement.length > 0) {
      evdata.data.measurement.forEach((meas: any) => {
        const measurement: Measurement = {
          step: meas.moment,
          register: parseInt(meas.qubit[0].name.replace('q', '')),
          value: meas.value
        }
        computation.samples[0].measurements.push(measurement)
      })
    }
    updateCircuitMeasurement(computation.samples[0].measurements)
    computation.circuit = JSON.stringify(circuitGates)
    changeChartDataToStepSelectStateVector()
  })
  .onRetry((i, ev) => {
    console.log('retry')
  })
  .build()

export function fun() {
  console.log(1)
  // ws = new WebsocketBuilder('ws://101.6.96.206:5000/circuit')
  //   .onOpen((i, ev) => {
  //     console.log('opened')
  //   })
  //   .onClose((i, ev) => {
  //     console.log('closed')
  //   })
  //   .onError((i, ev) => {
  //     console.log('error')
  //   })
  //   .onMessage((i, ev) => {
  //     console.log('message')
  //   })
  //   .onRetry((i, ev) => {
  //     console.log('retry')
  //   })
  //   .build()
}
