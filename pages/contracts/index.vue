<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Contratos</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="/contracts/create"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Nuevo
          </nuxt-link>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <light-table
            title="Listado de Contratos"
            module="contracts"
            delete-title="¿Desea eliminar el plan?"
            :per-page="getCurrentPerPage"
            :current-page="getCurrentPage"
            :columns="columns"
            :items="contracts"
            :total="total"
            :has-show="true"
            :has-edit="false"
            :has-delete="false"
            :is-contract="true"
            :filter="contractTypeOptions"
            filter-name="contractType"
            @update="fetchContracts"
            @delete="removeContract"
          >
            <template #actions="{ row }">
              <nuxt-link
                v-if="!isContractFinished(row)"
                title="Crear Reclamo"
                :to="`/contract-notifications/create?contract=${row.id}`"
                class="btn base-button btn-outline-warning btn-sm"
              >
                <fa icon="exclamation-circle" />
              </nuxt-link>
              <nuxt-link
                v-if="!isContractFinished(row)"
                title="Extinción de Contrato"
                :to="`/contracts/${row.id}/extintion`"
                class="btn base-button btn-outline-danger btn-sm"
              >
                <fa icon="file-alt" />
              </nuxt-link>
            </template>
          </light-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { Table, TableColumn } from 'element-ui'
import LightTable from '@/components/theme/tables/RegularTables/LightTable'

export default {
  name: 'ContractsIndex',
  components: {
    LightTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  layout: 'DashboardLayout',
  data() {
    return {
      columns: [
        {
          prop: 'contractIdentifier',
          label: 'Cod. Identificación',
          formatter: (row, col, value, index) => `${value ?? '-'}`,
          minWidth: 150,
          sortable: true,
        },
        {
          prop: 'endContract',
          label: 'Finalización del contrato',
          minWidth: 105,
          sortable: true,
        },
        {
          prop: 'contractType.title',
          label: 'Tipo de Contrato',
          minWidth: 160,
          sortable: true,
        },
        {
          prop: 'tenant.profile',
          label: 'Locatario',
          formatter: (row, col, value, index) =>
            `${value.cuit + ' - ' + value.firstName + ' ' + value.lastName}`,
          minWidth: 150,
          sortable: true,
        },
        {
          prop: 'property.propertyIdentifier',
          label: 'Identificación de Propiedad',
          minWidth: 110,
          sortable: true,
        },
        {
          prop: 'extintionDate',
          label: 'Finalización de Contrato',
          formatter: (row, col, value, index) => `${value ?? '-'}`,
          minWidth: 100,
          sortable: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      total: 'modules/contracts/contractsTotal',
    }),
    ...mapState('modules/contracts', {
      contracts: (state) => state.contracts,
      meta: (state) => state.meta,
    }),
    ...mapState('modules/contractTypes', {
      contractTypes: (state) => state.contractTypes,
    }),
    getCurrentPerPage() {
      return this.meta ? this.meta.per_page : 5
    },
    getCurrentPage() {
      return this.meta ? this.meta.current_page : 1
    },
    contractTypeOptions() {
      return this.contractTypes.map(({ id, title }) => ({
        label: title,
        value: id,
      }))
    },
  },
  methods: {
    ...mapActions('modules/contracts', {
      getContracts: 'getContracts',
      deleteContract: 'deleteContract',
    }),
    fetchContracts(params) {
      this.getContracts(params)
    },
    removeContract(contract) {
      this.deleteContract(contract.id).then(() => {
        this.$notify({
          type: 'success',
          message: 'Contrato eliminado!',
        })
        const params = {
          perPage: this.meta.per_page,
          page: this.meta.current_page,
        }
        this.fetchContracts(params)
      })
    },
    isContractFinished(contract) {
      return contract.extintionDate !== null
    }
  },
}
</script>
