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
                <div
                  v-for="field in property.propertyType.ammenities"
                  :key="field.id"
                  class="col-md-3"
                >
                  <base-input
                    v-if="field.type === 'integer'"
                    v-model="formData.ammenityValues[field.value]"
                    :label="field.title"
                    :name="field.value"
                    :placeholder="field.title"
                    type="number"
                  />
                  <base-input
                    v-else-if="field.type === 'boolean'"
                    :label="field.title"
                  >
                    <el-select
                      v-model="formData.ammenityValues[field.value]"
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
                  <base-input v-else :label="field.title">
                    <el-select
                      v-model="formData.ammenityValues[field.value]"
                      autocomplete="off"
                      filterable
                      :name="field.value"
                      :placeholder="field.title"
                    >
                      <el-option
                        v-for="option in listOptions(field.ammenityValues)"
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
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import Collapse from '@/components/theme/argon-core/Collapse/Collapse'
import CollapseItem from '@/components/theme/argon-core/Collapse/CollapseItem'
import { BOOLEAN_OPTIONS } from '@/support/constants/general'

export default {
  name: 'PropertyAmmenities',
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
        ammenityValues: {},
      },
      booleanOptions: BOOLEAN_OPTIONS,
      isSubmitting: false,
    }
  },
  computed: {
    listOptions() {
      return (ammenityValues) => {
        return ammenityValues.map((ammenityValue) => {
          return { label: ammenityValue.value, value: ammenityValue.value }
        })
      }
    },
  },
  created() {
    this.completeFormDataWithAmmenities()
  },
  methods: {
    // Dynamically complete the form data with the ammenities that corresponds to the propertyType
    completeFormDataWithAmmenities() {
      // Add Ammenities
      this.property.propertyType.ammenities.forEach((ammenity) => {
        const ammenityValue = this.getAmmenityValue(ammenity)
        this.formData.ammenityValues[`${ammenity.value}`] = ammenityValue.length
          ? ammenityValue[0].value
          : ''
      })
    },

    // Compares the ammenities from the propertyType with the ones from the intermediate table to get the current values
    getAmmenityValue(ammenity) {
      return this.property.ammenityValues.filter((ammenityValue) => {
        return ammenityValue.propertyAmmenityId === ammenity.id
      })
    },
    submit() {
      this.isSubmitting = true
      const newForm = this.changeFormData(this.formData)
      this.$emit('saveAmmenities', newForm)
    },
    // Replace keys in the formData object with the id of the ammenities
    changeFormData(formData) {
      const form = { ammenityValues: {} }
      let keys = Object.keys(formData.ammenityValues)
      const values = Object.values(formData.ammenityValues)
      keys = keys.map((key) => {
        const ammenity = this.property.propertyType.ammenities.filter(
          (ammenity) => {
            return ammenity.value === key
          }
        )
        return ammenity[0].id
      })
      for (let x = 0; x < keys.length; x++) {
        form.ammenityValues[keys[x]] = values[x]
      }
      return form
    },
  },
}
</script>

<style scoped>
</style>
