<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <!-- Card header -->
        <h3 slot="title" class="mb-0">{{ title }}</h3>
        <!-- Card body -->
        <div class="card-body">
          <!-- Form groups used in grid -->
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form
              class="needs-validation"
              @submit.prevent="handleSubmit(submit)"
            >
              <div class="row mb-3">
                <div class="col-md-3">
                  <base-input
                    v-model="formData.street"
                    label="Calle"
                    name="street"
                    placeholder="Calle"
                    type="text"
                    rules="required|alpha_spaces"
                  />
                </div>
                <div class="col-md-3">
                  <base-input
                    v-model="formData.number"
                    label="Número"
                    name="number"
                    placeholder="Número"
                    type="text"
                    rules="required|numeric"
                  />
                </div>
                <div class="col-md-3">
                  <base-input
                    v-model="formData.floor"
                    label="Piso"
                    name="floor"
                    placeholder="Piso"
                    type="text"
                    rules="numeric"
                  />
                </div>
                <div class="col-md-3">
                  <base-input
                    v-model="formData.apartment"
                    label="Departamento"
                    name="apartment"
                    placeholder="Departamento"
                    type="text"
                  />
                </div>
                <div v-if="formData.stateId" class="col-md-3 form-group">
                  <label class="form-control-label"> Ciudad </label>
                  <el-select
                    v-model="formData.cityId"
                    autocomplete="off"
                    filterable
                    name="city"
                    placeholder="Seleccione una ciudad"
                    rules="required"
                  >
                    <el-option
                      v-for="option in cityOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="col-md-3">
                  <base-input
                    v-model="formData.zip"
                    label="Código Postal"
                    name="zip"
                    placeholder="Código Postal"
                    type="text"
                    rules="required|numeric"
                  />
                </div>
                <div class="col-md-3">
                  <base-input
                    v-model="formData.propertyIdentifier"
                    label="Partida Inmobiliaria"
                    :small-legend="!isUpdate ? '(Sin guiones ni espacios)' : ''"
                    name="propertyIdentifier"
                    placeholder="Partida Inmobiliaria"
                    type="text"
                    rules="required|numeric"
                    :disabled="isUpdate"
                  />
                </div>
                <div class="col-md-3">
                  <base-input
                    v-model="formData.ownerTaxId"
                    label="CUIT del titular"
                    name="ownerTaxId"
                    placeholder="CUIT del titular"
                    type="text"
                    rules="required|numeric|length:11|cuit"
                    :disabled="isUpdate"
                  />
                </div>
                <div v-if="propertyTypes" class="col-md-3 form-group">
                  <label class="form-control-label">Tipo de Inmueble</label>
                  <el-select
                    v-model="formData.propertyTypeId"
                    autocomplete="off"
                    filterable
                    name="propertyTypeId"
                    placeholder="Tipo de Inmueble"
                    rules="required"
                    :disabled="isUpdate"
                  >
                    <el-option
                      v-for="option in propertyTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div
                  v-if="
                    propertyTypes.length &&
                    formData.propertyTypeId &&
                    propertyZoneOptions.length
                  "
                  class="col-md-3 form-group"
                >
                  <label class="form-control-label">Ubicación</label>
                  <el-select
                    v-model="formData.propertyZoneId"
                    autocomplete="off"
                    filterable
                    name="propertyZoneId"
                    placeholder="Ubicación"
                  >
                    <el-option
                      v-for="option in propertyZoneOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12 text-right">
                  <base-button
                    :loading="isSubmitting"
                    native-type="submit"
                    type="primary"
                    :disabled="invalid"
                  >
                    <span v-if="!isSubmitting">Guardar</span>
                  </base-button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Select, Option, DatePicker } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import Collapse from '@/components/theme/argon-core/Collapse/Collapse'
import CollapseItem from '@/components/theme/argon-core/Collapse/CollapseItem'
import { capitalize } from '~/support/utils/string'

export default {
  name: 'PropertyForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    BaseInput,
    Collapse,
    CollapseItem,
  },
  props: {
    property: {
      type: Object,
      default: () => {
        return {
          id: null,
          street: null,
          number: null,
          floor: null,
          apartment: null,
          city: {
            id: null,
            state: {
              id: 21,
            },
          },
          zip: null,
          propertyIdentifier: null,
          ownerTaxId: null,
          propertyType: {
            id: null,
          },
          propertyZone: {
            id: null,
          },
        }
      },
    },
    title: {
      type: String,
      default: 'Usuario',
    },
  },
  data() {
    return {
      formData: {
        id: this.property.id,
        street: this.property.street,
        number: this.property.number,
        floor: this.property.floor,
        apartment: this.property.apartment,
        stateId: this.property.city.state.id,
        cityId: this.property.city.id,
        zip: this.property.zip,
        propertyIdentifier: this.property.propertyIdentifier,
        ownerTaxId: this.property.ownerTaxId,
        propertyTypeId: this.property.propertyType.id,
        propertyZoneId: this.property.propertyZone
          ? this.property.propertyZone.id
          : '',
      },
      isSubmitting: false,
    }
  },
  computed: {
    ...mapState('modules/states', {
      states: (state) => state.states,
    }),
    ...mapState('modules/propertyTypes', {
      propertyTypes: (state) => state.propertyTypes,
    }),
    propertyTypeOptions() {
      return this.propertyTypes.map((p) => {
        return { label: p.title, value: p.id }
      })
    },
    stateOptions() {
      return this.states.map((s) => {
        return { label: s.name, value: s.id }
      })
    },
    cityOptions() {
      return this.states
        .find((state) => state.id === this.formData.stateId)
        .cities.map((city) => ({
          label: capitalize(city.title),
          value: city.id,
        }))
    },
    propertyZoneOptions() {
      const type = this.propertyTypes.filter((type) => {
        return type.id === this.formData.propertyTypeId
      })
      return type[0].zones.map((z) => {
        return { label: z.title, value: z.id }
      })
    },
    isUpdate() {
      return this.property.id !== null
    },
  },
  methods: {
    submit() {
      const stopSubmitting = () => {
        this.isSubmitting = false
      }
      this.isSubmitting = true
      this.$emit('saveProperty', this.formData, stopSubmitting)
    },
  },
}
</script>

<style scoped>
</style>
