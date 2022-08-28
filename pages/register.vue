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
              <ValidationObserver v-slot="{ handleSubmit, invalid }">
                <form class="needs-validation" @submit.prevent="handleSubmit(submit)">
                  <base-input
                    v-model="formData.email"
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="test@test.com"
                    name="email"
                    rules="required"
                    label="Correo electrónico"
                  />
                  <base-input label="Rol" rules="required">
                    <el-select
                      v-model="formData.roleId"
                      autocomplete="off"
                      filterable
                      name="roleId"
                      placeholder="Seleccione un Rol"
                      class="select-primary"
                      @change="resetRoleData('role')"
                    >
                      <el-option
                        v-for="option in roleOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                        class="select-primary"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
                  <base-input v-if="isCorredor" label="Colegio" :rules="colegioRules">
                    <el-select
                      v-model="formData.collegeId"
                      autocomplete="off"
                      filterable
                      name="collegeId"
                      placeholder="Seleccione un Colegio"
                      class="select-primary"
                    >
                      <el-option
                        v-for="option in collegeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                        class="select-primary"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
                  <base-input
                    v-model="formData.password"
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="xxxxxxxxxxx"
                    type="password"
                    name="password"
                    rules="required"
                    label="Contraseña"
                  />
                  <base-input
                    v-model="formData.passwordConfirmation"
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="xxxxxxxxxxx"
                    type="password"
                    name="password confirmation"
                    rules="required|confirmed:password"
                    label="Confirmar contraseña"
                  />
                  <div class="row my-4">
                    <div class="col-12">
                      <base-input
                        :rules="{ required: { allowFalse: false } }"
                        name="Privacy Policy"
                      >
                        <base-checkbox v-model="formData.agree" name="agree">
                          <span class="text-muted">
                            Estoy de acuerdo con los
                            <a href="#!">Términos y condiciones</a>
                          </span>
                        </base-checkbox>
                      </base-input>
                    </div>
                  </div>
                  <div class="text-center">
                    <base-button
                      type="primary"
                      class="my-4"
                      :disabled="invalid"
                      @click.prevent="handleRegister"
                    >
                      Crear cuenta
                    </base-button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import formMixin from '@/mixins/form-mixin'
import { ROLES } from '@/support/constants/general'
import BaseCheckbox from '@/components/theme/argon-core/Inputs/BaseCheckbox.vue'

export default {
  name: 'Register',
  components: { BaseCheckbox },
  mixins: [formMixin],
  layout: 'AuthLayout',
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.$auth.loggedIn) {
      return redirect('/dashboard');
    }
  },
  auth: 'guest',
  async asyncData({ store }) {
    await store.dispatch('modules/roles/getRoles')
    await store.dispatch('modules/userColleges/getColleges')
  },
  data() {
    return {
      formData: {
        email: null,
        roleId: null,
        collegeId: null,
        password: null,
        passwordConfirmation: null,
      },
      agree: false,
      allowedRoles: [ROLES.COLEGIO_CI,ROLES.CORREDOR_INMOBILIARIO],
      error: '',
      errors: [],
      // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  computed: {
    ...mapState('modules/roles', ['roles']),
    ...mapState('modules/userColleges', ['colleges']),
    roleOptions() {
      return this.roles
        .filter((role) => {
          return this.allowedRoles.includes(role.id)
        })
        .map(({id , label}) => ({ label, value:id}))
    },
    collegeOptions() {
      return this.colleges
        .map(({id , profile}) => ({ label:profile.denomination, value:id}))
    },
    isCorredor() {
      return this.formData.roleId === ROLES.CORREDOR_INMOBILIARIO
    },
    colegioRules() {
      return this.isCorredor ? 'required' : ''
    }
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
          email: this.formData.email,
          username: this.formData.username,
          password: this.formData.password
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
      if(!this.formData.agree) {
        isValid = false
        this.errors.push('Debe aceptar los terminos y condiciones')
      }
      if(this.formData.username === '') {
        isValid = false
        this.errors.push('El nombre de usuario es requerido')
      }
      if(this.formData.email.length === 0) {
        isValid = false
        this.errors.push('El email es requerido')
      }
      if(this.validateEmail(this.formData.email)) {
        isValid = false
        this.errors.push('El email no tiene un formato correcto')
      }
      if((this.formData.password !== this.formData.passwordConfirmation) || this.formData.password.length === 0) {
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
    },
    resetRoleData(role) {
      if (role === ROLES.COLEGIO_CI) {
        this.formData.collegeId = null
      }
    }
  },
};
</script>
<style></style>
