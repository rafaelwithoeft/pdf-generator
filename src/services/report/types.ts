export enum ReportColumnFormat {
  PRICE = 'PRICE',
  UPPERCASE = 'UPPERCASE',
  LOWERCASE = 'LOWERCASE'
}

export type Settings = {
  withPagination: boolean
  recordsPerPage: number
}

export type SelectOptionFilter = { label: string; value: string }

export type Column = {
  name: string
  order: number
  format?: ReportColumnFormat
  sqlColumn: string
  isVisibilityControlEnabled: boolean
}

export type Columns = {
  columns: Column[]
}

export enum Dimension {
  LINE = 'LINE',
  GROUP = 'GROUP',
  BRAND = 'BRAND',
  FAMILY = 'FAMILY',
  PERIOD = 'PERIOD',
  CUSTOMER = 'CUSTOMER',
  COLLECTION = 'COLLECTION',
  PRICE_TABLE = 'PRICE_TABLE',
  REPRESENTATIVE = 'REPRESENTATIVE'
}

export enum ReportCustomFilterType {
  TEXT = 'TEXT',
  PERIOD = 'PERIOD',
  SELECT = 'SELECT',
  TOGGLE = 'TOGGLE'
}

export const ReportFilter = {
  ...Dimension,
  ...ReportCustomFilterType
} as const

export type ReportFilterType = keyof typeof ReportFilter

export type Filter = {
  key: string
  type: ReportFilterType
  label: string
  order: number
  isRequired: boolean

  /**
   * Situational props.
   */
  options?: SelectOptionFilter[]
}

export type Filters = {
  filters: Filter[]
}

/**
 * Types.
 */
export type Totalizer = {
  key: string
  sql: string
  name: string
  order: number
}

export type Totalizers = { totalizers: Totalizer[] }
