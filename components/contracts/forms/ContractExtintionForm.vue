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
              <div class="col-md-4 form-group">
                <base-input
                  label="Fecha extinción de Contrato"
                  name="extintionDate"
                  rules="required"
                >
                  <el-date-picker
                    v-model="formData.extintionDate"
                    size="large"
                    :editable="false"
                    format="dd-MM-yyyy"
                    name="extintionDate"
                    placeholder="Fecha extinción de Contrato"
                    suffix-icon="fas fa-calendar-alt"
                    type="date"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input label="Motivo" rules="required" name="reason">
                  <el-select
                    v-model="formData.reason"
                    autocomplete="off"
                    filterable
                    placeholder="Motivo"
                    @change="resetData"
                  >
                    <el-option
                      v-for="option in reasonOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="addReasonClarification" class="col-md-4">
                <base-input
                  v-model="otherReason"
                  label="Especificar motivo"
                  name="reason2"
                  placeholder="Especificar motivo"
                  type="text"
                  :rules="clarificationRules"
                />
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
import { Select, Option, DatePicker } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import {
  EXTINTION_REASONS_WITH_LABELS,
  EXTINTION_REASONS,
} from '@/support/constants/general'

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
      required: true,
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
        extintionDate: null,
        reason: null,
      },
      otherReason: null,
    }
  },
  computed: {
    reasonOptions() {
      return EXTINTION_REASONS_WITH_LABELS.map(({ label, value }) => ({
        label,
        value,
      }))
    },
    addReasonClarification() {
      return this.formData.reason === EXTINTION_REASONS.OTRO
    },
    clarificationRules() {
      return this.addReasonClarification ? 'required' : ''
    },
  },
  methods: {
    submit() {
      const reason = this.getReasonText(this.formData)
      const formData = {
        id: this.formData.id,
        extintionDate: this.formData.extintionDate,
        reason,
      }
      this.$emit('saveContract', formData)
    },
    getReasonText(formData) {
      let reasonText = this.otherReason !== null ? this.otherReason : ''
      if (reasonText === '') {
        const reasonItem = EXTINTION_REASONS_WITH_LABELS.filter(
          (reason) => reason.value === formData.reason
        )
        reasonText = reasonItem[0].label
      }
      return reasonText
    },
    resetData() {
      this.otherReason = null
    },
  },
}
</script>

<style scoped>
</style>
