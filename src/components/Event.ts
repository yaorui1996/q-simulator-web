import {
  Display,
  emptyGate,
  Gate,
  GateName,
  isGateSelected,
  isGateValid,
  setGateDisplay
} from './Gate'
import {
  appendRegister,
  circuitGates,
  dragDropzoneGate,
  dragDropzonePos,
  initDragDropzone,
  removeDragDropzone,
  trimCircuit
} from './store/Circuit'

enum EventStatus {
  Idle,
  DraggindOutsideBoard,
  CircuitDropzoneGatePressed,
  CircuitDropzoneGateSelected,
  DraggingInsideBoard
}

let eventStatus: EventStatus = EventStatus.Idle
let selectedCircuitDropzoneGate: Gate = emptyGate()
let draggedCircuitDropzoneGate: Gate = emptyGate()

function deleteDraggedCircuitDrppzoneGate(): void {
  Object.assign(draggedCircuitDropzoneGate, {
    name: GateName.Null,
    value: '',
    display: Display.Default
  })
}

function moveDraggedCircuitDrppzoneGate(step: number, register: number): void {
  Object.assign(circuitGates[step][register], {
    name: draggedCircuitDropzoneGate.name,
    value: draggedCircuitDropzoneGate.value,
    display: Display.Drag
  })
  deleteDraggedCircuitDrppzoneGate()
  draggedCircuitDropzoneGate = circuitGates[step][register]
}

export function handleMouseEnterPaletteDropzone(eventGate: Gate): void {
  //   console.log('mouseenterpalette')
  if (eventStatus !== EventStatus.DraggindOutsideBoard) {
    setGateDisplay(eventGate, Display.Focus)
  }
}

export function handleMouseLeavePaletteDropzone(eventGate: Gate): void {
  //   console.log('mouseleavepalette')
  if (eventStatus !== EventStatus.DraggindOutsideBoard) {
    setGateDisplay(eventGate, Display.Default)
  }
}

export function handleMouseDownPaletteDropzone(
  event: MouseEvent,
  eventGate: Gate
): void {
  //   console.log('mousedownpalette')
  handleMouseDownQuantumCircuit()
  eventStatus = EventStatus.DraggindOutsideBoard
  handleMouseMoveQuantumCircuit(event)
  initDragDropzone(eventGate)
  setGateDisplay(eventGate, Display.Default)
  appendRegister()
}

export function handleMouseUpPaletteDropzone() {
  //   console.log('mouseuppalette')
  handleMouseUpQuantumCircuit()
}

export function handleMouseEnterCircuitDropzone(eventGate: Gate): void {
  //   console.log('mouseentercircuitdropzone')
  if (
    eventStatus !== EventStatus.DraggingInsideBoard &&
    isGateValid(eventGate) &&
    !isGateSelected(eventGate)
  ) {
    setGateDisplay(eventGate, Display.Focus)
  }
}

export function handleMouseLeaveCircuitDropzone(eventGate: Gate): void {
  //   console.log('mouseleavecircuitdropzone')
  if (eventStatus == EventStatus.CircuitDropzoneGatePressed) {
    eventStatus = EventStatus.DraggingInsideBoard
    appendRegister()
  } else if (
    eventStatus !== EventStatus.DraggingInsideBoard &&
    isGateValid(eventGate) &&
    !isGateSelected(eventGate)
  ) {
    setGateDisplay(eventGate, Display.Default)
  }
}

export function handleMouseDownCircuitDropzone(eventGate: Gate): void {
  //   console.log('mousedowncircuitdropzone')
  handleMouseDownQuantumCircuit()
  if (isGateValid(eventGate)) {
    eventStatus = EventStatus.CircuitDropzoneGatePressed
    setGateDisplay(eventGate, Display.Drag)
    draggedCircuitDropzoneGate = eventGate
  }
}

export function handleMouseUpCircuitDropzone(eventGate: Gate): void {
  //   console.log('mouseupcircuitdropzone')
  if (eventStatus == EventStatus.CircuitDropzoneGatePressed) {
    eventStatus = EventStatus.CircuitDropzoneGateSelected
    setGateDisplay(eventGate, Display.Select)
    selectedCircuitDropzoneGate = eventGate
  } else {
    if (eventStatus == EventStatus.DraggingInsideBoard) {
      setGateDisplay(draggedCircuitDropzoneGate, Display.Default)
      trimCircuit()
    }
    eventStatus = EventStatus.Idle
  }
}

export function handleMouseMoveCircuitStep(
  event: MouseEvent,
  eventGate: Gate
): void {
  //   console.log('mousemovecircuitstep', eventGate)
  if (
    eventStatus == EventStatus.DraggingInsideBoard &&
    draggedCircuitDropzoneGate !== eventGate
  ) {
    const targetStep: number = !isGateValid(eventGate)
      ? eventGate.step
      : event.offsetX < 32 / 2
      ? eventGate.step - 1
      : eventGate.step + 1
    const targetRegister: number = eventGate.register
    if (
      !(
        draggedCircuitDropzoneGate.step == targetStep &&
        draggedCircuitDropzoneGate.register == targetRegister
      )
    ) {
      moveDraggedCircuitDrppzoneGate(targetStep, targetRegister)
    }
  }
}

export function handleMouseEnterCircuitBoard(): void {
  //   console.log('mouseentercircuitboard')
  if (eventStatus == EventStatus.DraggindOutsideBoard) {
    eventStatus = EventStatus.DraggingInsideBoard
    draggedCircuitDropzoneGate = dragDropzoneGate
    removeDragDropzone()
  }
}

export function handleMouseLeaveCircuitBoard(): void {
  //   console.log('mouseleavecircuitboard')
  if (eventStatus == EventStatus.DraggingInsideBoard) {
    eventStatus = EventStatus.DraggindOutsideBoard
    initDragDropzone(draggedCircuitDropzoneGate)
    deleteDraggedCircuitDrppzoneGate()
  }
}

export function handleMouseLeaveQuantumCircuit(): void {
  //   console.log('mouseleavequantumcircuit')
  handleMouseDownQuantumCircuit()
  handleMouseUpQuantumCircuit()
}

export function handleMouseDownQuantumCircuit(): void {
  //   console.log('mousedownquantumcircuit')
  if (eventStatus == EventStatus.CircuitDropzoneGateSelected) {
    setGateDisplay(selectedCircuitDropzoneGate, Display.Default)
  }
  eventStatus = EventStatus.Idle
}

export function handleMouseUpQuantumCircuit(): void {
  //   console.log('mouseupquantumcircuit')
  if (eventStatus == EventStatus.DraggindOutsideBoard) {
    trimCircuit()
  }
  eventStatus = EventStatus.Idle
  removeDragDropzone()
}

export function handleMouseMoveQuantumCircuit(event: MouseEvent): void {
  //   console.log('mousemovequantumcircuit')
  if (eventStatus == EventStatus.DraggindOutsideBoard) {
    dragDropzonePos.left = event.pageX - 55 / 2
    dragDropzonePos.top = event.pageY - 55 / 2
  } else if (eventStatus == EventStatus.DraggingInsideBoard) {
    eventStatus = EventStatus.DraggindOutsideBoard
    initDragDropzone(draggedCircuitDropzoneGate)
    deleteDraggedCircuitDrppzoneGate()
  }
}
