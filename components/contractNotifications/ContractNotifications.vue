<template>
  <div>
    <div v-if="contract">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <light-table
              title="Notificaciones"
              :module="`contract-notifications`"
              :columns="columns"
              :items="contract.notifications"
              :has-show="false"
              :has-edit="false"
              :show-pagination="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LightTable from '@/components/theme/tables/RegularTables/LightTable'

export default {
  name: 'ContracNotifications',
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
          prop: 'id',
          label: 'ID',
          minWidth: 120,
          sortable: true,
        },
        {
          prop: 'notificationManagement.title',
          label: 'Tipo de Notificación',
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'notificationReason.title',
          label: 'Motivo',
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'notificationResponse.title',
          label: 'Respuesta',
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'user.profile',
          label: 'Dirigida A',
          formatter: (row, col, value, index) =>
            `${ value.cuit + ' - ' + value.firstName + ' ' + value.lastName }`,
          minWidth: 200,
        },
      ],
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>
