<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Tunota</h6>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Estadístico - Ejemplo 1"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Estadístico - Ejemplo 2"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Estadístico - Ejemplo 3"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
          >
            <template slot="footer">
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Último estadístico"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 54.8%</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'DashboardLayout',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.$auth.loggedIn) {
      return redirect('/login')
    }
  },
  data() {
    return {
      staticCollections: [
        { name: 'states', method: 'getStates' },
        { name: 'economicActivityTypes', method: 'getEconomicActivityTypes' },
        { name: 'roles', method: 'getRoles' },
        { name: 'plateStates', method: 'getPlateStates' },
        { name: 'propertyPublicServices', method: 'getPropertyPublicServices' },
        { name: 'propertyTypes', method: 'getPropertyTypes' },
        { name: 'propertyConservations', method: 'getPropertyConservations' },
        { name: 'propertyTerminations', method: 'getPropertyTerminations' },
        {
          name: 'propertyMaintenanceStates',
          method: 'getPropertyMaintenanceStates',
        },
        { name: 'warrantyTypes', method: 'getWarrantyTypes' },
        { name: 'contractTypes', method: 'getContractTypes' },
        { name: 'contractLocativeCanons', method: 'getContractLocativeCanons' },
        {
          name: 'contractNotificationCategories',
          method: 'getContractNotificationCategories',
        },
        {
          name: 'contractNotificationResponses',
          method: 'getContractNotificationResponses',
        },
      ],
    }
  },
  computed: {
    ...mapState('modules/states', { states: (state) => state.states }),
    ...mapState('modules/economicActivityTypes', {
      economicActivityTypes: (state) => state.economicActivityTypes,
    }),
    ...mapState('modules/roles', { roles: (state) => state.roles }),
    ...mapState('modules/plateStates', {
      plateStates: (state) => state.plateStates,
    }),
    ...mapState('modules/propertyPublicServices', {
      propertyPublicServices: (state) => state.propertyPublicServices,
    }),
    ...mapState('modules/propertyTypes', {
      propertyTypes: (state) => state.propertyTypes,
    }),
    ...mapState('modules/propertyConservations', {
      propertyConservations: (state) => state.propertyConservations,
    }),
    ...mapState('modules/propertyTerminations', {
      propertyTerminations: (state) => state.propertyTerminations,
    }),
    ...mapState('modules/propertyMaintenanceStates', {
      propertyMaintenanceStates: (state) => state.propertyMaintenanceStates,
    }),
    ...mapState('modules/warrantyTypes', {
      warrantyTypes: (state) => state.warrantyTypes,
    }),
    ...mapState('modules/contractTypes', {
      contractTypes: (state) => state.contractTypes,
    }),
    ...mapState('modules/contractLocativeCanons', {
      contractLocativeCanons: (state) => state.contractLocativeCanons,
    }),
    ...mapState('modules/contractNotificationCategories', {
      contractNotificationCategories: (state) =>
        state.contractNotificationCategories,
    }),
    ...mapState('modules/contractNotificationResponses', {
      contractNotificationResponses: (state) =>
        state.contractNotificationResponses,
    }),
  },
  created() {
    this.setStaticCollections()
  },
  methods: {
    ...mapActions('modules/states', { getStates: 'getStates' }),
    ...mapActions('modules/economicActivityTypes', {
      getEconomicActivityTypes: 'getEconomicActivityTypes',
    }),
    ...mapActions('modules/roles', { getRoles: 'getRoles' }),
    ...mapActions('modules/plateStates', { getPlateStates: 'getPlateStates' }),
    ...mapActions('modules/propertyPublicServices', {
      getPropertyPublicServices: 'getPropertyPublicServices',
    }),
    ...mapActions('modules/propertyTypes', {
      getPropertyTypes: 'getPropertyTypes',
    }),
    ...mapActions('modules/propertyConservations', {
      getPropertyConservations: 'getPropertyConservations',
    }),
    ...mapActions('modules/propertyTerminations', {
      getPropertyTerminations: 'getPropertyTerminations',
    }),
    ...mapActions('modules/propertyMaintenanceStates', {
      getPropertyMaintenanceStates: 'getPropertyMaintenanceStates',
    }),
    ...mapActions('modules/warrantyTypes', {
      getWarrantyTypes: 'getWarrantyTypes',
    }),
    ...mapActions('modules/contractTypes', {
      getContractTypes: 'getContractTypes',
    }),
    ...mapActions('modules/contractLocativeCanons', {
      getContractLocativeCanons: 'getContractLocativeCanons',
    }),
    ...mapActions('modules/contractNotificationCategories', {
      getContractNotificationCategories: 'getContractNotificationCategories',
    }),
    ...mapActions('modules/contractNotificationResponses', {
      getContractNotificationResponses: 'getContractNotificationResponses',
    }),

    setStaticCollections() {
      this.staticCollections.forEach((collection) => {
        if (this[collection.name].length === 0) {
          this[collection.method]()
        }
      })
    },
  },
}
</script>

<style scoped></style>
