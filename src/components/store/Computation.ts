export interface State {
  realParts: number[]
  imaginaryParts: number[]
  probabilities: number[]
}

export interface Measurement {
  step: number
  register: number
  value: number
}

export interface Sample {
  states: State[]
  measurements: Measurement[]
}

export interface ComputationCache {
  circuit: string
  samples: Sample[]
}

export const computationCaches: ComputationCache[] = []

function isCircuitInComputationCache(circuit: string): boolean {
  return computationCaches.some(
    (computationCache) => computationCache.circuit == circuit
  )
}

export function getCircuitLatestSample(circuit: string): Sample {
  if (!isCircuitInComputationCache(circuit)) {
  }
  return computationCaches.find(
    (computationCache) => computationCache.circuit == circuit
  )!.samples[0]
}
