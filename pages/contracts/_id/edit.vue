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
          <contract-form
            :contract="contract"
            title="Editar contrato"
            @saveContract="saveContract"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ContractForm from '@/components/contracts/forms/ContractForm'

export default {
  name: 'ContractEdit',
  components: {
    ContractForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ store, params }) {
    await store.dispatch('modules/contracts/getContract', params.id)
    await store.dispatch('modules/properties/getProperties')
    await store.dispatch('modules/users/getUsers')
  },
  computed: {
    ...mapState('modules/contracts', {
      contract: (state) => state.contract,
    }),
    ...mapGetters({
      total: 'modules/warranties/warrantiesTotal',
    }),
    ...mapState('modules/warranties', {
      meta: (state) => state.meta,
    }),
    getCurrentPerPage() {
      return this.meta ? this.meta.per_page : 5
    },
    getCurrentPage() {
      return this.meta ? this.meta.current_page : 1
    },
  },
  methods: {
    ...mapActions('modules/contracts', {
      getContract: 'getContract',
      updateContract: 'updateContract',
    }),
    ...mapActions('modules/warranties', {
      deleteWarranty: 'deleteWarranty',
    }),
    removeWarranty(warranty) {
      this.deleteWarranty(warranty.id).then(() => {
        this.$notify({
          type: 'success',
          message: 'Garantía eliminada!',
        })
        this.getContract(this.$route.params.id)
      })
    },
    saveContract(contract) {
      this.updateContract(contract).then(() => {
        this.$notify({
          type: 'success',
          message: 'Contrato actualizado!',
        })
        this.$router.push('/contracts')
      })
    },
  },
}
</script>
