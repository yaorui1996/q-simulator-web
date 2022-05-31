export const uncontrollableGate: string[] = ['Write', 'Measurement']

export enum Display {
    Default,
    Focussed,
    Grabbed,
    Selected
}

export interface Gate {
    // index of register and step, start from 0
    // circuit (0, N); palette (-1, N); blank (-1, -1)
    step: number
    register: number
    name: string
    value: string
    display: Display
    wireInput: boolean
    wireOutput: boolean
    connectTop: boolean
    connectBottom: boolean
}

export function getGateID(gate: Gate): string {
    if (gate.register == -1) {
        if (gate.step == -1) {
            return 'blank'
        } else {
            return 'palette'
        }
    } else {
        return 'circuit'
    }
}

export function isGateInBlankDropzone(gate: Gate): boolean {
    return getGateID(gate) == 'blank'
}

export function isGateInPaletteDropzone(gate: Gate): boolean {
    return getGateID(gate) == 'palette'
}

export function isGateInCircuitDropzone(gate: Gate): boolean {
    return getGateID(gate) == 'circuit'
}

export function isGateValid(gate: Gate): boolean {
    return gate.name !== 'Null'
}

export function isGateEqual(gate1: Gate, gate2: Gate): boolean {
    return gate1.step == gate2.step && gate1.register == gate2.register && gate1.name == gate2.name
}

export function setGateName(gate1: Gate, gate2: Gate) {
    gate1.name = gate2.name
}

export function setGateValue(gate1: Gate, gate2: Gate) {
    Object.assign(gate1, gate2)
}

export function initGateBlank(gate: Gate, name: string, value: string) {
    gate.step = -1
    gate.register = -1
    gate.name = name
    gate.display = Display.Grabbed
    gate.wireInput = false
    gate.wireOutput = false
    gate.connectTop = false
    gate.connectBottom = false
    gate.value = value
}

export function getStepNum(circuit: Gate[][]): number {
    return circuit.length
}

export function getRegisterNum(circuit: Gate[][]): number {
    if (getStepNum(circuit) > 0) {
        return circuit[0].length
    } else {
        return 0
    }
}

function emptyStep(stepIndex: number, registerNum: number): Gate[] {
    let step = []
    for (let i = 0; i < registerNum; i++) {
        step.push({
            step: stepIndex,
            register: i,
            name: 'Null',
            value: '',
            display: Display.Default,
            wireInput: false,
            wireOutput: false,
            connectTop: false,
            connectBottom: false
        })
    }
    return step
}

export function initPalette(palette: Gate[]): void {
    palette.splice(0, palette.length)  // clear palette
    palette.push({
        step: 0,
        register: -1,
        name: 'PauliX',
        value: '',
        display: Display.Default,
        wireInput: false,
        wireOutput: false,
        connectTop: false,
        connectBottom: false
    })
    palette.push({
        step: 1,
        register: -1,
        name: 'PauliY',
        value: '',
        display: Display.Default,
        wireInput: false,
        wireOutput: false,
        connectTop: false,
        connectBottom: false
    })
    palette.push({
        step: 2,
        register: -1,
        name: 'Control',
        value: '',
        display: Display.Default,
        wireInput: false,
        wireOutput: false,
        connectTop: false,
        connectBottom: false
    })
    palette.push({
        step: 3,
        register: -1,
        name: 'Write',
        value: '0',
        display: Display.Default,
        wireInput: false,
        wireOutput: false,
        connectTop: false,
        connectBottom: false
    })
    palette.push({
        step: 4,
        register: -1,
        name: 'Write',
        value: '1',
        display: Display.Default,
        wireInput: false,
        wireOutput: false,
        connectTop: false,
        connectBottom: false
    })
    palette.push({
        step: 5,
        register: -1,
        name: 'Measurement',
        value: '',
        display: Display.Default,
        wireInput: false,
        wireOutput: false,
        connectTop: false,
        connectBottom: false
    })
}

export function initCircuit(circuit: Gate[][], stepMin: number, registerMin: number): void {
    circuit.splice(0, circuit.length)  // clear circuit
    circuit.push(emptyStep(0, registerMin))  // set first step
    arrangeCircuit(circuit, stepMin, registerMin)
}

