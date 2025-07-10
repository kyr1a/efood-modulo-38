import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import { useRef, useState } from 'react'

import { changeContent } from '../../../store/reducers/cart'
import { setDelivery } from '../../../store/reducers/purchase'

import StyledAdressForm from './style'

function scrollToError(errors: any, refs: any) {
  const fields = Object.keys(errors)
  if (fields.length > 0 && refs[fields[0]]?.current) {
    refs[fields[0]].current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    refs[fields[0]].current.focus()
  }
}

function AddressForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // Refs para scroll automático
  const refs = {
    recName: useRef<HTMLInputElement>(null),
    recAdress: useRef<HTMLInputElement>(null),
    recCity: useRef<HTMLInputElement>(null),
    recCode: useRef<HTMLInputElement>(null),
    recNum: useRef<HTMLInputElement>(null),
    recComp: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    cardNumber: useRef<HTMLInputElement>(null),
    cardExpiry: useRef<HTMLInputElement>(null),
    cardCVV: useRef<HTMLInputElement>(null)
  }

  const formik = useFormik({
    initialValues: {
      recName: '',
      recAdress: '',
      recCity: '',
      recCode: '',
      recNum: '',
      recComp: '',
      email: '',
      phone: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: ''
    },
    validationSchema: Yup.object({
      recName: Yup.string()
        .min(5, 'O nome deve ter ao menos 5 letras')
        .required('Campo obrigatório'),
      recAdress: Yup.string()
        .min(5, 'O endereço deve ter ao menos 5 letras')
        .required('Campo obrigatório'),
      recCity: Yup.string()
        .min(5, 'A cidade deve ter ao menos 5 letras')
        .required('Campo obrigatório'),
      recCode: Yup.string()
        .matches(/^\d{5}-?\d{3}$/, 'CEP inválido (ex: 12345-678)')
        .required('Campo obrigatório'),
      recNum: Yup.number()
        .typeError('Digite um número válido')
        .min(1, 'O número da casa deve ter ao menos 1 dígito')
        .required('Campo obrigatório'),
      email: Yup.string()
        .email('Email inválido')
        .required('Campo obrigatório'),
      phone: Yup.string()
        .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido')
        .required('Campo obrigatório'),
      cardNumber: Yup.string()
        .matches(/^\d{13,19}$/, 'Cartão inválido (13-19 dígitos)')
        .required('Campo obrigatório'),
      cardExpiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Data inválida (MM/AA)')
        .test('valid-date', 'Data expirada', value => {
          if (!value) return false
          const [month, year] = value.split('/')
          const exp = new Date(`20${year}`, Number(month) - 1)
          const now = new Date()
          exp.setMonth(exp.getMonth() + 1, 0)
          return exp >= now
        })
        .required('Campo obrigatório'),
      cardCVV: Yup.string()
        .matches(/^\d{3,4}$/, 'CVV inválido (3-4 dígitos)')
        .required('Campo obrigatório')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (loading) return
      setLoading(true)
      try {
        dispatch(
          setDelivery({
            receiver: values.recName,
            address: {
              description: values.recAdress,
              city: values.recCity,
              number: parseInt(values.recNum),
              zipCode: values.recCode,
              complement: values.recComp,
              email: values.email,
              phone: values.phone,
              card: {
                number: values.cardNumber,
                expiry: values.cardExpiry,
                cvv: values.cardCVV
              }
            }
          })
        )
        dispatch(changeContent('cardform'))
      } finally {
        setLoading(false)
        setSubmitting(false)
      }
    },
    validateOnBlur: true,
    validateOnChange: false
  })

  // Scroll para o primeiro erro ao tentar enviar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    formik.handleSubmit()
    if (Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors, refs)
    }
  }

  return (
    <StyledAdressForm>
      <h3>Entrega</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <span>Quem irá receber *</span>
          <input
            name="recName"
            type="text"
            ref={refs.recName}
            value={formik.values.recName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.recName && formik.errors.recName}</small>
        </label>
        <label>
          <span>Endereço *</span>
          <input
            name="recAdress"
            type="text"
            ref={refs.recAdress}
            value={formik.values.recAdress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.recAdress && formik.errors.recAdress}</small>
        </label>
        <label>
          <span>Cidade *</span>
          <input
            name="recCity"
            type="text"
            ref={refs.recCity}
            value={formik.values.recCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.recCity && formik.errors.recCity}</small>
        </label>
        <div>
          <label>
            <span>CEP *</span>
            <InputMask
              mask="99999-999"
              name="recCode"
              type="text"
              ref={refs.recCode}
              value={formik.values.recCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <small style={{ color: 'black' }}>{formik.touched.recCode && formik.errors.recCode}</small>
          </label>
          <label>
            <span>Número *</span>
            <input
              name="recNum"
              type="number"
              ref={refs.recNum}
              value={formik.values.recNum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <small style={{ color: 'black' }}>{formik.touched.recNum && formik.errors.recNum}</small>
          </label>
        </div>
        <label>
          <span>Complemento (opcional)</span>
          <input
            name="recComp"
            type="text"
            ref={refs.recComp}
            value={formik.values.recComp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <label>
          <span>Email *</span>
          <input
            name="email"
            type="email"
            ref={refs.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.email && formik.errors.email}</small>
        </label>
        <label>
          <span>Telefone *</span>
          <InputMask
            mask="(99) 99999-9999"
            name="phone"
            type="text"
            ref={refs.phone}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.phone && formik.errors.phone}</small>
        </label>
        <label>
          <span>Número do cartão *</span>
          <InputMask
            mask="9999 9999 9999 9999 9999"
            name="cardNumber"
            type="text"
            ref={refs.cardNumber}
            value={formik.values.cardNumber}
            onChange={e => {
              // Remove espaços para validação
              formik.setFieldValue('cardNumber', e.target.value.replace(/\s/g, ''))
            }}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.cardNumber && formik.errors.cardNumber}</small>
        </label>
        <label>
          <span>Validade (MM/AA) *</span>
          <InputMask
            mask="99/99"
            name="cardExpiry"
            type="text"
            ref={refs.cardExpiry}
            value={formik.values.cardExpiry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.cardExpiry && formik.errors.cardExpiry}</small>
        </label>
        <label>
          <span>CVV *</span>
          <InputMask
            mask="9999"
            name="cardCVV"
            type="text"
            ref={refs.cardCVV}
            value={formik.values.cardCVV}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <small style={{ color: 'black' }}>{formik.touched.cardCVV && formik.errors.cardCVV}</small>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Continuar com o pagamento'}
        </button>
        <button type="button" onClick={() => dispatch(changeContent('cart'))} disabled={loading}>
          Voltar para o carrinho
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
      </style>
    </StyledAdressForm>
  )
}

export default AddressForm