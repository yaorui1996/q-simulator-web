export function reassignArray(arr1: any[], arr2: any[]): void {
  arr1.splice(0, arr1.length)
  arr2.forEach((value) => arr1.push(value))
}
