<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Garantías</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="/warranties/create"
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
            title="Listado de Garantías"
            module="warranties"
            delete-title="¿Desea eliminar la garantía?"
            :per-page="getCurrentPerPage"
            :current-page="getCurrentPage"
            :columns="columns"
            :items="warranties"
            :total="total"
            :has-show="true"
            :has-delete="true"
            :filter="warrantyTypeOptions"
            filter-name="warrantyType"
            @update="fetchWarranties"
            @delete="removeWarranty"
          />
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
  name: 'WarrantiesIndex',
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
          label: 'Tipo de Garantía',
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
    ...mapGetters({
      total: 'modules/warranties/warrantiesTotal',
    }),
    ...mapState('modules/warranties', {
      warranties: (state) => state.warranties,
      meta: (state) => state.meta,
    }),
    ...mapState('modules/warrantyTypes', {
      warrantyTypes: (state) => state.warrantyTypes,
    }),
    getCurrentPerPage() {
      return this.meta ? this.meta.per_page : 5
    },
    getCurrentPage() {
      return this.meta ? this.meta.current_page : 1
    },
    warrantyTypeOptions() {
      return this.warrantyTypes.map(({ id, title }) => ({
        value: id,
        label: title,
      }))
    },
  },
  methods: {
    ...mapActions('modules/warranties', {
      getWarranties: 'getWarranties',
      deleteWarranty: 'deleteWarranty',
    }),
    fetchWarranties(params) {
      this.getWarranties(params)
    },
    removeWarranty(warranty) {
      this.deleteWarranty(warranty.id).then(() => {
        this.$notify({
          type: 'success',
          message: 'Garantía eliminada!',
        })
        const params = {
          perPage: this.meta.per_page,
          page: this.meta.current_page,
        }
        this.fetchWarranties(params)
      })
    },
  },
}
</script>
