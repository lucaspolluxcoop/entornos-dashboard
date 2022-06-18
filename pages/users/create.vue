<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Usuario</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <user-form
            ref="UserForm"
            title="Nuevo usuario"
            @saveUser="saveUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import UserForm from '@/components/users/UserForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'UserCreate',
  components: {
    UserForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ store }) {
    await store.dispatch('modules/userColleges/getColleges')
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    ...mapActions('modules/users', {
      createUser: 'createUser',
    }),
    saveUser(user) {
      this.createUser(user)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Usuario creado!',
          })
          this.$router.push('/users')
        })
        .catch((error) => {
          this.$notify({
            type: 'danger',
            message: formatCatchedErrors(error),
          })
          this.$refs.UserForm.isSubmitting = false
        })
    },
  },
}
</script>
