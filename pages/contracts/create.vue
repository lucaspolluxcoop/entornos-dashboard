<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Contratos</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            :to="{ path: '/warranties/create', query: { contract: true }}"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Nueva Garantía
          </nuxt-link>
          <nuxt-link
            :to="{ path: '/users/create', query: { contract: true }}"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Nuevo Usuario
          </nuxt-link>
          <nuxt-link
            :to="{ path: '/locations/create', query: { contract: true }}"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Nueva Propiedad
          </nuxt-link>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <contract-form title="Nuevo Contrato" @saveContract="saveContract" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ContractForm from '@/components/contracts/forms/ContractForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'ContractCreate',
  components: {
    ContractForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ store, $auth, query }) {
    await store.dispatch('modules/properties/getProperties')
    await store.dispatch('modules/users/getUsers')
    await store.dispatch('modules/warranties/getWarranties')
    if (Object.keys(query).length > 0) {
      await store.commit('modules/properties/ADD_NEW_PROPERTY')
    }
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    ...mapActions('modules/contracts', {
      createContract: 'createContract',
    }),
    saveContract(contract) {
      this.createContract(contract)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Contrato creado!',
          })
          this.$router.push('/contracts')
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
