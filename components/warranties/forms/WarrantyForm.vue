<template>
  <div class="col-md-12 col-sm-12 col-xs-12 card-wrapper">
    <div class="card mb-4">
      <!-- Card header -->
      <div class="card-header">
        <h3 class="mb-0">{{ title }}</h3>
      </div>
      <!-- Card body -->
      <div class="card-body">
        <!-- Form groups used in grid -->
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form class="needs-validation" @submit.prevent="handleSubmit(submit)">
            <div class="row mb-4">
              <div class="col-md-4">
                <base-input
                  label="Tipo de Garantía"
                  name="warrantyTypeId"
                  rules="required"
                >
                  <el-select
                    v-model="formData.warrantyTypeId"
                    autocomplete="off"
                    filterable
                    name="warrantyTypeId"
                    placeholder="Tipo de Garantía"
                  >
                    <el-option
                      v-for="option in warrantyTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input label="Usuario" name="userId" rules="required">
                  <el-select
                    v-model="formData.userId"
                    autocomplete="off"
                    filterable
                    name="userId"
                    placeholder="Usuario"
                  >
                    <el-option
                      v-for="option in userOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-right">
                <base-button
                  native-type="submit"
                  type="primary"
                  :disabled="invalid"
                >
                  Guardar
                </base-button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable prefer-promise-reject-errors */
import { mapState } from 'vuex'
import { Select, Option, Upload } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import { ROLES } from '@/support/constants/general'

export default {
  name: 'WarrantyForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Upload.name]: Upload,
    BaseInput,
  },
  props: {
    warranty: {
      type: Object,
      default: () => {
        return {
          id: null,
          title: null,
          description: null,
          filePath: null,
          warrantyType: {
            id: null,
          },
          user: {
            id: null,
          },
        }
      },
    },
    title: {
      type: String,
      default: 'Formulario de Creación',
    },
  },
  data() {
    return {
      formData: {
        id: this.warranty.id,
        warrantyTypeId: this.warranty.warrantyType.id,
        userId: this.warranty.user?.id || null,
      },
      fileErrors: [],
    }
  },
  computed: {
    ...mapState('modules/warrantyTypes', {
      warrantyTypes: (state) => state.warrantyTypes,
    }),
    ...mapState('modules/users', {
      users: (state) => state.users,
    }),
    warrantyTypeOptions() {
      return this.warrantyTypes.map((warrantyType) => {
        return { label: warrantyType.title, value: warrantyType.id }
      })
    },
    userOptions() {
      return this.users
        .filter((user) => user.role.id === ROLES.GARANTE)
        .map(({ profile: { cuit, firstName, lastName }, id }) => ({
          label: `${cuit ? cuit + ' - ' : ''}${firstName} ${lastName ?? ''}`,
          value: id,
        }))
    },
  },
  methods: {
    submit() {
      this.$emit('saveWarranty', this.formData)
    },
  },
}
</script>

<style scoped>
</style>
