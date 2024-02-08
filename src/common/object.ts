export interface ObjectLiteral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * Transform JSON to String.
 */
export const JSONToString = (data: ObjectLiteral) => JSON.stringify(data)
