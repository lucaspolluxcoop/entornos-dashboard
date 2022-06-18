<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <notifications></notifications>
        <div class="header-body text-center mb-7">
          <div class="text-center" style="margin-bottom: 5px">
            <h1 class="text-white">
              Administración
            </h1>
          </div>
          <div class="text-white">
            <h3 class="text-white"><strong>Panel de Control</strong></h3>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
            <div class="card-body px-lg-5 py-lg-5">
              <form
                role="form"
                @submit.prevent="handleRegister"
                @keydown.enter="handleRegister"
              >
                <base-input
                  v-model="form.username"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-single-02"
                  placeholder="Usuario"
                  name="username"
                  label="Nombre de Usuario"
                >
                </base-input>

                <validation-error :errors="apiValidationErrors.username"/>

                <base-input
                  v-model="form.email"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="test@test.com"
                  name="email"
                  label="Correo electrónico"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.email"/>

                <base-input
                  v-model="form.password"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="xxxxxxxxxxx"
                  type="password"
                  name="password"
                  label="Contraseña"
                >
                </base-input>

                <validation-error :errors="apiValidationErrors.password"/>

                <base-input
                  v-model="form.password_confirmation"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="xxxxxxxxxxx"
                  type="password"
                  name="password confirmation"
                  label="Confirmar contraseña"
                >
                </base-input>

                <validation-error
                  :errors="apiValidationErrors.password_confirmation"
                />

                <div class="row my-4">
                  <div class="col-12">
                    <base-input
                      :rules="{ required: { allowFalse: false } }"
                      name="Privacy Policy"
                    >
                      <base-checkbox
                        v-model="form.agree"
                        name="agree"
                      >
                        <span class="text-muted"
                        >Estoy de acuerdo con los
                          <a href="#!">Términos y condiciones</a></span
                        >
                      </base-checkbox>
                    </base-input>
                  </div>
                </div>
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    @click.prevent="handleRegister"
                  >Crear cuenta
                  </base-button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ValidationError from '@/components/shared/ValidationError.vue'
import formMixin from '@/mixins/form-mixin'
import BaseCheckbox from '@/components/theme/argon-core/Inputs/BaseCheckbox.vue'

export default {
  name: 'Register',
  components: { ValidationError, BaseCheckbox },
  mixins: [formMixin],
  layout: 'AuthLayout',
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.$auth.loggedIn) {
      return redirect('/dashboard');
    }
  },
  auth: 'guest',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree: false,
      },
      error: '',
      errors: [],
      // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {
    ...mapActions('modules/register', { create: 'create' }),
    handleRegister() {
      if (!this.validate()) {
        this.$notify({
          type: 'danger',
          message: this.error,
        });
        this.error = ''
        this.errors = []
      }
      else {
        const formData = {
          email: this.form.email,
          username: this.form.username,
          password: this.form.password
        }
        this.create(formData)
          .then((res) => {
            this.$notify({
              type: 'success',
              message: 'Usuario registrado!',
            });
            this.manualLogin(formData)
          })
          .catch((error) => {
            Object.values(error.response.data.errors).forEach(error => {
              this.error = this.error + '- ' + error + '<br>'
            })
            this.$notify({
              type: 'danger',
              message: this.error,
            });
            this.error = ''
          })
      }
    },
    manualLogin(formData) {
      /* extract login data  */
      const loginData = {
        username: formData.email,
        password: formData.password,
        grant_type: "password",
        client_id: this.$config.API_CLIENT_ID,
        client_secret: this.$config.API_CLIENT_SECRET,
      }
      /* login newly created user and redirect to home (redirect config is in nuxt.config) */
      this.$auth.loginWith('local', { data: loginData }).then(() => this.$router.push('/dashboard'))
    },
    validate() {
      let isValid = true
      if(!this.form.agree) {
        isValid = false
        this.errors.push('Debe aceptar los terminos y condiciones')
      }
      if(this.form.username === '') {
        isValid = false
        this.errors.push('El nombre de usuario es requerido')
      }
      if(this.form.email.length === 0) {
        isValid = false
        this.errors.push('El email es requerido')
      }
      if(this.validateEmail(this.form.email)) {
        isValid = false
        this.errors.push('El email no tiene un formato correcto')
      }
      if((this.form.password !== this.form.password_confirmation) || this.form.password.length === 0) {
        isValid = false
        this.errors.push('La contraseñas son requeridas y deben coincidir')
      }

      if(!isValid) {
        this.errors.forEach(error => {
          this.error = this.error + '- ' + error + '<br>'
        });
      }

      return isValid
    },
    validateEmail(email) {
      return !this.reg.test(email)
    }
  },
};
</script>
<style></style>
