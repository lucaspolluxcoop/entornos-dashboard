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
    <div v-if="contract" class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="col-md-12 col-sm-12 col-xs-12 card-wrapper">
            <light-table
              title="Garantías"
              module="warranties"
              delete-title="¿Desea eliminar la garantía?"
              :per-page="getCurrentPerPage"
              :current-page="getCurrentPage"
              :columns="columns"
              :items="contract.warranties"
              :total="total"
              :has-show="true"
              :has-delete="true"
              :show-pagination="false"
              @delete="removeWarranty"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ContractForm from '@/components/contracts/forms/ContractForm'
import LightTable from '@/components/theme/tables/RegularTables/LightTable'

export default {
  name: 'ContractEdit',
  components: {
    ContractForm,
    LightTable,
  },
  layout: 'DashboardLayout',
  async asyncData({ store, params }) {
    await store.dispatch('modules/contracts/getContract', params.id)
    await store.dispatch('modules/properties/getProperties')
    await store.dispatch('modules/users/getUsers')
  },
  data() {
    return {
      columns: [
        {
          prop: 'id',
          label: 'Id',
          minWidth: 80,
          sortable: true,
        },
        {
          prop: 'title',
          label: 'Nombre',
          minWidth: 160,
          sortable: true,
        },
        {
          prop: 'warrantyType.title',
          label: 'Expiración',
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'user.profile',
          label: 'Fiador/Garante',
          formatter: (row, col, value, index) =>
            `${
              value
                ? value.lastName
                  ? value.cuit + ' - ' + value.firstName + ' ' + value.lastName
                  : value.cuit + ' - ' + value.firstName
                : '-'
            }`,
          minWidth: 200,
          sortable: true,
        },
      ],
    }
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
