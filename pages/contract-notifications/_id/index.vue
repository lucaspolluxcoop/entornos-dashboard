<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Notificación</h6>
        </div>
        <div v-if="contractNotification" class="col-lg-6 col-5 text-right">
          <nuxt-link
            :to="`/contract-notifications/${contractNotification.id}/edit`"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Editar
          </nuxt-link>
        </div>
      </div>
    </base-header>
    <div v-if="contractNotification" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <contract-notification-data
            :contract-notification="contractNotification"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ContractNotificationData from '@/components/contractNotifications/ContractNotificationData'

export default {
  name: 'ContractNotificationIndex',
  components: {
    ContractNotificationData,
  },
  layout: 'DashboardLayout',
  async asyncData({ params, store }) {
    await store.dispatch(
      'modules/contractNotifications/getContractNotification',
      params.id
    )
  },
  computed: {
    ...mapState('modules/contractNotifications', {
      contractNotification: (state) => state.contractNotification,
    }),
  },
}
</script>
