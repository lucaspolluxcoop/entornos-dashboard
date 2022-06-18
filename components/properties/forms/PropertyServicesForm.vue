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
                  <base-input label="Electricidad">
                    <el-select
                      v-model="formData.propertyPublicServices.electricidad"
                      autocomplete="off"
                      filterable
                      name="electricidad"
                      placeholder="Electricidad"
                    >
                      <el-option
                        v-for="option in electricityServiceOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
                </div>
                <div class="col-md-3">
                  <base-input label="Gas">
                    <el-select
                      v-model="formData.propertyPublicServices.gas"
                      autocomplete="off"
                      filterable
                      name="gas"
                      placeholder="Gas"
                    >
                      <el-option
                        v-for="option in gasServiceOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
                </div>
                <div
                  v-for="field in otherServices"
                  :key="field.id"
                  class="col-md-3"
                >
                  <base-input :label="field.title">
                    <el-select
                      v-model="formData.propertyPublicServices[field.value]"
                      autocomplete="off"
                      filterable
                      :name="field.value"
                      :placeholder="field.title"
                    >
                      <el-option
                        v-for="option in booleanOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
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
import { Select, Option } from 'element-ui'
import { mapState } from 'vuex'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import Collapse from '@/components/theme/argon-core/Collapse/Collapse'
import CollapseItem from '@/components/theme/argon-core/Collapse/CollapseItem'
import { BOOLEAN_OPTIONS, PROPERTY_SERVICES } from '@/support/constants/general'

export default {
  name: 'PropertyServices',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    BaseInput,
    Collapse,
    CollapseItem,
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'Usuario',
    },
  },
  data() {
    return {
      formData: {
        propertyPublicServices: {},
      },
      booleanOptions: BOOLEAN_OPTIONS,
      isSubmitting: false,
      electricityServices: [],
      gasServices: [],
      otherServices: [],
    }
  },
  computed: {
    ...mapState('modules/propertyPublicServices', {
      propertyPublicServices: (state) => state.propertyPublicServices,
    }),
    electricityServiceOptions() {
      return this.electricityServices.map((electricity) => {
        return { label: electricity.title, value: electricity.id }
      })
    },
    gasServiceOptions() {
      return this.gasServices.map((gas) => {
        return { label: gas.title, value: gas.id }
      })
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.fillServices()
      this.loadSpecialServicesFormData(
        this.electricityServices,
        PROPERTY_SERVICES.ELECTRICIDAD
      )
      this.loadSpecialServicesFormData(this.gasServices, PROPERTY_SERVICES.GAS)
      this.loadOtherServicesFormData()
    },
    fillServices() {
      this.electricityServices = this.filterService(
        PROPERTY_SERVICES.ELECTRICIDAD
      )
      this.gasServices = this.filterService(PROPERTY_SERVICES.GAS)
      this.otherServices = this.propertyPublicServices.filter((pps) => {
        return (
          !pps.value.includes(PROPERTY_SERVICES.GAS) &&
          !pps.value.includes(PROPERTY_SERVICES.ELECTRICIDAD)
        )
      })
    },
    filterService(service) {
      return this.propertyPublicServices.filter((pps) => {
        return pps.value.includes(service)
      })
    },
    loadSpecialServicesFormData(services, legend) {
      services.forEach((service) => {
        const currentService = this.getCurrentServicesValues(service)
        if (currentService.length) {
          this.formData.propertyPublicServices[legend] = currentService[0].id
        }
      })

      // eslint-disable-next-line no-prototype-builtins
      if (!this.formData.propertyPublicServices.hasOwnProperty(legend)) {
        this.formData.propertyPublicServices[legend] = null
      }
    },
    loadOtherServicesFormData() {
      this.otherServices.forEach((service) => {
        const currentService = this.getCurrentServicesValues(service)
        this.formData.propertyPublicServices[service.value] =
          currentService.length ? 'S' : 'N'
      })
    },
    getCurrentServicesValues(service) {
      return this.property.propertyPublicServices.filter(
        (propertyPublicService) => {
          return propertyPublicService.id === service.id
        }
      )
    },
    submit() {
      this.isSubmitting = true
      this.$emit('saveServices', this.changeFormData(this.formData))
    },
    // Replace keys in the formData object with the id of the PropertyPublicService
    changeFormData(formData) {
      const form = []
      this.setSpecialFields(formData, form, PROPERTY_SERVICES.ELECTRICIDAD)
      this.setSpecialFields(formData, form, PROPERTY_SERVICES.GAS)
      this.setOtherFields(formData, form)

      return form
    },
    setSpecialFields(formData, form, field) {
      if (formData.propertyPublicServices[field])
        form.push(formData.propertyPublicServices[field])
    },
    setOtherFields(formData, form) {
      // create arrays with keys and values
      let keys = Object.keys(formData.propertyPublicServices)
      const values = Object.values(formData.propertyPublicServices)

      // remove electricity and gas from arrays
      const indexElectricity = keys.indexOf(PROPERTY_SERVICES.ELECTRICIDAD)
      keys.splice(indexElectricity, 1)
      values.splice(indexElectricity, 1)
      const indexGas = keys.indexOf(PROPERTY_SERVICES.GAS)
      keys.splice(indexGas, 1)
      values.splice(indexGas, 1)

      // add the rest of the fields to the form
      keys = keys.map((key) => {
        const propertyPublicService = this.propertyPublicServices.filter(
          (propertyPublicService) => {
            return propertyPublicService.value === key
          }
        )
        return propertyPublicService[0].id
      })
      for (let x = 0; x < keys.length; x++) {
        if (values[x] === 'S') {
          form.push(keys[x])
        }
      }
    },
  },
}
</script>

<style scoped>
</style>
