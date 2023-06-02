import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import useQueryConfig from './useQueryConfig'
import { Schema, schema } from 'src/utils/rules'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: { name: '' },
    resolver: yupResolver(nameSchema)
  })

  const onSearchSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return { register, onSearchSubmit }
}

export default useSearchProducts
