<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Usuarios</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="/users/create"
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
            title="Listado de Usuarios"
            module="users"
            delete-title="¿Desea eliminar el usuario?"
            :per-page="getCurrentPerPage"
            :current-page="getCurrentPage"
            :columns="columns"
            :items="users"
            :total="total"
            :has-show="true"
            :has-edit="true"
            :has-delete="true"
            :filter="getRoles"
            filter-name="role"
            @update="fetchUsers"
            @delete="removeUser"
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
import { getSelectableRoles } from '~/support/utils/roles'

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
          prop: 'identifierCode',
          label: 'Cod. Identificación',
          formatter: (row, col, value, index) => `${value ?? '-'}`,
          minWidth: 160,
          sortable: true,
        },
        {
          prop: 'profile',
          label: 'Nombre',
          formatter: (row, col, value, index) =>
            `${
              value.firstName
                ? value.firstName + ' ' + value.lastName
                : value.denomination
            }`,
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
          prop: 'role.label',
          label: 'Rol',
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
    ...mapState('modules/roles', {
      roles: (state) => state.roles,
    }),
    getCurrentPerPage() {
      return this.meta ? this.meta.per_page : 5
    },
    getCurrentPage() {
      return this.meta ? this.meta.current_page : 1
    },
    getRoles() {
      return getSelectableRoles(this.roles)
    },
  },
  methods: {
    ...mapActions('modules/users', {
      getUsers: 'getUsers',
      deleteUser: 'deleteUser',
    }),
    fetchUsers(params) {
      this.getUsers({...params, ...{
        'filter[role]': this.$auth.user.role.name,
      }})
    },
    removeUser(user) {
      this.deleteUser(user.id).then((res) => {
        this.$notify({
          type: 'success',
          message: 'Usuario eliminado!',
        })
        const params = {
          perPage: this.meta.per_page,
          page: this.meta.current_page,
        }
        this.fetchUsers(params)
      })
    },
  },
}
</script>
