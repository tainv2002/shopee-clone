import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
