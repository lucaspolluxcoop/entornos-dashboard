<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Administración</h6>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Contratos cargados"
            type="gradient-red"
            sub-title="5"
            icon="ni ni-active-40"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i>3</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Usuarios cargados"
            type="gradient-orange"
            sub-title="13"
            icon="ni ni-chart-pie-35"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i>8</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Propiedades cargadas"
            type="gradient-green"
            sub-title="5"
            icon="ni ni-money-coins"
          >
            <template slot="footer">
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i>2</span
              >
              <span class="text-nowrap">Desde el último mes</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <user-data :user="$auth.user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserData from '@/components/users/UserData'
export default {
  name: 'Index',
  components: {
    UserData
  },
  layout: 'DashboardLayout',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.$auth.loggedIn) {
      return redirect('/login')
    }
  }
}
</script>

<style scoped></style>
