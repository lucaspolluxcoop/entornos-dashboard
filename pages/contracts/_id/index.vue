<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Contrato</h6>
        </div>
      </div>
    </base-header>
    <div v-if="contract" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <contract-data :contract="contract" />
        </div>
      </div>
    </div>
    <div v-if="contract" class="container-fluid">
      <div class="row">
        <div class="col">
          <contract-warranties :contract="contract" />
        </div>
      </div>
    </div>
    <div v-if="contract" class="container-fluid">
      <div class="row">
        <div class="col">
          <contract-notifications :contract="contract" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ContractData from '@/components/contracts/ContractData'
import ContractWarranties from '@/components/warranties/ContractWarranties'
import ContractNotifications from '@/components/contractNotifications/ContractNotifications'

export default {
  name: 'ContractShow',
  components: {
    ContractData,
    ContractWarranties,
    ContractNotifications,
  },
  layout: 'DashboardLayout',
  async asyncData({ params, store }) {
    await store.dispatch('modules/contracts/getContract', params.id)
  },
  computed: {
    ...mapState('modules/contracts', {
      contract: (state) => state.contract,
    }),
  },
}
</script>
