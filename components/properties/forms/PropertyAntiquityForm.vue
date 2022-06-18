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
                    v-model="formData.antiquity"
                    label="Antigüedad del inmueble"
                    name="antiquity"
                    placeholder="Antigüedad"
                    type="numeric"
                    rules="required|numeric"
                  />
                </div>
                <div v-if="propertyConservations" class="col-md-3 form-group">
                  <base-input
                    label="Estado de Conservación"
                    rules="required"
                    name="propertyConservationId"
                  >
                    <el-select
                      v-model="formData.propertyConservationId"
                      autocomplete="off"
                      filterable
                      placeholder="Seleccione Estado de Conservación"
                    >
                      <el-option
                        v-for="option in conservationOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
                </div>
                <div v-if="propertyTerminations" class="col-md-3 form-group">
                  <base-input
                    label="Terminaciones"
                    rules="required"
                    name="propertyTerminationId"
                  >
                    <el-select
                      v-model="formData.propertyTerminationId"
                      autocomplete="off"
                      filterable
                      placeholder="Seleccione Terminaciones"
                    >
                      <el-option
                        v-for="option in terminationOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      >
                      </el-option>
                    </el-select>
                  </base-input>
                </div>

                <div class="col-md-3 form-group">
                  <base-input
                    label="¿Se entrega recien pintado?"
                    rules="required"
                    name="deliveredPainted"
                  >
                    <el-select
                      v-model="formData.deliveredPainted"
                      autocomplete="off"
                      filterable
                      placeholder="¿Se entrega recien pintado?"
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
                <div class="col-md-3 form-group">
                  <base-input
                    label="¿Propietario invierte en mantenimiento?"
                    rules="required"
                    name="propertyMaintenanceStateId"
                  >
                    <el-select
                      v-model="formData.propertyMaintenanceStateId"
                      autocomplete="off"
                      filterable
                      placeholder="¿Propietario invierte en mantenimiento?"
                    >
                      <el-option
                        v-for="option in maintenanceStateOptions"
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
import { BOOLEAN_OPTIONS } from '@/support/constants/general'

export default {
  name: 'PropertyAntiquity',
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
        propertyId: this.property.id,
        antiquity: this.property.propertyAntiquity
          ? this.property.propertyAntiquity.antiquity
          : '',
        propertyConservationId: this.property.propertyAntiquity
          ? this.property.propertyAntiquity.propertyConservation.id
          : '',
        propertyTerminationId: this.property.propertyAntiquity
          ? this.property.propertyAntiquity.propertyTermination.id
          : '',
        deliveredPainted: this.property.propertyAntiquity
          ? this.property.propertyAntiquity.deliveredPainted
          : null,
        propertyMaintenanceStateId: this.property.propertyAntiquity
          ? this.property.propertyAntiquity.propertyMaintenanceState.id
          : null,
      },
      booleanOptions: BOOLEAN_OPTIONS,
      isSubmitting: false,
    }
  },
  computed: {
    ...mapState('modules/propertyConservations', {
      propertyConservations: (state) => state.propertyConservations,
    }),
    ...mapState('modules/propertyTerminations', {
      propertyTerminations: (state) => state.propertyTerminations,
    }),
    ...mapState('modules/propertyMaintenanceStates', {
      propertyMaintenanceStates: (state) => state.propertyMaintenanceStates,
    }),
    conservationOptions() {
      return this.propertyConservations.map((conservation) => {
        return { label: conservation.title, value: conservation.id }
      })
    },
    terminationOptions() {
      return this.propertyTerminations.map((termination) => {
        return { label: termination.title, value: termination.id }
      })
    },
    maintenanceStateOptions() {
      return this.propertyMaintenanceStates.map((maintenanceState) => {
        return { label: maintenanceState.title, value: maintenanceState.id }
      })
    },
  },
  created() {},
  methods: {
    submit() {
      this.isSubmitting = true
      this.$emit('saveAntiquity', this.formData)
    },
  },
}
</script>

<style scoped>
</style>
