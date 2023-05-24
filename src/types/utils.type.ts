export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}

export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

// Cú pháp `-?` sẽ loại bỏ undefined key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
