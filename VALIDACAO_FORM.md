# Validação de Formulário

Usaremos o YUP para validar o preenchimento do formulário, o FORMIK para gerenciar os valores preenchidos e o REACT-INPUT-MASK para criar máscaras nos inputs.
`npm i --save yup formik react-input-mask`
`npm i --save-dev @types/react-input-mask`
## FORMIK
Crie um objeto com o useFormik contendo todos os nomes (atributo _name_) dos input do formulário:
```JS
import { useFormik } from 'formik'

const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      email1: '',
      email2: '',
      cardTitular: '',
      cardCPF: '',
      cardName: '',
      cardNumber: '',
      cardValMonth: '',
      cardValYear: '',
      cardCVV: '',
      cardParcelas: 1
    },
    onSubmit: (valeus) => {
      console.log(valeus)
      // setIsPaymentComplete(true)
    }
  })

  <form>
    <label>
      <span>Nome completo: </span>
      <input
        name="fullName"
        type="text"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </label>
    <button type="submit">
      <span id="finish_payment">Finalizar compra</span>
    </button>
  </form>
```

## YUP
Adicione o esquema de validação do YUP no objeto FORMIK
```JS
import * as Yup from 'yup'

const formik = useFormik({
    initialValues: {
      ...
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome deve ter ao menos 5 letras')
        .required('Este campo é obrigatório'),
      email: Yup.string()
        .email('O email deve seguir o exemplo "nome@dominio.com"')
        .required('Este campo é obrigatório'),
      cpf: Yup.string()
        .matches(/[0-9]{11}/g, 'O CPF deve ter 11 números')
        .required('Este campo é obrigatório'),
      email1: Yup.string()
        .email('O email deve seguir o exemplo "nome@dominio.com"')
        .required('Este campo é obrigatório'),
      email2: Yup.string()
        .oneOf([Yup.ref('email1')], 'Os e-mails devem ser iguais')
        .required('Este campo é obrigatório'),
      cardTitular: Yup.string().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      ),
      cardCPF: Yup.string().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      ),
      cardName: Yup.string().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      ),
      cardNumber: Yup.number().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      ),
      cardValMonth: Yup.number().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      ),
      cardValYear: Yup.number().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      ),
      cardCVV: Yup.number().when((_, schema) =>
        isPaymentMethodCard
          ? schema.required('Este campo é obrigatório')
          : schema
      )
    }),
    onSubmit: (valeus) => {
      console.log(valeus)
      // setIsPaymentComplete(true)
    }
  })

function getErrorMessage(fieldName: string) {
  // @ts-ignore erro de tipagem da chave do dicionário
  console.log(fieldName, formik.errors[fieldName])
  const isTouched = fieldName in formik.touched
  const isValid = fieldName in formik.errors

  // @ts-ignore erro de tipagem da chave do dicionário
  if (isTouched && isValid) return formik.errors[fieldName]
  return ''
}

<label>
  <span>Nome completo: </span>
  <input
    name="fullName"
    type="text"
    value={formik.values.fullName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  <small>{getErrorMessage('fullName')}</small>
</label>
```
