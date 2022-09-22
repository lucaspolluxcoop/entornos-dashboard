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
                  label="Fecha"
                  name="notificationDate"
                  rules="required"
                >
                  <el-date-picker
                    v-model="formData.date"
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
                <base-input
                  label="Seleccione"
                  rules="required"
                  name="notificationTypeId"
                >
                  <el-select
                    v-model="notificationTypeId"
                    autocomplete="off"
                    filterable
                    placeholder="Seleccione"
                  >
                    <el-option
                      v-for="option in notificationTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>-
              </div>
              <div v-if="notificationTypeId" class="col-md-4">
                <base-input
                  name="notificationManagementId"
                  label="Tipo de Gestión"
                  rules="required"
                >
                  <el-select
                    v-model="formData.notificationManagementId"
                    autocomplete="off"
                    filterable
                    placeholder="Receptor"
                  >
                    <el-option
                      v-for="option in notificationManagementOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="notificationTypeId" class="col-md-4">
                <base-input
                  name="roleId"
                  label="Dirigida a"
                  rules="required"
                >
                  <el-select
                    v-model="roleId"
                    autocomplete="off"
                    filterable
                    placeholder="Motivo"
                  >
                    <el-option
                      v-for="option in rolesOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="roleId" class="col-md-4">
                <base-input
                  name="userId"
                  :label="getLabel"
                  rules="required"
                >
                  <el-select
                    v-model="formData.userId"
                    autocomplete="off"
                    filterable
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



              <div v-if="roleId" class="col-md-4 form-group">
                <base-input
                  name="notificationReasonId"
                  label="Motivo"
                  rules="required"
                >
                  <el-select
                    v-model="formData.notificationReasonId"
                    autocomplete="off"
                    filterable
                  >
                    <el-option
                      v-for="option in notificationReasonOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="formData.notificationReasonId" class="col-md-4 form-group">
                <base-input
                  name="notificationResponseId"
                  label="Respuesta (**)"
                >
                  <el-select
                    v-model="formData.notificationResponseId"
                    autocomplete="off"
                    filterable
                  >
                    <el-option
                      v-for="option in notificationResponseOptions"
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
import { mapState } from 'vuex'
import { Select, Option, DatePicker } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import { ROLES, NOTIFICATION_OTHER_REASONS } from '@/support/constants/general'

export default {
  name: 'NotificationForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    BaseInput,
  },
  props: {
    notification: {
      type: Object,
      default: () => {
        return {
          id: null,
          date: null,
          identifier: null,
          otherReason: null,
          contract: {
            id: null,
          },
          notificationManagement: {
            id: null,
          },
          notificationReason: {
            id: null,
          },
          user: {
            id: null,
          },
          notificationResponse: {
            id: null,
          },
        }
      },
    },
    contract: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        id: this.notification.id,
        date: this.notification.date,
        notificationManagementId: null,
        notificationReasonId: null,
        notificationResponseId: null,
        contractId: this.contract.id,
        userId: null,
      },
      notificationTypeId: null,
      notificationType: null,
      roleId: null,
      rolesOptions: [
        { label: 'Locador', value: ROLES.LOCADOR },
        { label: 'Locatario', value: ROLES.LOCATARIO },
        { label: 'Garante', value: ROLES.GARANTE },
      ],
      isSubmitting: false,
    }
  },
  computed: {
    ...mapState('modules/notificationTypes', ['notificationTypes']),
    ...mapState('modules/notificationResponses', ['notificationResponses']),
    getLabel() {
      switch (this.roleId) {
        case ROLES.LOCATARIO:
          return 'Seleccione Locatario'
        case ROLES.LOCADOR:
          return 'Seleccione Locador'
        case ROLES.GARANTE:
          return 'Seleccione Garante'
        default:
          return 'Seleccione Usuario'
      }
    },

    notificationTypeOptions() {
      return this.notificationTypes.map(({ id, title }) => ({
        label: title,
        value: id,
      }))
    },
    notificationManagementOptions() {
      return this.notificationType.managements.map(({ id, title }) => ({
        label: title,
        value: id,
      }))
    },
    notificationReasonOptions() {
      return this.notificationType.reasons
        .filter(({ role }) => role.id === this.roleId)
        .map(({ id, title }) => ({
          label: title,
          value: id,
        }))
    },
    notificationResponseOptions() {
      return this.notificationResponses.map(({ id, title }) => ({
        label: title,
        value: id,
      }))
    },
    showOtherReason() {
      return NOTIFICATION_OTHER_REASONS.includes(
        this.formData.notificationReasonId
      )
    },
    userOptions() {
      if (this.roleId === ROLES.LOCADOR) {
        return [
          {
            label: `${this.contract.locator.profile.firstName} ${this.contract.locator.profile.lastName}`,
            value: this.contract.locator.id,
          },
        ]
      } else if (this.roleId === ROLES.LOCATARIO) {
        return [
          {
            label: `${this.contract.tenant.profile.firstName} ${this.contract.tenant.profile.lastName}`,
            value: this.contract.tenant.id,
          },
        ]
      } else if (this.roleId === ROLES.GARANTE) {
        return this.contract.warrants.map((warrant) => ({
          label: `${warrant.profile.firstName} ${warrant.profile.lastName}`,
          value: warrant.id,
        }))
      }
      return {}
    },
    isUpdate() {
      return this.notification.id !== null
    },
  },
  watch: {
    notificationTypeId: {
      handler(newVal) {
        this.setNotificationType(newVal)
      },
    }
  },

  created() {
    if (this.notification.id !== null) {
      this.notificationTypeId =
        this.notification.notificationManagement.notificationType.id
      this.setNotificationType(this.notificationTypeId)
      this.formData.notificationManagementId =
        this.notification.notificationManagement.id
      this.roleId = this.notification.notificationReason.role.id
      this.formData.userId = this.notification.user.id
      this.formData.notificationReasonId =
        this.notification.notificationReason.id
      this.formData.notificationResponseId =
        this.notification.notificationResponse?.id
    }
  },

  methods: {
    submit() {
      this.isSubmitting = true
      const stopSubmitting = () => {
        this.isSubmitting = false
      }
      this.$emit('save', this.formData, stopSubmitting)
    },
    setNotificationType(value) {
      this.notificationType = this.notificationTypes.find(
        ({ id }) => id === value
      )
    }
  },
}
</script>

<style lang="scss" scoped>
.small-legend {
  color: grey;
  font-size: 14px;
}
</style>
