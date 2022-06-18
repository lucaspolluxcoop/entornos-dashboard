<template>
  <div class="card">
    <div class="border-0 card-header">
      <h3 class="mb-0">{{ title }}</h3>
    </div>

    <div
      v-if="showPagination"
      class="
        col-12
        d-flex
        justify-content-center justify-content-sm-between
        flex-wrap
      "
    >
      <el-select
        v-model="pagination.perPage"
        class="select-primary mb-3 pagination-select"
        placeholder="Per page"
      >
        <el-option
          v-for="item in pagination.perPageOptions"
          :key="item"
          class="select-primary"
          :label="item"
          :value="item"
        />
      </el-select>

      <slot name="filter">
        <el-select
          v-if="filter"
          v-model="selectedFilter"
          class="select-primary mb-3"
          :placeholder="filterName"
          @change="setFilter"
        >
          <el-option :value="null" class="select-primary" label="Todos">
          </el-option>
          <el-option
            v-for="item in filter"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </slot>

      <div>
        <base-input v-model="searchQuery" placeholder="Buscar...">
          <template slot="append">
            <fa icon="search" />
          </template>
        </base-input>
      </div>
    </div>
    <el-table
      class="table-responsive table-flush mt-3"
      header-row-class-name="thead-light"
      :data="items"
      :default-sort="defaultSort"
      @sort-change="handleSort"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.label"
        :min-width="column.minWidth"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable ? 'custom' : false"
        :formatter="column.formatter"
      />

      <slot />

      <el-table-column
        v-if="hasActions"
        :min-width="150"
        align="left"
        label="Acciones"
      >
        <div slot-scope="props">
          <nuxt-link
            v-if="hasShow"
            title="Ver"
            :to="`/${module}/${props.row.id}`"
            class="btn base-button btn-outline-primary btn-sm"
          >
            <fa icon="eye" />
          </nuxt-link>
          <nuxt-link
            v-if="hasEdit"
            title="Editar"
            :to="`/${module}/${props.row.id}/edit`"
            class="btn base-button btn-outline-info btn-sm"
          >
            <fa icon="pen" />
          </nuxt-link>

          <slot name="actions" :row="props.row" />

          <button
            v-if="hasDelete"
            title="Eliminar"
            class="btn base-button btn-outline-danger btn-sm"
            @click="deleteRow(props.row)"
          >
            <fa icon="trash" />
          </button>
        </div>
      </el-table-column>
    </el-table>

    <div
      v-if="showPagination"
      slot="footer"
      class="
        col-12
        mt-4
        d-flex
        justify-content-center justify-content-sm-between
        flex-wrap
      "
    >
      <div class>
        <p class="card-category">
          Mostrando {{ from + 1 }} a {{ to }} de {{ total }} registros
        </p>
      </div>
      <base-pagination
        v-model="pagination.currentPage"
        class="pagination-no-border"
        :per-page="pagination.perPage"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from 'element-ui'
import swal from 'sweetalert2'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
export default {
  name: 'LightTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    BaseInput,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    items: {
      required: true,
      type: [Array, Function, Object],
    },
    sortBy: {
      type: String,
      default: 'id',
    },
    sortDesc: {
      type: Boolean,
      default: true,
    },
    perPage: {
      type: Number,
      default: 5,
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    hasShow: {
      type: Boolean,
      default: false,
    },
    hasEdit: {
      type: Boolean,
      default: false,
    },
    hasDelete: {
      type: Boolean,
      default: false,
    },
    isContract: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    module: {
      type: String,
      required: true,
    },
    deleteTitle: {
      type: String,
      default: '¿Seguro desea eliminar esta fila?',
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    filterName: {
      type: String,
      default: null,
    },
    filter: {
      type: [Array, Function, Object],
      default: null,
    },
  },
  data() {
    return {
      pagination: {
        perPage: this.perPage,
        currentPage: this.currentPage,
        perPageOptions: [5, 10, 25, 50],
      },
      selectedFilter: null,
      searchQuery: '',
      sort: this.sortBy ? (this.sortDesc ? '-' : '') + this.sortBy : '',
    }
  },
  computed: {
    defaultSort() {
      if (this.sortBy) {
        return {
          prop: this.sortBy,
          order: this.sortDesc ? 'descending' : 'ascending',
        }
      }
      return {}
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.currentPage - 1)
    },
    hasActions() {
      return this.hasShow || this.hasEdit || this.hasDelete
    },
  },
  watch: {
    currentPage(newVal) {
      this.pagination.currentPage = newVal
    },
    pagination: {
      handler() {
        this.fetchTableData()
      },
      deep: true,
    },
    searchQuery(value) {
      const savedQuery = this.searchQuery

      setTimeout(() => {
        if (this.searchQuery === savedQuery) {
          this.pagination.currentPage = 1
          this.fetchTableData()
        }
      }, 1000)
    },
  },
  mounted() {
    this.fetchTableData()
  },
  methods: {
    fetchTableData() {
      const params = {
        page: this.pagination.currentPage,
        perPage: this.pagination.perPage,
        sort: this.sort,
        'filter[search]': this.searchQuery,
      }
      if (!this.$slots.filter) {
        params[`filter[${this.filterName}]`] = this.selectedFilter
      }
      this.$emit('update', params)
    },
    handleSort({ order, prop }) {
      if (order === 'ascending') {
        this.sort = prop
      } else if (order === 'descending') {
        this.sort = `-${prop}`
      } else {
        this.sort = null
      }
      this.pagination.currentPage = 1
      this.fetchTableData()
    },
    deleteRow(row) {
      swal
        .fire({
          title: this.deleteTitle,
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          buttonsStyling: false,
        })
        .then((response) => {
          if (response.isConfirmed) {
            this.$emit('delete', row)
            this.fetchTableData()
          }
        })
    },
    setFilter(value) {
      this.fetchTableData()
    },
  },
}
</script>
