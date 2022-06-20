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
            <div class="row mb-4"> <!-- Rol y Denominación -->
              <div v-if="roles" class="col-md-4">
                <base-input label="Rol" rules="required">
                  <el-select
                    v-model="formData.roleId"
                    autocomplete="off"
                    filterable
                    name="roleId"
                    placeholder="Seleccione un Rol"
                    class="select-primary"
                    rules="required"
                    :disabled="isUpdate"
                    @change="resetRoleData('role')"
                  >
                    <el-option
                      v-for="option in roleOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                      class="select-primary"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="showDenomination" class="col-md-4">
                <base-input
                  v-model="formData.profile.denomination"
                  :label="denominationLabel"
                  name="denomination"
                  :placeholder="denominationLabel"
                  type="text"
                  :rules="denominationRules"
                />
              </div>
              <div v-if="isCollege" class="col-md-4">
                <base-input
                  v-model="formData.profile.district"
                  label="Circunscripción"
                  name="district"
                  placeholder="Circunscripción"
                  type="text"
                  :rules="collegeRules"
                />
              </div>
              <div v-if="canShowColleges" class="col-md-4">
                <base-input
                  label="Seleccione Colegio de Corredores Inmobiliario"
                  name="collegeId"
                  :rules="realStateBrokerExtraRules"
                >
                  <el-select
                    v-model="formData.collegeId"
                    autocomplete="off"
                    filterable
                    name="collegeId"
                    placeholder="Seleccione Colegio de Corredores Inmobiliario"
                    class="select-primary"
                    :disabled="isUpdate"
                    rules="required"
                  >
                    <el-option
                      v-for="option in collegeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                      class="select-primary"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-else-if="hasNoCollege" class="col-md-4 pt-3">
                <span>
                  No existe colegio asociado para la provincia seleccionada, por
                  favor cambiar la provincia seleccionada o cargar el colegio
                  previamente
                </span>
              </div>
            </div>
            <div class="row mb-4"> <!-- Localización -->
              <div v-if="formData.profile.stateId" class="col-md-4">
                <base-input label="Ciudad" rules="required">
                  <el-select
                    v-model="formData.profile.cityId"
                    autocomplete="off"
                    filterable
                    name="city"
                    placeholder="Seleccione Ciudad"
                  >
                    <el-option
                      v-for="option in cityOptions"
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
                  v-model="formData.profile.zip"
                  label="Código Postal"
                  name="zip"
                  placeholder="Código Postal"
                  type="numeric"
                  rules="required|numeric"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.street"
                  label="Calle"
                  name="street"
                  placeholder="Calle"
                  type="text"
                  rules="required"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.number"
                  label="Número"
                  name="number"
                  placeholder="Número"
                  type="numeric"
                  rules="required|numeric"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.floor"
                  label="Piso"
                  name="floor"
                  placeholder="Piso"
                  type="text"
                  rules="numeric"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.apartment"
                  label="Departamento"
                  name="apartment"
                  placeholder="Departamento"
                  type="text"
                  rules="alpha_num"
                />
              </div>
            </div>
            <div class="row mb-4"> <!-- Datos Personales -->
              <div class="col-md-4">
                <base-input
                  v-model="formData.email"
                  label="Correo Electrónico"
                  name="email"
                  placeholder="Correo Electrónico"
                  type="text"
                  :disabled="isUpdate"
                  rules="required|email"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.firstName"
                  label="Nombres"
                  name="firstName"
                  placeholder="Nombres"
                  type="text"
                  rules="required"
                  small-legend="(Como figura en el DNI)"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.lastName"
                  label="Apellidos"
                  name="lastName"
                  placeholder="Apellidos"
                  type="text"
                  rules="required"
                  small-legend="(Como figura en el DNI)"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.cuit"
                  label="CUIT / CUIL"
                  legend="(sin guiones ni espacios)"
                  name="cuit"
                  placeholder="CUIT / CUIL"
                  type="text"
                  rules="required|numeric|length:11|cuit"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.phone"
                  label="Teléfono Fijo"
                  name="phone"
                  placeholder="Teléfono Fijo"
                  type="text"
                  :rules="isPhoneRequired"
                  small-legend="(Tel. Fijo o Celular, completar al menos uno)"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.cellPhone"
                  label="Celular"
                  name="phone"
                  placeholder="Celular"
                  type="text"
                  rules="numeric|length:10"
                  small-legend="(Tel. Fijo o Celular, completar al menos uno)"
                />
              </div>
              <div v-if="showEconomicActivityType" class="col-md-4">
                <base-input
                  label="Actividad económica"
                  :rules="economicActivityTypeRules"
                >
                  <el-select
                    v-model="formData.profile.economicActivityTypeId"
                    autocomplete="off"
                    filterable
                    name="economicActivityType"
                    placeholder="Seleccione actividad económica"
                    class="select-primary"
                  >
                    <el-option
                      v-for="option in economicActivityTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                      class="select-primary"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="showOtherEconomicActivityType" class="col-md-4">
                <base-input
                  v-model="formData.profile.otherEconomicActivityTypeName"
                  label="Nombre de Actividad Económica"
                  name="otherEconomicActivityTypeName"
                  placeholder="Nombre de Actividad Económica"
                  type="text"
                  :rules="otherEconomicActivityTypeRules"
                />
              </div>
              <div v-if="showDenomination" class="col-md-4">
                <base-input
                  v-model="formData.profile.website"
                  label="Sitio Web"
                  name="website"
                  placeholder="Sitio Web"
                  type="text"
                />
              </div>
            </div>
            <div v-if="isTenant" class="row mb-4"> <!-- Locatario -->
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.familyGroupAdults"
                  label="Grupo Familiar: Cant. Adultos"
                  name="familyGroupAdults"
                  placeholder="Adultos"
                  type="numeric"
                  rules="numeric"
                />
              </div>
              <div v-if="isTenant" class="col-md-4">
                <base-input
                  v-model="formData.profile.familyGroupUnderAge"
                  label="Grupo Familiar: Cant. Menores de 16 años"
                  name="familyGroupUnderAge"
                  placeholder="Menores de 16 años"
                  type="numeric"
                  rules="numeric"
                />
              </div>
            </div>
            <div v-if="isRealStateBroker" class="row mb-4"> <!-- Corredor Inmobiliario -->
              <div class="col-md-4">
                <base-input
                  v-model="formData.profile.plate.number"
                  label="Matrícula"
                  name="plateNumber"
                  placeholder="Matrícula"
                  type="text"
                  :disabled="isUpdate"
                  :rules="`${plateRules}|max:5`"
                />
              </div>
              <div class="col-md-4 form-group">
                <base-input label="Estado de Matrícula" :rules="plateRules">
                  <el-select
                    v-model="formData.profile.plate.plateStateId"
                    autocomplete="off"
                    filterable
                    name="plateStateId"
                    placeholder="Estado de Matrícula"
                  >
                    <el-option
                      v-for="option in plateStateOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-md-4 form-group">
                <base-input
                  label="Fecha de expiración de Matrícula"
                  name="plateExpirationDate"
                  placeholder="Expiración de Matrícula"
                  :rules="plateRules"
                >
                  <el-date-picker
                    v-model="formData.profile.plate.expirationDate"
                    size="large"
                    :editable="false"
                    format="dd-MM-yyyy"
                    name="plateExpires"
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
import { mapState } from 'vuex'
import { Select, Option, DatePicker } from 'element-ui'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import { ROLES, ECONOMIC_ACTIVITY_TYPES } from '@/support/constants/general'
import { capitalize } from '~/support/utils/string'
import { getSelectableRoles } from '~/support/utils/roles'

