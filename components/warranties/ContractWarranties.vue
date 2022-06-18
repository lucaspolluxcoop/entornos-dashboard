<template>
  <div>
    <div v-if="contract">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <light-table
              title="Garantías"
              module="users"
              delete-title="¿Desea eliminar la garantía?"
              :per-page="getCurrentPerPage"
              :current-page="getCurrentPage"
              :columns="columns"
              :items="contract.warrants"
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
import LightTable from '@/components/theme/tables/RegularTables/LightTable'

export default {
  name: 'ContractWarranties',
  components: {
    LightTable,
  },
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          prop: 'profile',
          label: 'Fiador/Garante',
          formatter: (row, col, value, index) =>
            `${ value.cuit + ' - ' + value.firstName + ' ' + value.lastName }`,
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'warrantyType.title',
          label: 'Expiración',
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
  },
}
</script>

<style>
</style>
