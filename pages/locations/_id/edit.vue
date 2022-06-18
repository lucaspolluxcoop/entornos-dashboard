<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Editar Inmueble</h6>
        </div>
      </div>
    </base-header>
    <div v-if="property" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <property-form
            ref="PropertyForm"
            :property="property"
            title="Datos Generales"
            @saveProperty="saveProperty"
          />
          <property-ammenities-form
            ref="PropertyAmmenities"
            :property="property"
            title="Características"
            @saveAmmenities="saveAmmenities"
          />
          <property-services-form
            ref="PropertyServices"
            :property="property"
            title="Servicios"
            @saveServices="saveServices"
          />
          <property-antiquity-form
            ref="PropertyAntiquity"
            :property="property"
            title="Antigüedad y Conservación"
            @saveAntiquity="saveAntiquity"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import PropertyForm from '@/components/properties/forms/PropertyForm'
import PropertyAmmenitiesForm from '@/components/properties/forms/PropertyAmmenitiesForm'
import PropertyServicesForm from '@/components/properties/forms/PropertyServicesForm'
import PropertyAntiquityForm from '@/components/properties/forms/PropertyAntiquityForm'

export default {
  name: 'PropertyEdit',
  components: {
    PropertyForm,
    PropertyAmmenitiesForm,
    PropertyServicesForm,
    PropertyAntiquityForm,
  },
  layout: 'DashboardLayout',
  async asyncData({ params, store }) {
    await store.dispatch('modules/properties/getProperty', params.id)
  },
  computed: {
    ...mapState('modules/properties', {
      property: (state) => state.property,
    }),
  },
  created() {},
  methods: {
    ...mapActions('modules/properties', {
      updateProperty: 'updateProperty',
      addPromertyAmmenities: 'addPromertyAmmenities',
      addPropertyServices: 'addPropertyServices',
      addPropertyAntiquity: 'addPropertyAntiquity',
    }),
    saveProperty(property) {
      this.updateProperty(property).then(() => {
        this.$notify({
          type: 'success',
          message: 'Locación actualizada!',
        })
        this.$refs.PropertyForm.isSubmitting = false
      })
    },
    saveAmmenities(propertyAmmenities) {
      const propertyWithAmmenity = {
        propertyId: this.property.id,
        propertyAmmenities,
      }
      this.addPromertyAmmenities(propertyWithAmmenity).then(() => {
        this.$notify({
          type: 'success',
          message: 'Características actualizadas!',
        })
        this.$refs.PropertyAmmenities.isSubmitting = false
      })
    },
    saveServices(propertyServices) {
      const propertyWithServices = {
        propertyId: this.property.id,
        propertyServices: { propertyServices },
      }
      this.addPropertyServices(propertyWithServices).then(() => {
        this.$notify({
          type: 'success',
          message: 'Servicios actualizados!',
        })
        this.$refs.PropertyServices.isSubmitting = false
      })
    },
    saveAntiquity(propertyWithAntiquity) {
      this.addPropertyAntiquity(propertyWithAntiquity).then(() => {
        this.$notify({
          type: 'success',
          message: 'Antiguedad y Conservación actualizada!',
        })
        this.$refs.PropertyAntiquity.isSubmitting = false
      })
    },
  },
}
</script>
