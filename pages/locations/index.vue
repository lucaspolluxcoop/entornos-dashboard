<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Inmuebles</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="/locations/create"
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
            title="Listado de Inmuebles"
            module="locations"
            delete-title="¿Desea eliminar la locación?"
            :per-page="getCurrentPerPage"
            :current-page="getCurrentPage"
            :columns="columns"
            :items="properties"
            :total="total"
            :has-show="true"
            :has-edit="true"
            :has-delete="true"
            :filter="propertyTypeOptions"
            filter-name="propertyType"
            @update="fetchProperties"
            @delete="removeProperty"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from 'element-ui'
import LightTable from '@/components/theme/tables/RegularTables/LightTable'
import { capitalize } from '~/support/utils/string'

export default {
  name: 'LocationsIndex',
  components: {
    LightTable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  layout: 'DashboardLayout',
  data() {
    return {
      columns: [
        {
          prop: 'propertyIdentifier',
          label: 'Identificación',
          minWidth: 150,
          sortable: true,
        },
        {
          prop: 'street',
          label: 'Calle',
          minWidth: 150,
          sortable: true,
        },
        {
          prop: 'number',
          label: 'Número',
          minWidth: 120,
          sortable: true,
        },
        {
          prop: 'propertyType.title',
          label: 'Tipo de Locación',
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'city.state.name',
          label: 'Provincia',
          minWidth: 150,
          sortable: true,
        },
        {
          prop: 'city.title',
          label: 'Ciudad',
          formatter: (row, col, value, index) => `${capitalize(value)}`,
          minWidth: 200,
          sortable: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      total: 'modules/properties/propertiesTotal',
    }),
    ...mapState('modules/properties', {
      properties: (state) => state.properties,
      meta: (state) => state.meta,
    }),
    ...mapState('modules/propertyTypes', {
      propertyTypes: (state) => state.propertyTypes,
    }),
    getCurrentPerPage() {
      return this.meta ? this.meta.per_page : 5
    },
    getCurrentPage() {
      return this.meta ? this.meta.current_page : 1
    },
    propertyTypeOptions() {
      return this.propertyTypes.map(({ id, title }) => ({
        label: title,
        value: id,
      }))
    },
  },
  methods: {
    ...mapActions('modules/properties', {
      getProperties: 'getProperties',
      deleteProperty: 'deleteProperty',
    }),
    fetchProperties(params) {
      this.getProperties(params)
    },
    removeProperty(property) {
      this.deleteProperty(property.id).then(() => {
        this.$notify({
          type: 'success',
          message: 'Locación eliminada!',
        })
        const params = {
          perPage: this.meta.per_page,
          page: this.meta.current_page,
        }
        this.fetchProperties(params)
      })
    },
  },
}
</script>
