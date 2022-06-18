<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Garantía</h6>
        </div>
      </div>
    </base-header>
    <div v-if="warranty" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <warranty-data :warranty="warranty" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import WarrantyData from '@/components/warranties/WarrantyData'

export default {
  name: 'PropertyShow',
  components: {
    WarrantyData,
  },
  layout: 'DashboardLayout',
  async asyncData({ params, store }) {
    await store.dispatch('modules/warranties/getWarranty', params.id)
  },
  computed: {
    ...mapState('modules/warranties', {
      warranty: (state) => state.warranty,
    }),
  },
}
</script>
