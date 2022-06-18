<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Error</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <h1 v-if="error.statusCode === 404" class="h2 text-white mb-3">
            Página no encontrada
          </h1>
          <h1 v-else class="h2 text-white mb-3">Ocurrio un error</h1>
          <NuxtLink class="btn btn-neutral btn-sm" to="/dashboard"
            >Panel de administración</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'DashboardLayout', // you can set a custom layout for the error page
  props: ['error'],
}
</script>