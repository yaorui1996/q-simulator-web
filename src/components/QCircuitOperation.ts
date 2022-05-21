export interface QCircuitOperation {
    x: number
    y: number
    i: number
    gateName: string
}

export function operationEqual(operationA: QCircuitOperation, operationB: QCircuitOperation): boolean {
    return operationA.x == operationB.x &&
        operationA.y == operationB.y &&
        operationA.i == operationB.i &&
        operationA.gateName == operationB.gateName
}
