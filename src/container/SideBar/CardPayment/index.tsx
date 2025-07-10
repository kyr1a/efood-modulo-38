import { useDispatch, useSelector } from 'react-redux'

import { RootReducer } from '../../../store'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import InputMask from 'react-input-mask'

import { changeContent } from '../../../store/reducers/cart'
import { setPayment } from '../../../store/reducers/purchase'

import StyledCardForm from './style'
import { formataPreco } from '../../../utilities/helper'
import { usePurchaseMutation } from '../../../services/api'

function CardPaymentForm({
  setORDER_ID
}: {
  setORDER_ID: (data: string) => void
}) {
  const dispatch = useDispatch()
  const [purchase, { data, isSuccess }] = usePurchaseMutation()
  const itens = useSelector((state: RootReducer) => state.cartReducer.itens)
  const delivery = useSelector(
    (state: RootReducer) => state.orderReducer.delivery
  )
  const payment = useSelector(
    (state: RootReducer) => state.orderReducer.payment
  )
  const products = useSelector(
    (state: RootReducer) => state.orderReducer.products
  )

  const currentYear = Number(new Date().getFullYear().toString().slice(-2))
  const currentMonth = new Date().getMonth() + 1

  const formik = useFormik({
    initialValues: {
      cardOwner: '',
      cardNumber: '',
      cardCode: '',
      cardExpiresMonth: '',
      cardExpiresYear: ''
    },
    validationSchema: Yup.object({
      cardOwner: Yup.string()
        .min(3, 'O nome deve ter ao menos 3 letras ')
        .required('Este campo é obrigatório'),
      cardNumber: Yup.string()
        .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'O número deve ter 16 dígitos')
        .required('Este campo é obrigatório'),
      cardCode: Yup.string()
        .matches(/^\d{3}$/, 'O CVV deve ter 3 dígitos')
        .required('Este campo é obrigatório'),
      cardExpiresMonth: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, 'Mês inválido')
        .required('Este campo é obrigatório'),
      cardExpiresYear: Yup.string()
        .matches(/^\d{2}$/, 'Ano inválido')
        .test('ano-nao-expirado', 'Ano inválido', function (value) {
          if (!value) return false
          const year = Number(value)
          return year >= currentYear
        })
        .required('Este campo é obrigatório')
    }).test(
      'cartao-nao-expirado',
      'Cartão expirado',
      function (values) {
        if (
          !values.cardExpiresMonth ||
          !values.cardExpiresYear ||
          !/^\d{2}$/.test(values.cardExpiresYear) ||
          !/^(0[1-9]|1[0-2])$/.test(values.cardExpiresMonth)
        ) {
          return true // outros erros já serão exibidos
        }
        const year = Number(values.cardExpiresYear)
        const month = Number(values.cardExpiresMonth)
        if (year > currentYear) return true
        if (year === currentYear && month >= currentMonth) return true
        return false
      }
    ),
    onSubmit: (values) => {
      dispatch(
        setPayment({
          card: {
            name: values.cardOwner,
            number: values.cardNumber,
            code: parseInt(values.cardCode),
            expires: {
              month: parseInt(values.cardExpiresMonth),
              year: parseInt(values.cardExpiresYear)
            }
          }
        })
      )
      purchase({
        products: products,
        delivery: delivery,
        payment: payment
      })
    }
  })

  if (isSuccess && data) {
    dispatch(changeContent('ordermsg'))
    setORDER_ID(data.orderId as string)
  }
  return (
    <StyledCardForm>
      <h3>
        Pagamento - Valor a pagar{' '}
        {formataPreco(
          itens.reduce((acc, val) => {
            return (acc += val.preco)
          }, 0)
        )}
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <label>
          <span>Nome no cartão</span>
          <input
            type="text"
            name="cardOwner"
            value={formik.values.cardOwner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cardOwner && formik.errors.cardOwner && (
            <small>{formik.errors.cardOwner}</small>
          )}
        </label>
        <div>
          <label id="cardNumber">
            <span>Número do cartão</span>
            <InputMask
              mask="9999-9999-9999-9999"
              type="text"
              name="cardNumber"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <small>{formik.errors.cardNumber}</small>
            )}
          </label>
          <label id="cardCode">
            <span>CVV</span>
            <InputMask
              mask="999"
              type="text"
              name="cardCode"
              value={formik.values.cardCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardCode && formik.errors.cardCode && (
              <small>{formik.errors.cardCode}</small>
            )}
          </label>
        </div>
        <div>
          <label>
            <span>Mês de vencimento</span>
            <InputMask
              mask="99"
              type="text"
              name="cardExpiresMonth"
              value={formik.values.cardExpiresMonth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardExpiresMonth && formik.errors.cardExpiresMonth && (
              <small>{formik.errors.cardExpiresMonth}</small>
            )}
          </label>
          <label>
            <span>Ano de vencimento</span>
            <InputMask
              mask="99"
              type="text"
              name="cardExpiresYear"
              value={formik.values.cardExpiresYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardExpiresYear && formik.errors.cardExpiresYear && (
              <small>{formik.errors.cardExpiresYear}</small>
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Finalizar pagamento
        </button>
        <button
          type="button"
          onClick={() => dispatch(changeContent('adressform'))}
        >
          Voltar par a edição de endereço
        </button>
      </form>
    </StyledCardForm>
  )
}

export default CardPaymentForm
