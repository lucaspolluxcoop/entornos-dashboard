import { extend } from 'vee-validate'
import { validateCuit } from '@/support/rules/cuit'


extend('cuit', {
  params: ['cuit'],
  validate(value) {
    return validateCuit(value)
  },
  message: 'El CUIT ingresado no es correcto. Por favor, verificar el mismo'
})

extend('required', {
  message: 'El campo es obligatorio'
})

extend('numeric', {
  message: 'El campo solo debe poseer números'
})

extend('alpha_spaces', {
  message: 'El campo solo debe poseer letras y espacios'
})

extend('length', {
  message: 'El campo no posee la longitud correcta'
})

extend('min', {
  message: 'El campo no cumple con la longitud mínima'
})

extend('max', {
  message: 'El campo no cumple con la longitud máxima'
})

extend('email', {
  message: 'El campo no posee un formato valido de correo electrónico'
})

extend('double', {
  message: 'El campo debe poseer dos decimales'
})