export function isStepEmpty(step: Gate[]): boolean {
    return step.every(gate => gate.name == 'Null')
}

export function arrangeRegister(circuit: Gate[][], registerMin: number): void {
    while (getRegisterNum(circuit) > registerMin) {
        let lastRegisterGateNames: string[] = circuit.map(step => step[step.length - 1].name)
        if (lastRegisterGateNames.every(name => name == 'Null')) {
            circuit.forEach(step => step.pop())
        } else {
            break
        }
    }
}

export function arrangeStep(circuit: Gate[][], stepMin: number): void {
    // insert empty step from end to start
    for (let i = getStepNum(circuit) - 1; i >= 0; i--) {
        if (isStepEmpty(circuit[i])) {
            if (getStepNum(circuit) > 1) {
                circuit.splice(i, 1)
            }
        } else {
            if (i == 0 || !isStepEmpty(circuit[i - 1])) {
                circuit.splice(i, 0, emptyStep(0, getRegisterNum(circuit)))
            } else {
                i--
            }
        }
    }

    // fill step
    if (getStepNum(circuit) % 2 == 0) {
        circuit.push(emptyStep(0, getRegisterNum(circuit)))
    }

    while (getStepNum(circuit) < 2 * stepMin + 1) {
        circuit.push(emptyStep(0, getRegisterNum(circuit)))
    }
}

export function arrangeIndex(circuit: Gate[][]): void {
    for (let i = 0; i < getStepNum(circuit); i++) {
        for (let j = 0; j < getRegisterNum(circuit); j++) {
            circuit[i][j].step = i
            circuit[i][j].register = j
        }
    }
}

export function arrangeWires(circuit: Gate[][]): void {
    if (getRegisterNum(circuit) > 0) {
        let wires: boolean[] = Array(getRegisterNum(circuit)).fill(false)

        circuit.forEach(step => {
            step.forEach((gate, index) => {
                gate.connectTop = false
                gate.connectBottom = false

                gate.wireInput = wires[index]
                if (gate.name == 'Write') {
                    wires[index] = true
                } else if (gate.name == 'Measurement') {
                    wires[index] = false
                }
                gate.wireOutput = wires[index]
            })

            const names: string[] = step.map(gate => uncontrollableGate.concat(['Null', 'Control']).includes(gate.name) ? gate.name : 'Controllable')
            const firstControlGate: number = names.indexOf('Control')
            if (firstControlGate >= 0) {
                const lastControlGate: number = names.lastIndexOf('Control')
                let connectStart: number = firstControlGate;
                let connectEnd: number = lastControlGate;
                const firstControllableGate: number = names.indexOf('Controllable')
                if (firstControllableGate >= 0) {
                    const lastControllableGate: number = names.lastIndexOf('Controllable')
                    connectStart = Math.min(firstControlGate, firstControllableGate)
                    connectEnd = Math.max(lastControlGate, lastControllableGate)
                }
                for (let i: number = connectStart; i <= connectEnd; i++) {
                    if (i > connectStart) {
                        step[i].connectTop = true
                    }
                    if (i < connectEnd) {
                        step[i].connectBottom = true
                    }
                }
            }
        })
    }
}

export function arrangeCircuit(circuit: Gate[][], stepMin: number, registerMin: number): void {
    arrangeRegister(circuit, registerMin)
    arrangeStep(circuit, stepMin)
    arrangeIndex(circuit)
    arrangeWires(circuit)
}

export function appendRegister(circuit: Gate[][]): void {
    let i: number = getRegisterNum(circuit)
    circuit.forEach((step, index) =>
        step.push({
            step: index,
            register: i,
            name: 'Null',
            value: '',
            display: Display.Default,
            wireInput: false,
            wireOutput: false,
            connectTop: false,
            connectBottom: false
        })
    )
}

export function removeRegister(circuit: Gate[][]): void {
    let lastRegisterGateNames: string[] = circuit.map(step => step[step.length - 1].name)
    if (lastRegisterGateNames.every(name => name == 'Null')) {
        circuit.forEach(step => step.pop())
    }
}

export function isCircuitEqual(circuit1: Gate[][], circuit2: Gate[][]): boolean {
    return JSON.stringify(circuit1) == JSON.stringify(circuit2)
}
