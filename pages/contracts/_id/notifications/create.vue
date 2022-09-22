<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Notificaciones</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <notification-form
            :contract="contract"
            title="Nueva Notificación"
            @save="create" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import NotificationForm from '@/components/contracts/forms/NotificationForm'
// import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'NotificationsCreate',

  components: {
    NotificationForm,
  },

  layout: 'DashboardLayout',

  async asyncData({ store, params }) {
    await store.dispatch('modules/contracts/getContract', params.id)
  },

  data() {
    return {
      error: '',
    }
  },

  computed: {
    ...mapState('modules/contracts', ['contract']),
    ...mapState('modules/notifications', ['notification']),
  },

  methods: {
    ...mapActions('modules/notifications', ['createNotification']),
    create(notification, stopSubmitting) {
      this.createNotification(notification)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Notificación creada!',
          })
          this.$router.push(`/contracts/${this.contract.id}`)
        })
        .finally(() => {
          stopSubmitting()
        })
    },
  },
}
</script>
