export function traverse(path: string, objectToTraverse: any): any;
export function mutate<I extends T>(path: string, objectToTraverse: T, callback: (oldValue: any) => I)