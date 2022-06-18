<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Usuario</h6>
        </div>
      </div>
    </base-header>
    <div v-if="user" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <user-form
            ref="UserForm"
            title="Editar usuario"
            :user="user"
            @saveUser="saveUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import UserForm from '@/components/users/UserForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'UserEdit',
  components: {
    UserForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ store, params }) {
    await store.dispatch('modules/users/getUser', params.id)
    await store.dispatch('modules/userColleges/getColleges')
  },
  computed: {
    ...mapState('modules/users', {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions('modules/users', {
      updateUser: 'updateUser',
    }),
    saveUser(user) {
      this.updateUser(user)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Usuario actualizado!',
          })
          if (this.$route.query.contract) {
            this.$router.push(`/contracts/${this.$route.query.contract}/edit`)
          } else {
            this.$router.push('/users')
          }
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
