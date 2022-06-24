export function refillArray(arr1: any[], arr2: any[]): void {
  arr1.splice(0, arr1.length)
  arr2.forEach((item) => arr1.push(item))
}
