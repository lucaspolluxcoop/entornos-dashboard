<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Inmuebles</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <property-form title="Nuevo Inmueble" @saveProperty="saveProperty" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import PropertyForm from '@/components/properties/forms/PropertyForm'
import { formatCatchedErrors } from '@/util/errors'

export default {
  name: 'PropertyCreate',
  components: {
    PropertyForm,
  },
  layout: 'DashboardLayout',
  computed: {
    ...mapState('modules/properties', {
      property: (state) => state.property,
    }),
  },
  methods: {
    ...mapActions('modules/properties', {
      createProperty: 'createProperty',
    }),
    saveProperty(property) {
      this.createProperty(property)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Locación creada!',
          })
          this.$router.push(`/locations/${this.property.id}/edit`)
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
