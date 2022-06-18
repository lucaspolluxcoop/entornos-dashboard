<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Usuario</h6>
        </div>
        <div v-if="user" class="col-lg-6 col-5 text-right">
          <button
            v-if="needsApproval"
            type="neutral"
            class="btn btn-neutral btn-sm"
            @click="approve"
          >
            Aprobar Usuario
          </button>
          <nuxt-link
            :to="`/users/${user.id}/edit`"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Editar
          </nuxt-link>
        </div>
      </div>
    </base-header>
    <div v-if="user" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <user-data :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UserData from '@/components/users/UserData'
import { ROLES, USER_STATES } from '~/support/constants/general'

export default {
  name: 'UsersIndex',
  components: {
    UserData,
  },
  layout: 'DashboardLayout',
  async asyncData({ store, params }) {
    await store.dispatch('modules/users/getUser', params.id)
  },
  computed: {
    ...mapState('modules/users', {
      user: (state) => state.user,
    }),
    needsApproval() {
      return (
        this.user.role.id === ROLES.COLEGIO_CI &&
        this.user.userState.id === USER_STATES.CREADO
      )
    },
  },
  methods: {
    approve() {
      this.$userService.approve(this.user.id).then(() => {
        this.$notify({
          type: 'success',
          message: 'Usuario Aprobado!',
        })
        this.$router.push('/revision-users')
      })
    },
  },
}
</script>
