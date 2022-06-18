<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">
            Usuarios Pendientes de Revisión
          </h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <light-table
            title="Listado de Usuarios Pendientes"
            module="users"
            :per-page="getCurrentPerPage"
            :current-page="getCurrentPage"
            :columns="columns"
            :items="users"
            :total="total"
            :has-show="true"
            @update="fetchRevisionUsers"
            @approve="approve"
          >
          </light-table>
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
import { USER_STATES, ROLES } from '@/support/constants/general'

export default {
  name: 'UsersIndex',
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
          prop: 'id',
          label: 'Id',
          minWidth: 80,
          sortable: true,
        },
        {
          prop: 'profile',
          label: 'Nombre',
          formatter: (row, col, value, index) => `${value.denomination}`,
          minWidth: 200,
          sortable: true,
        },
        {
          prop: 'email',
          label: 'E-mail',
          minWidth: 250,
          sortable: true,
        },
        {
          prop: 'profile.city',
          label: 'Ubicación',
          formatter: (row, col, value, index) =>
            `${value.state.name + ': ' + value.title}`,
          minWidth: 150,
          sortable: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      total: 'modules/users/usersTotal',
    }),
    ...mapState('modules/users', {
      users: (state) => state.users,
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
    ...mapActions('modules/users', {
      getUsers: 'getUsers',
      approveUser: 'approveUser',
    }),
    fetchRevisionUsers(params) {
      const customParams = {
        'filter[userState]': USER_STATES.CREADO,
        'filter[role]': ROLES.COLEGIO_CI,
      }
      this.getUsers({ ...params, ...customParams })
    },
    approve(user) {
      this.approveUser(user.id).then((res) => {
        this.$notify({
          type: 'success',
          message: 'Usuario Aprobado!',
        })
        this.fetchRevisionUsers({
          perPage: this.meta.per_page,
          page: this.meta.current_page,
        })
      })
    },
  },
}
</script>
