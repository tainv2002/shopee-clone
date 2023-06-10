import axios, { AxiosError, HttpStatusCode } from 'axios'
import { ErrorResponseApi } from 'src/types/utils.type'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <UnprocessableEntityError>(
  error: unknown
): error is AxiosError<UnprocessableEntityError> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export const isAxiosExpiredTokenError = <ExpiredTokenError>(error: unknown): error is AxiosError<ExpiredTokenError> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return (
    isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
}

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => {
  return Math.round((1 - sale / original) * 100) + '%'
}

const removeSpecialCharacter = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + '-i-' + id
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')

  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  return `${baseUrl}images/${avatarName}`
}
