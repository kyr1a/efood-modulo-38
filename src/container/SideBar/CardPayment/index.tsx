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
import { useRef, useState } from 'react'

function scrollToError(errors: any, refs: any) {
  const fields = Object.keys(errors)
  if (fields.length > 0 && refs[fields[0]]?.current) {
    refs[fields[0]].current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    refs[fields[0]].current.focus()
  }
}

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

  const [loading, setLoading] = useState(false)

  // Refs para scroll automático
  const refs = {
    cardOwner: useRef<HTMLInputElement>(null),
    cardNumber: useRef<HTMLInputElement>(null),
    cardCode: useRef<HTMLInputElement>(null),
    cardExpiresMonth: useRef<HTMLInputElement>(null),
    cardExpiresYear: useRef<HTMLInputElement>(null)
  }

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
        .min(3, 'O nome deve ter ao menos 3 letras')
        .required('Campo obrigatório'),
      cardNumber: Yup.string()
        .matches(/^\d{13,19}$/, 'Cartão inválido (13-19 dígitos)')
        .required('Campo obrigatório'),
      cardCode: Yup.string()
        .matches(/^\d{3,4}$/, 'CVV inválido (3-4 dígitos)')
        .required('Campo obrigatório'),
      cardExpiresMonth: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, 'Mês inválido')
        .required('Campo obrigatório'),
      cardExpiresYear: Yup.string()
        .matches(/^\d{2}$/, 'Ano inválido')
        .test('valid-date', 'Data expirada', function (value) {
          const { cardExpiresMonth } = this.parent
          if (!value || !cardExpiresMonth) return false
          const exp = new Date(`20${value}`, Number(cardExpiresMonth) - 1)
          const now = new Date()
          exp.setMonth(exp.getMonth() + 1, 0)
          return exp >= now
        })
        .required('Campo obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (loading) return
      setLoading(true)
      try {
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
        await purchase({
          products: products,
          delivery: delivery,
          payment: {
            card: {
              name: values.cardOwner,
              number: values.cardNumber,
              code: parseInt(values.cardCode),
              expires: {
                month: parseInt(values.cardExpiresMonth),
                year: parseInt(values.cardExpiresYear)
              }
            }
          }
        })
      } finally {
        setLoading(false)
        setSubmitting(false)
      }
    }
  })

  // Scroll para o primeiro erro ao tentar enviar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    formik.handleSubmit()
    if (Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors, refs)
    }
  }

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
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <span>Nome no cartão *</span>
          <input
            type="text"
            name="cardOwner"
            ref={refs.cardOwner}
            value={formik.values.cardOwner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small>{formik.touched.cardOwner && formik.errors.cardOwner}</small>
        </label>
        <div>
          <label id="cardNumber">
            <span>Número do cartão *</span>
            <InputMask
              mask="9999 9999 9999 9999 9999"
              type="text"
              name="cardNumber"
              ref={refs.cardNumber}
              value={formik.values.cardNumber}
              onChange={e => {
                // Remove espaços para validação
                formik.setFieldValue('cardNumber', e.target.value.replace(/\s/g, ''))
              }}
              onBlur={formik.handleBlur}
              required
            />
            <small>{formik.touched.cardNumber && formik.errors.cardNumber}</small>
          </label>
          <label id="cardCode">
            <span>CVV *</span>
            <InputMask
              mask="9999"
              type="text"
              name="cardCode"
              ref={refs.cardCode}
              value={formik.values.cardCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <small>{formik.touched.cardCode && formik.errors.cardCode}</small>
          </label>
        </div>
        <div>
          <label>
            <span>Mês de vencimento *</span>
            <InputMask
              mask="99"
              type="text"
              name="cardExpiresMonth"
              ref={refs.cardExpiresMonth}
              value={formik.values.cardExpiresMonth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <small>{formik.touched.cardExpiresMonth && formik.errors.cardExpiresMonth}</small>
          </label>
          <label>
            <span>Ano de vencimento *</span>
            <InputMask
              mask="99"
              type="text"
              name="cardExpiresYear"
              ref={refs.cardExpiresYear}
              value={formik.values.cardExpiresYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <small>{formik.touched.cardExpiresYear && formik.errors.cardExpiresYear}</small>
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Finalizar pagamento'}
        </button>
        <button
          type="button"
          onClick={() => dispatch(changeContent('adressform'))}
          disabled={loading}
        >
          Voltar para edição de endereço
        </button>
      </form>
      <style>
        {`
          .spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid #ccc;
            border-top: 2px solid #333;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            vertical-align: middle;
            margin-right: 8px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}