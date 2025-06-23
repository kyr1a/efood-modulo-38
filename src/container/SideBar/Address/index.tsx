import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import { changeContent } from '../../../store/reducers/cart'
import { setDelivery } from '../../../store/reducers/purchase'

import StyledAdressForm from './style'

function AddressForm() {
  const dispatch = useDispatch()
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
        .required('Indique quem irá receber'),
      recAdress: Yup.string()
        .min(5, 'O endereço deve ter ao menos 5 letras')
        .required('Indique onde devemos entregar'),
      recCity: Yup.string()
        .min(5, 'A cidade deve ter ao menos 5 letras')
        .required('Indique onde devemos entregar'),
      recCode: Yup.string()
        .min(9, 'O CEP deve ter 9 caracterer')
        .max(9, 'O CEP deve ter 9 caracterer')
        .required('Indique onde devemos entregar'),
      recNum: Yup.number()
        .min(1, 'O número da casa deve ter ao menos 1 dígito')
        .required('Indique onde devemos entregar')
    }),
    onSubmit: (values) => {
      dispatch(
        setDelivery({
          receiver: values.recName,
          address: {
            description: values.recAdress,
            city: values.recCity,
            number: parseInt(values.recNum),
            zipCode: values.recCode,
            complement: values.recComp
          }
        })
      )
      dispatch(changeContent('cardform'))
    }
  })
  return (
    <StyledAdressForm>
      <h3>Entrega</h3>
      <form onSubmit={formik.handleSubmit}>
        <label>
          <span>Quem irá receber</span>
          <input
            name="recName"
            type="text"
            value={formik.values.recName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <small style={{ color: 'black' }}>{formik.errors.recName}</small>
        </label>
        <label>
          <span>Endereço</span>
          <input
            name="recAdress"
            type="text"
            value={formik.values.recAdress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <small style={{ color: 'black' }}>{formik.errors.recAdress}</small>
        </label>
        <label>
          <span>Cidade</span>
          <input
            name="recCity"
            type="text"
            value={formik.values.recCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <small style={{ color: 'black' }}>{formik.errors.recCity}</small>
        </label>
        <div>
          <label>
            <span>CEP</span>
            <InputMask
              mask="99999-999"
              name="recCode"
              type="text"
              value={formik.values.recCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <small style={{ color: 'black' }}>{formik.errors.recCode}</small>
          </label>
          <label>
            <span>Número</span>
            <input
              name="recNum"
              type="number"
              value={formik.values.recNum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <small style={{ color: 'black' }}>{formik.errors.recNum}</small>
          </label>
        </div>
        <label>
          <span>Complemento (opcional)</span>
          <input
            name="recComp"
            type="text"
            value={formik.values.recComp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <button type="submit">Continuar com o pagamento</button>
        <button type="button" onClick={() => dispatch(changeContent('cart'))}>
          Voltar para o carrinho
        </button>
      </form>
    </StyledAdressForm>
  )
}

export default AddressForm
