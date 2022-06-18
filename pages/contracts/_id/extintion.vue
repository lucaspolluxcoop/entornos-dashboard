<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0 px-3">
            Extinción y Parametros de Referencia del Contrato
          </h6>
        </div>
      </div>
    </base-header>
    <div v-if="contract.extintionDate === null" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <contract-extintion-form
            :contract="contract"
            title="Extinción de contrato"
            @saveContract="saveContract"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ContractExtintionForm from '@/components/contracts/forms/ContractExtintionForm'

export default {
  name: 'ContractExtintion',
  components: {
    ContractExtintionForm
  },
  layout: 'DashboardLayout',
  async asyncData({ store, params }) {
    await store.dispatch('modules/contracts/getContract', params.id)
  },
  computed: {
    ...mapState('modules/contracts', {
      contract: (state) => state.contract,
    }),
  },
  methods: {
    ...mapActions('modules/contracts', {
      completeContract: 'completeContract',
      getContract: 'getContract',
    }),
    saveContract(contract) {
      this.completeContract(contract).then(() => {
        this.$notify({
          type: 'success',
          message: 'Contrato Finalizado!',
        })
        this.getContract(contract.id)
      })
    },
  },
}
</script>
