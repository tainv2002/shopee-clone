// import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

function testPriceMinMax(context: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = context.parent as { price_max: string; price_min: string }

  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Nhập lại mật khẩu là bắt buộc')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: (_, context) => testPriceMinMax(context)
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: (_, context) => testPriceMinMax(context)
    })
  })
  .required()

export type Schema = yup.InferType<typeof schema>

// type FormInputs = {
//   email: string
//   password: string
//   confirm_password: string
// }

// type RulesType = {
//   [key in keyof FormInputs]: RegisterOptions<FormInputs>
// }

// const getRules = (getValues?: UseFormGetValues<FormInputs>): RulesType => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email là bắt buộc'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5 - 160 ký tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Mật khẩu là bắt buộc'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Nhập lại mật khẩu là bắt buộc'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 ký tự'
//     },
//     validate: getValues ? (value) => value === getValues('password') || 'Mật khẩu nhập lại không đúng' : undefined
//   }
// })

// export default getRules
