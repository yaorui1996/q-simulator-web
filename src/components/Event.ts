import {
  Display,
  emptyGate,
  Gate,
  GateName,
  isGateInCircuitDropzone,
  isGateSelected,
  isGateValid
} from './Gate'
import { changeChartDataToStepSelectStateVector } from './store/Chart'
import {
  appendRegister,
  circuitGates,
  dragDropzoneGate,
  dragDropzonePos,
  getMaxSwapIndex,
  getSwapGatePartner,
  initDragDropzone,
  removeDragDropzone,
  stepFocus,
  stepSelect,
  trimCircuit
} from './store/Circuit'

enum EventStatus {
  Idle,
  DraggingOutsideBoard,
  CircuitDropzoneGatePressed,
  CircuitDropzoneGateSelected,
  DraggingInsideBoard
}

let eventStatus: EventStatus = EventStatus.Idle
let selectedCircuitDropzoneGate: Gate = emptyGate()
let draggedCircuitDropzoneGate: Gate = emptyGate()

function deleteDraggedCircuitDropzoneGate(): void {
  Object.assign(draggedCircuitDropzoneGate, {
    name: GateName.Null,
    value: '',
    swapIndex: 0,
    display: Display.Default
  })
}

function moveDraggedCircuitDropzoneGate(step: number, register: number): void {
  if (step > 0) {
    Object.assign(circuitGates[step][register], {
      name: draggedCircuitDropzoneGate.name,
      value: draggedCircuitDropzoneGate.value,
      swapIndex: draggedCircuitDropzoneGate.swapIndex,
      display: Display.Drag
    })
    deleteDraggedCircuitDropzoneGate()
    draggedCircuitDropzoneGate = circuitGates[step][register]
  }
}

export function handleMouseEnterPaletteDropzone(eventGate: Gate): void {
  // console.log('mouseenterpalette')
  if (eventStatus !== EventStatus.DraggingOutsideBoard) {
    Object.assign(eventGate, { display: Display.Focus })
  }
}

export function handleMouseLeavePaletteDropzone(eventGate: Gate): void {
  // console.log('mouseleavepalette')
  if (eventStatus !== EventStatus.DraggingOutsideBoard) {
    Object.assign(eventGate, { display: Display.Default })
  }
}

export function handleMouseDownPaletteDropzone(
  event: MouseEvent,
  eventGate: Gate
): void {
  // console.log('mousedownpalette')
  cleanGateSelected()
  eventStatus = EventStatus.DraggingOutsideBoard
  setDragDropzonePos(event)
  initDragDropzone(eventGate)
  Object.assign(eventGate, { display: Display.Default })
  appendRegister()
}

export function handleMouseUpPaletteDropzone() {
  // console.log('mouseuppalette')
  cleanQuantumCircuit()
}

export function handleMouseEnterCircuitDropzone(eventGate: Gate): void {
  // console.log('mouseentercircuitdropzone')
  if (
    eventStatus !== EventStatus.DraggingInsideBoard &&
    isGateValid(eventGate) &&
    !isGateSelected(eventGate)
  ) {
    Object.assign(eventGate, { display: Display.Focus })
  }
  moveStepFocus(eventGate)
}

export function handleMouseLeaveCircuitDropzone(eventGate: Gate): void {
  // console.log('mouseleavecircuitdropzone')
  if (eventStatus == EventStatus.CircuitDropzoneGatePressed) {
    eventStatus = EventStatus.DraggingInsideBoard
    appendRegister()
  } else if (
    eventStatus !== EventStatus.DraggingInsideBoard &&
    isGateValid(eventGate) &&
    !isGateSelected(eventGate)
  ) {
    Object.assign(eventGate, { display: Display.Default })
  }
}

export function handleMouseDownCircuitDropzone(eventGate: Gate): void {
  // console.log('mousedowncircuitdropzone')
  if (eventGate.step == 0) {
    return
  }
  cleanGateSelected()
  if (isGateValid(eventGate)) {
    eventStatus = EventStatus.CircuitDropzoneGatePressed
    Object.assign(eventGate, { display: Display.Drag })
    if (eventGate.name == GateName.Swap) {
      Object.assign(getSwapGatePartner(eventGate) ?? emptyGate(), {
        display: Display.Drag
      })
    }
    draggedCircuitDropzoneGate = eventGate
  } else {
    eventStatus = EventStatus.Idle
  }
}

