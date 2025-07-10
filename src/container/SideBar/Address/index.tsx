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
  if (fields.length > 0) {
    const ref = refs[fields[0]]?.current
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
      ref.focus()
    }
  }
}

function AddressForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // Refs para scroll automático (com fallback)
  const refs = {
    recName: useRef<HTMLInputElement>(null),
    recAdress: useRef<HTMLInputElement>(null),
    recCity: useRef<HTMLInputElement>(null),
    recCode: useRef<HTMLInputElement>(null),
    recNum: useRef<HTMLInputElement>(null),
    recComp: useRef<HTMLInputElement>(null)
  }

  const formik = useFormik({
    initialValues: {
      recName: '',
      recAdress: '',
      recCity: '',
      recCode: '',
      recNum: '',
      recComp: ''
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
        .required('Campo obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (loading) return
      setLoading(true)
      try {
        dispatch(
          setDelivery({
            receiver: values.recName,
            address: {
              description: values.recAdress,
              city: values.recCity,
              number: parseInt(values.recNum, 10),
              zipCode: values.recCode,
              complement: values.recComp
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await formik.validateForm()
    if (Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors, refs)
    }
    formik.handleSubmit()
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