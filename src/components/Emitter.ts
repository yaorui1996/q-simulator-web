import mitt, { Emitter } from 'mitt'

import { Gate } from './Gate'

type Events = {
  setDropzoneNormal: void
  appendRegister: void
  removeCircuitDropzone: void
  setCircuitDropzone: Gate
  mousedownCircuitDropzone: Gate
}

export const emitter: Emitter<Events> = mitt<Events>()
