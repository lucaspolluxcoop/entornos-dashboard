<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Notificación</h6>
        </div>
      </div>
    </base-header>
    <div v-if="contractNotification" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <contract-notification-form
            :contract-notification="contractNotification"
            title="Editar notificación"
            @saveNotification="saveNotification"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ContractNotificationForm from '@/components/contractNotifications/forms/ContractNotificationForm'

export default {
  name: 'ContractEdit',
  components: {
    ContractNotificationForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ store, params }) {
    await store.dispatch(
      'modules/contractNotifications/getContractNotification',
      params.id
    )
  },
  computed: {
    ...mapState('modules/contractNotifications', {
      contractNotification: (state) => state.contractNotification,
    }),
    ...mapState('modules/contracts', {
      contract: (state) => state.contract,
    }),
  },
  methods: {
    ...mapActions('modules/contractNotifications', {
      updateContractNotification: 'updateContractNotification',
    }),
    saveNotification(notification) {
      this.updateContractNotification(notification).then(() => {
        this.$notify({
          type: 'success',
          message: 'Notificación actualizada!',
        })
        this.$router.push(`/contracts/${this.contract.id}`)
      })
    },
  },
}
</script>
