<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Garantías</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <warranty-form title="Nueva Garantía" @saveWarranty="saveWarranty" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import WarrantyForm from '@/components/warranties/forms/WarrantyForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'WarrantyCreate',
  components: {
    WarrantyForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ store }) {
    await store.dispatch('modules/users/getUsers')
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    ...mapActions('modules/warranties', {
      createWarranty: 'createWarranty',
    }),
    saveWarranty(warranty) {
      this.createWarranty(warranty)
        .then((res) => {
          this.$notify({
            type: 'success',
            message: 'Garantía creada!',
          })
          this.$router.push('/warranties')
        })
        .catch((error) => {
          this.$notify({
            type: 'danger',
            message: formatCatchedErrors(error),
          })
        })
    },
  },
}
</script>