export default {
  name: 'UserForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    BaseInput,
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: null,
          email: null,
          role: {
            id: null,
          },
          college: {
            id: null,
          },
          profile: {
            firstName: null,
            lastName: null,
            denomination: null,
            district: null,
            cuit: null,
            phone: null,
            cellPhone: null,
            economicActivityType: {
              id: null,
            },
            otherEconomicActivityTypeName: null,
            website: null,
            city: {
              id: null,
              state: {
                id: 21,
              },
            },
            zip: null,
            street: null,
            number: null,
            floor: null,
            apartment: null,
            neighbourhood: null,
            familyGroupAdults: null,
            familyGroupUnderAge: null,
            plate: {
              number: null,
              plateState: {
                id: null,
              },
              expirationDate: null,
            },
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
        id: this.user.id,
        email: this.user.email,
        roleId: this.user.role.id,
        collegeId: this.user.college?.id || null,
        profile: {
          firstName: this.user.profile.firstName,
          lastName: this.user.profile.lastName ?? null,
          denomination: this.user.profile.denomination,
          district: this.user.profile.district,
          cuit: this.user.profile.cuit ?? null,
          phone: this.user.profile.phone ?? null,
          cellPhone: this.user.profile.cellPhone ?? null,
          economicActivityTypeId: this.user.profile.economicActivityType?.id,
          otherEconomicActivityTypeName:
            this.user.profile.otherEconomicActivityTypeName ?? null,
          website: this.user.profile.website,
          cityId: this.user.profile.city?.id || null,
          zip: this.user.profile.zip,
          street: this.user.profile.street,
          number: this.user.profile.number,
          floor: this.user.profile.floor,
          apartment: this.user.profile.apartment,
          neighbourhood: this.user.profile.neighbourhood,
          familyGroupAdults: this.user.profile.familyGroupAdults ?? null,
          familyGroupUnderAge: this.user.profile.familyGroupUnderAge ?? null,
          plate: {
            number: this.user.profile.plate?.number || null,
            plateStateId: this.user.profile.plate?.plateState.id || null,
            expirationDate: this.user.profile.plate?.expirationDate || null,
          },
          stateId: this.user.profile.city?.state.id || null,
        },
      },
      isSubmitting: false,
    }
  },
  computed: {
    ...mapState('modules/roles', {
      roles: (state) => state.roles,
    }),
    ...mapState('modules/states', {
      states: (state) => state.states,
    }),
    ...mapState('modules/economicActivityTypes', {
      economicActivityTypes: (state) => state.economicActivityTypes,
    }),
    ...mapState('modules/userColleges', {
      colleges: (state) => state.colleges,
    }),
    ...mapState('modules/plateStates', {
      plateStates: (state) => state.plateStates,
    }),
    roleOptions() {
      return getSelectableRoles(this.roles)
    },
    cityOptions() {
      return this.states
        .find((state) => state.id === this.formData.profile.stateId)
        .cities.map((city) => ({
          label: capitalize(city.title),
          value: city.id,
        }))
    },
    plateStateOptions() {
      return this.plateStates.map((ps) => {
        return { label: ps.title, value: ps.id }
      })
    },
    economicActivityTypeOptions() {
      return this.economicActivityTypes.map((eat) => {
        return { label: eat.title, value: eat.id }
      })
    },
    collegeOptions() {
      return this.colleges
        .filter(
          (college) =>
            college.profile.city.state.id === this.formData.profile.stateId
        )
        .map((college) => ({
          label: college.profile.denomination,
          value: college.id,
        }))
    },
    isUpdate() {
      return this.user.id !== null
    },
    isCollege() {
      return this.formData.roleId === ROLES.COLEGIO_CI
    },
    collegeRules() {
      return this.isCollege ? 'required' : ''
    },
    isRealStateBroker() {
      return this.formData.roleId === ROLES.CORREDOR_INMOBILIARIO
    },
    realStateBrokerExtraRules() {
      return this.canShowColleges ? 'required' : ''
    },
    plateRules() {
      return this.isRealStateBroker ? 'required' : ''
    },
    canShowColleges() {
      return (
        this.isRealStateBroker &&
        this.colleges &&
        this.collegeOptions.length > 0
      )
    },
    hasNoCollege() {
      return (
        this.isRealStateBroker &&
        this.colleges &&
        this.collegeOptions.length === 0
      )
    },
    isPhoneRequired() {
      return !this.formData.profile.phone && !this.formData.profile.cellPhone
        ? 'required|numeric|length:10'
        : 'numeric|length:10'
    },
    showDenomination() {
      return this.isCollege || this.isRealStateBroker
    },
    denominationLabel() {
      return this.isCollege ? 'Denominación' : 'Denominación Comercial'
    },
    denominationRules() {
      return this.showDenomination ? 'required' : ''
    },
    showEconomicActivityType() {
      return this.isWarrant || this.isTenant
    },
    economicActivityTypeRules() {
      return this.showEconomicActivityType ? 'required' : ''
    },
    showOtherEconomicActivityType() {
      return (
        this.showEconomicActivityType &&
        this.formData.profile.economicActivityTypeId ===
          ECONOMIC_ACTIVITY_TYPES.OTRA
      )
    },
    otherEconomicActivityTypeRules() {
      return this.showOtherEconomicActivityType ? 'required' : ''
    },
    isTenant() {
      return this.formData.roleId === ROLES.LOCATARIO
    },
    isWarrant() {
      return this.formData.roleId === ROLES.GARANTE
    },
  },
  methods: {
    submit() {
      const stopSubmitting = () => {
        this.isSubmitting = false
      }
      this.isSubmitting = true
      this.$emit('saveUser', this.formData, stopSubmitting)
    },
    resetRoleData(field) {
      this.formData.collegeId = null
      this.formData.profile.denomination = null
      this.formData.profile.district = null
      this.formData.profile.plate.number = null
      this.formData.profile.plate.stateId = null
      this.formData.profile.plate.expirationDate = null
      this.formData.profile.cityId = null
    },
  },
}
</script>

<style scoped>
</style>
