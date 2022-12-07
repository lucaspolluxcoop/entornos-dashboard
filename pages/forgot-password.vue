<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-warning py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <notifications></notifications>
        <div class="header-body text-center mb-7">
          <div class="text-center" style="margin-bottom: 5px">
            <h1 class="text-white">Recuperar contraseña</h1>
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
    <div class="container mt--9 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 py-lg-5">
              <form class="needs-validation" @submit.prevent="handleSubmit()">
                <base-input
                  v-model="form.email"
                  alternative
                  class="mb-3"
                  name="Email"
                  prepend-icon="ni ni-email-83"
                  placeholder="example@example.com"
                  label="Correo Electrónico"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.email" />
                <div class="text-center">
                  <base-button
                    :loading="loading"
                    type="primary"
                    native-type="submit"
                    class="my-4">
                      Recuperar
                  </base-button>
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
import ValidationError from '@/components/shared/ValidationError.vue'
import formMixin from '@/mixins/form-mixin'

export default {
  name: 'ForgotPassword',
  components: { ValidationError },
  mixins: [formMixin],
  layout: 'AuthLayout',
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.$auth.loggedIn) {
      return redirect('/dashboard')
    }
  },
  data() {
    return {
      form: {
        email: '',
      },
      loading: false
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true
      this.$passwordService.post(this.form)
        .then(() => {
          this.$router.push('/')
          this.$notify({
            type: 'success',
            message:
              'Le hemos enviado por correo electrónico el enlace para restablecer su contraseña!',
          })
        })
        .catch((error) => {
          this.$notify({
            type: 'danger',
            message: error,
          })
          this.loading = false
        })
    },
  },
}
</script>
