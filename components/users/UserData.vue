<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">
          Usuario: {{ user.profile.firstName }} {{ user.profile.lastName }} {{ getIdentifier }}
        </h3>
        <div class="row mb-4"> <!-- Rol y denominación -->
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Rol</p>
              <p>{{ user.role.label }}</p>
            </div>
          </div>
          <div v-if="showDenomination" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Denominación</p>
              <p>{{ user.profile.denomination }}</p>
            </div>
          </div>
          <div v-if="isCollege" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Distrito</p>
              <p>{{ user.profile.district }}</p>
            </div>
          </div>
          <div v-if="isRealStateBroker" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Colegio</p>
              <p>{{ user.college.profile.name }}</p>
            </div>
          </div>
        </div>
        <div class="row mb-4"> <!-- Ubicación -->
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Ciudad</p>
              <p>
                {{ user.profile.city ? getUserCity : '-' }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Calle</p>
              <p>
                {{ user.profile.street | displayDashWhenEmpty }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Número</p>
              <p>
                {{ user.profile.number | displayDashWhenEmpty }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Piso</p>
              <p>
                {{ user.profile.floor | displayDashWhenEmpty }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Departamento</p>
              <p>
                {{ user.profile.apartment | displayDashWhenEmpty }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Código Postal</p>
              <p>{{ user.profile.zip }}</p>
            </div>
          </div>
        </div>
        <div class="row mb-4"> <!-- Datos Personales -->
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Email</p>
              <p>{{ user.email }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Nombres</p>
              <p>{{ user.profile.firstName }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Apellidos</p>
              <p>{{ user.profile.lastName }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">CUIT</p>
              <p>{{ user.profile.cuit }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Teléfono Fijo</p>
              <p>{{ user.profile.phone | displayDashWhenEmpty }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Celular</p>
              <p>{{ user.profile.cellPhone | displayDashWhenEmpty }}</p>
            </div>
          </div>
          <div v-if="showEconomicActivityType" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Actividad Económica</p>
              <p>{{ user.profile.economicActivityType.title }}</p>
            </div>
          </div>
          <div v-if="showEconomicActivityType" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Otro tipo de actividad económica</p>
              <p>
                {{
                  user.profile.otherEconomicActivityTypeName
                    | displayDashWhenEmpty
                }}
              </p>
            </div>
          </div>
          <div v-if="showDenomination" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Sitio Web</p>
              <p>{{ user.profile.website | displayDashWhenEmpty }}</p>
            </div>
          </div>
        </div>
        <div v-if="isTenant" class="row mb-4"> <!-- Locatario -->
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Grupo Familiar: Cant. Adultos</p>
              <p>
                {{ user.profile.familyGroupAdults | displayDashWhenEmpty }}
              </p>
            </div>
          </div>
          <div v-if="isTenant" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Grupo Familiar: Cant. Menores de 16 años</p>
              <p>
                {{ user.profile.familyGroupUnderAge | displayDashWhenEmpty }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="isRealStateBroker" class="row mb-4"> <!-- Corredor Inmobiliario -->
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Matrícula</p>
              <p>{{ user.profile.plate.number }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Estado de Matrícula</p>
              <p>
                {{ user.profile.plate.plateState.title }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Expiración de Matrícula</p>
              <p>{{ user.profile.plate.expirationDate }}</p>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Fecha de creación</p>
              <p v-if="user.createdAt">{{ user.createdAt | dateTime }}</p>
              <p v-else>-</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Fecha de ultimo ingreso</p>
              <p v-if="user.updatedAt">
                {{ user.updatedAt | dateTime }}
              </p>
              <p v-else>-</p>
            </div>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import Collapse from '@/components/theme/argon-core/Collapse/Collapse'
import CollapseItem from '@/components/theme/argon-core/Collapse/CollapseItem'
import { ROLES } from '@/support/constants/general'
import { capitalize } from '~/support/utils/string'

export default {
  name: 'UserData',
  components: {
    Collapse,
    CollapseItem,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getIdentifier() {
      return this.user.identifierCode ? `- ${this.user.identifierCode}` : ''
    },
    isRealStateBroker() {
      return this.user.role.id === ROLES.CORREDOR_INMOBILIARIO
    },
    getUserCity() {
      return capitalize(this.user.profile.city.title)
    },
    showDenomination() {
      return this.isCollege || this.isRealStateBroker
    },
    isCollege() {
      return this.user.role.id === ROLES.COLEGIO_CI
    },
    showEconomicActivityType() {
      return this.user.role.id === ROLES.GARANTE
    },
    isTenant() {
      return this.user.role.id === ROLES.LOCATARIO
    },
    getUserFileUrl() {
      return `${this.$config.apiURL}/storage/users/${this.user.collegeFilePath}`
    },
  },
}
</script>

<style>
</style>
