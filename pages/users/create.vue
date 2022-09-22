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
            title="Nuevo usuario"
            @saveUser="saveUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import UserForm from '@/components/users/UserForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'UserCreate',
  components: {
    UserForm,
  },
  layout: 'DashboardLayout',
  data() {
    return {
      error: '',
    }
  },
  computed: {
    ...mapState('modules/users', ['user'])
  },
  methods: {
    ...mapActions('modules/users', ['createUser']),
    ...mapMutations('modules/contracts', ['ADD_NEW_USER']),
    saveUser(user, stopSubmitting) {
      this.createUser(user)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Usuario creado!',
          })
          stopSubmitting()
          this.checkRoute()
        })
        .catch((error) => {
          this.$notify({
            type: 'danger',
            message: formatCatchedErrors(error),
          })
          stopSubmitting()
        })
    },
    checkRoute() {
      if(this.$route.query.contract === 'true') {
        this.ADD_NEW_USER(this.user)
        this.$router.push({ path: '/contracts/create', query: { userCreated: true } })
      } else {
        this.$router.push('/users')
      }
    }
  },
}
</script>