export function handleMouseUpCircuitDropzone(eventGate: Gate): void {
  // console.log('mouseupcircuitdropzone')
  if (eventStatus == EventStatus.CircuitDropzoneGatePressed) {
    eventStatus = EventStatus.CircuitDropzoneGateSelected
    Object.assign(eventGate, { display: Display.Select })
    if (eventGate.name == GateName.Swap) {
      Object.assign(getSwapGatePartner(eventGate) ?? emptyGate(), {
        display: Display.Default
      })
    }
    selectedCircuitDropzoneGate = eventGate
  } else {
    if (eventStatus == EventStatus.DraggingInsideBoard) {
      Object.assign(draggedCircuitDropzoneGate, { display: Display.Default })
      if (draggedCircuitDropzoneGate.name == GateName.Swap) {
        Object.assign(
          getSwapGatePartner(draggedCircuitDropzoneGate) ?? emptyGate(),
          { display: Display.Default }
        )
      }
      trimCircuit()
    }
    eventStatus = EventStatus.Idle
  }
}

export function handleMouseMoveCircuitStep(
  event: MouseEvent,
  eventGate: Gate
): void {
  // console.log('mousemovecircuitstep', eventGate)
  moveStepFocus(eventGate)
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
      moveDraggedCircuitDropzoneGate(targetStep, targetRegister)
    }
  }
}

export function handleMouseDownCircuitStep(eventGate: Gate): void {
  // console.log('mousedowncircuitstep')
  if (
    isGateInCircuitDropzone(eventGate) &&
    stepFocus.value > 0 &&
    (eventStatus == EventStatus.Idle ||
      eventStatus == EventStatus.CircuitDropzoneGateSelected)
  ) {
    stepSelect.value = stepFocus.value
    changeChartDataToStepSelectStateVector()
  }
  cleanGateSelected()
  eventStatus = EventStatus.Idle
}

export function handleMouseEnterCircuitBoard(): void {
  // console.log('mouseentercircuitboard')
  if (eventStatus == EventStatus.DraggingOutsideBoard) {
    eventStatus = EventStatus.DraggingInsideBoard
    draggedCircuitDropzoneGate = Object.assign(emptyGate(), dragDropzoneGate)
    removeDragDropzone()
  }
}

export function handleMouseLeaveCircuitBoard(): void {
  // console.log('mouseleavecircuitboard')
  stepFocus.value = 0
  if (eventStatus == EventStatus.DraggingInsideBoard) {
    eventStatus = EventStatus.DraggingOutsideBoard
    initDragDropzone(draggedCircuitDropzoneGate)
    deleteDraggedCircuitDropzoneGate()
  }
}

export function handleMouseLeaveQuantumCircuit(): void {
  // console.log('mouseleavequantumcircuit')
  cleanGateSelected()
  cleanQuantumCircuit()
}

export function handleMouseDownQuantumCircuit(): void {
  // console.log('mousedownquantumcircuit')
  cleanGateSelected()
  eventStatus = EventStatus.Idle
}

export function handleMouseUpQuantumCircuit(): void {
  // console.log('mouseupquantumcircuit')
  cleanQuantumCircuit()
}

export function handleMouseMoveQuantumCircuit(event: MouseEvent): void {
  // console.log('mousemovequantumcircuit')
  if (eventStatus == EventStatus.DraggingOutsideBoard) {
    setDragDropzonePos(event)
  } else if (eventStatus == EventStatus.DraggingInsideBoard) {
    eventStatus = EventStatus.DraggingOutsideBoard
    initDragDropzone(draggedCircuitDropzoneGate)
    deleteDraggedCircuitDropzoneGate()
  }
}

function cleanGateSelected(): void {
  if (eventStatus == EventStatus.CircuitDropzoneGateSelected) {
    Object.assign(selectedCircuitDropzoneGate, { display: Display.Default })
  }
}

function cleanQuantumCircuit(): void {
  if (dragDropzoneGate.name == GateName.Swap) {
    Object.assign(
      getSwapGatePartner(dragDropzoneGate) ?? emptyGate(),
      emptyGate()
    )
  }
  removeDragDropzone()
  if (eventStatus == EventStatus.DraggingOutsideBoard) {
    trimCircuit()
  }
  eventStatus = EventStatus.Idle
}

function setDragDropzonePos(event: MouseEvent): void {
  dragDropzonePos.left = event.clientX - 55 / 2 - document.getElementById('circuit')!.offsetLeft + 5
  dragDropzonePos.top = event.clientY - 55 / 2 - document.getElementById('circuit')!.offsetTop + 5
}

function moveStepFocus(eventGate: Gate): void {
  if (
    isGateInCircuitDropzone(eventGate) &&
    eventGate.step % 2 == 1 &&
    (eventStatus == EventStatus.Idle ||
      eventStatus == EventStatus.CircuitDropzoneGateSelected)
  ) {
    stepFocus.value = eventGate.step
  }
}
