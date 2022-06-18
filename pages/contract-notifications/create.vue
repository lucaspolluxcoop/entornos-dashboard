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
          <contract-notification-form
            title="Nueva Notificación"
            @saveNotification="saveNotification"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ContractNotificationForm from '@/components/contractNotifications/forms/ContractNotificationForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'ContractNotificationCreate',
  components: {
    ContractNotificationForm,
  },
  layout: 'DashboardLayout',
  data() {
    return {
      error: '',
    }
  },
  methods: {
    ...mapActions('modules/contractNotifications', {
      createContractNotification: 'createContractNotification',
    }),
    saveNotification(notification) {
      this.createContractNotification(notification)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Notificación creada!',
          })
          this.$router.push(`/contracts/${this.$route.query.contract}`)
        })
        .catch((error) => {
          this.$notify({
            type: 'danger',
            message: formatCatchedErrors(error),
          })
        })
    },
  },
}
</script>
