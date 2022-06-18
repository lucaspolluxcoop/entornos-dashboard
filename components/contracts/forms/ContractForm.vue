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
              <div class="col-md-2 form-group">
                <base-input
                  label="Inicio de Contrato"
                  name="startContract"
                  rules="required"
                >
                  <el-date-picker
                    v-model="formData.startContract"
                    size="large"
                    :editable="false"
                    format="dd-MM-yyyy"
                    name="startContract"
                    placeholder="Inicio de Contrato"
                    suffix-icon="fas fa-calendar-alt"
                    type="date"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </base-input>
              </div>
              <div class="col-md-2 form-group">
                <base-input
                  label="Fin de Contrato"
                  name="endContract"
                  rules="required"
                >
                  <el-date-picker
                    v-model="formData.endContract"
                    size="large"
                    :editable="false"
                    format="dd-MM-yyyy"
                    name="endContract"
                    placeholder="Fin de Contrato"
                    suffix-icon="fas fa-calendar-alt"
                    type="date"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  label="Propiedad"
                  rules="required"
                  name="propertyId"
                >
                  <el-select
                    v-model="formData.propertyId"
                    autocomplete="off"
                    filterable
                    placeholder="Propiedad"
                  >
                    <el-option
                      v-for="option in propertyOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  label="Tipo de Contrato"
                  rules="required"
                  name="contractTypeId"
                >
                  <el-select
                    v-model="formData.contractTypeId"
                    autocomplete="off"
                    filterable
                    placeholder="Tipo de Contrato"
                    @change="resetCanon"
                  >
                    <el-option
                      v-for="option in contractTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="canShowCanon" class="col-md-4">
                <base-input
                  label="Canon Locativo"
                  :rules="isCanonRequired"
                  name="contractLocativeCanonId"
                >
                  <el-select
                    v-model="formData.contractLocativeCanonId"
                    autocomplete="off"
                    filterable
                    placeholder="Canon Locativo"
                  >
                    <el-option
                      v-for="option in contractLocativeCanonOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input label="Locatario" rules="required" name="tenantId">
                  <el-select
                    v-model="formData.tenantId"
                    autocomplete="off"
                    filterable
                    placeholder="Locatario"
                  >
                    <el-option
                      v-for="option in tenantOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input label="Locador" rules="required" name="locatorId">
                  <el-select
                    v-model="formData.locatorId"
                    autocomplete="off"
                    filterable
                    placeholder="Locador"
                  >
                    <el-option
                      v-for="option in locatorOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="!formData.id" class="col-md-4">
                <base-input
                  label="Garantías"
                  rules="required"
                  name="warranties"
                >
                  <el-select
                    v-model="formData.warranties"
                    multiple
                    autocomplete="off"
                    filterable
                    placeholder="Garantías"
                  >
                    <el-option
                      v-for="option in warrantyOptions"
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
import { mapState } from 'vuex'
import { Select, Option, DatePicker } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import { getPropertyFormattedData } from '@/support/utils/string'
import { ROLES, CONTRACT_TYPES } from '@/support/constants/general'

export default {
  name: 'ContractForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    BaseInput,
  },
  props: {
    contract: {
      type: Object,
      default: () => {
        return {
          id: null,
          startContract: null,
          endContract: null,
          contractLocativeCanon: {
            id: null,
          },
          warranties: [],
          contractType: {
            id: null,
          },
          property: {
            id: null,
          },
          owner: {
            id: null,
          },
          tenant: {
            id: null,
          },
          locator: {
            id: null
          }
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
        id: this.contract.id,
        startContract: this.contract.startContract,
        endContract: this.contract.endContract,
        contractLocativeCanonId:
          this.contract.contractLocativeCanon?.id || null,
        warranties: this.contract.warranties.map((warranty) => warranty.id),
        contractTypeId: this.contract.contractType?.id || null,
        propertyId: this.contract.property?.id || null,
        ownerId: this.contract.owner?.id || null,
        tenantId: this.contract.tenant?.id || null,
        locatorId: this.contract.locator?.id || null
      },
    }
  },
  computed: {
    ...mapState('modules/contractTypes', {
      contractTypes: (state) => state.contractTypes,
    }),
    ...mapState('modules/properties', {
      properties: (state) => state.properties,
    }),
    ...mapState('modules/users', {
      users: (state) => state.users,
    }),
    ...mapState('modules/warranties', {
      warranties: (state) => state.warranties,
    }),
    ...mapState('modules/contractLocativeCanons', {
      contractLocativeCanons: (state) => state.contractLocativeCanons,
    }),
    contractTypeOptions() {
      return this.contractTypes.map(({ title, id }) => ({
        label: title,
        value: id,
      }))
    },
    propertyOptions() {
      return this.properties.map((property) => ({
        label: `${getPropertyFormattedData(property)}`,
        value: property.id,
      }))
    },
    tenantOptions() {
      return this.users
        .filter((user) => user.role.id === ROLES.LOCATARIO)
        .map(({ profile, id }) => ({
          label: `${profile.cuit ? profile.cuit + '- ' : ''}${
            profile.firstName
          } ${profile.lastName ?? ''}`,
          value: id,
        }))
    },
    locatorOptions() {
      return this.users
        .filter((user) => user.role.id === ROLES.LOCADOR)
        .map(({ profile, id }) => ({
          label: `${profile.cuit ? profile.cuit + '- ' : ''}${
            profile.firstName
          } ${profile.lastName ?? ''}`,
          value: id,
        }))
    },
    warrantyOptions() {
      return this.warranties.map((warranty) => ({
        label: warranty.title,
        value: warranty.id,
      }))
    },
    contractLocativeCanonOptions() {
      return this.contractLocativeCanons.map((canon) => ({
        label: canon.title,
        value: canon.id,
      }))
    },
    canShowCanon() {
      return (
        this.formData.contractTypeId &&
        this.formData.contractTypeId !== CONTRACT_TYPES.COMODATO
      )
    },
    isCanonRequired() {
      return this.canShowCanon ? 'required' : ''
    },
  },
  methods: {
    submit() {
      this.formData.ownerId = this.$auth.user.id
      this.$emit('saveContract', this.formData)
    },
    resetCanon() {
      this.formData.contractLocativeCanonId = null
    },
  },
}
</script>

<style scoped>
</style>
