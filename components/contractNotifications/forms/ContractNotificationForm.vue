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
              <div v-if="contract" class="col-md-4">
                <base-input label="Receptor" rules="required" name="user">
                  <el-select
                    v-model="formData.userId"
                    autocomplete="off"
                    filterable
                    placeholder="Receptor"
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
              <div class="col-md-2 form-group">
                <base-input
                  label="Fecha"
                  name="notificationDate"
                  rules="required"
                >
                  <el-date-picker
                    v-model="formData.notificationDate"
                    size="large"
                    :editable="false"
                    format="dd-MM-yyyy"
                    name="date"
                    placeholder="Fecha"
                    suffix-icon="fas fa-calendar-alt"
                    type="date"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input label="Motivo" rules="required" name="reasonId">
                  <el-select
                    v-model="formData.reasonId"
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
              <div class="col-md-4">
                <base-input
                  label="Detalle"
                  rules="required"
                  name="contractNotificationCategoryId"
                >
                  <el-select
                    v-model="formData.contractNotificationCategoryId"
                    autocomplete="off"
                    filterable
                    placeholder="Detalle"
                  >
                    <el-option
                      v-for="option in contractNotificationCategoryOptions"
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
                  label="Respuesta"
                  name="contractNotificationResponseId"
                >
                  <el-select
                    v-model="formData.contractNotificationResponseId"
                    autocomplete="off"
                    filterable
                    placeholder="Respuesta"
                  >
                    <el-option
                      v-for="option in contractNotificationResponseOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div
                v-if="formData.contractNotificationResponseId"
                class="col-md-2 form-group"
              >
                <base-input
                  label="Fecha"
                  name="responseDate"
                  :rules="hasResponse"
                >
                  <el-date-picker
                    v-model="formData.responseDate"
                    size="large"
                    :editable="false"
                    format="dd-MM-yyyy"
                    name="responseDate"
                    placeholder="Fecha"
                    suffix-icon="fas fa-calendar-alt"
                    type="date"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </base-input>
              </div>
            </div>
            <div class="row">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Select, Option, DatePicker } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'

export default {
  name: 'ContractNotificationForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    BaseInput,
  },
  props: {
    contractNotification: {
      type: Object,
      default: () => {
        return {
          id: null,
          notificationDate: null,
          responseDate: null,
          reason: {
            id: null,
          },
          contractNotificationCategory: {
            id: null,
          },
          contract: {
            id: null,
          },
          user: {
            id: null,
          },
          contractNotificationResponse: {
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
        id: this.contractNotification.id,
        notificationDate: this.contractNotification.notificationDate,
        responseDate: this.contractNotification.responseDate,
        reasonId: this.contractNotification.reason.id,
        contractNotificationCategoryId:
          this.contractNotification.contractNotificationCategory.id,
        contractId: null,
        userId: this.contractNotification.user.id,
        contractNotificationResponseId:
          this.contractNotification.contractNotificationResponse?.id || null,
      },
      isSubmitting: false,
    }
  },
  computed: {
    ...mapState('modules/contracts', {
      contract: (state) => state.contract,
      contractParts: (state) => state.contractParts,
    }),
    ...mapState('modules/contractNotificationCategories', {
      contractNotificationCategories: (state) =>
        state.contractNotificationCategories,
    }),
    ...mapState('modules/contractNotificationResponses', {
      contractNotificationResponses: (state) =>
        state.contractNotificationResponses,
    }),
    reasonOptions() {
      return this.contractNotificationCategories
        .filter((cnc) => cnc.parentId === null)
        .map(({ title, id }) => ({
          label: title,
          value: id,
        }))
    },
    contractNotificationCategoryOptions() {
      return this.contractNotificationCategories
        .filter((cnc) => cnc.parentId === this.formData.reasonId)
        .map(({ title, id }) => ({
          label: title,
          value: id,
        }))
    },
    userOptions() {
      return this.contractParts.map((user) => ({
        label: `${user.role.label} - ${user.profile.firstName} ${user.profile.lastName ?? ''}`,
        value: user.id,
      }))
    },
    contractNotificationResponseOptions() {
      return this.contractNotificationResponses.map(({ id, title }) => ({
        label: title,
        value: id,
      }))
    },
    hasResponse() {
      return this.formData.contractNotificationResponseId ? 'required' : ''
    },
  },
  created() {
    this.fetchContract()
  },
  methods: {
    ...mapActions('modules/contracts', {
      getContract: 'getContract',
      getContractParts: 'getContractParts',
    }),
    submit() {
      this.isSubmitting = true
      this.$emit('saveNotification', this.formData)
    },
    resetData() {
      this.formData.contractNotificationCategoryId = null
    },
    async fetchContract() {
      if (this.$route.query.contract) {
        await this.getContract(this.$route.query.contract)
      }
      await this.getContractParts(this.contract.id)
      this.formData.contractId = this.contract.id
    },
  },
}
</script>

<style scoped>
</style>
