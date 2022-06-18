<template>
  <div>
    <base-header class="pb-6 bg-warning">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Locación</h6>
        </div>
        <div v-if="property" class="col-lg-6 col-5 text-right">
          <nuxt-link
            :to="`/locations/${property.id}/edit`"
            type="neutral"
            class="btn btn-neutral btn-sm"
          >
            Editar
          </nuxt-link>
        </div>
      </div>
    </base-header>
    <div v-if="property" class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <property-data :property="property" />
          <property-ammenities-data
            v-if="property.ammenityValues.length"
            :property="property"
          />
          <property-public-services-data
            v-if="property.propertyPublicServices.length"
            :property="property"
          />
          <property-antiquity-data
            v-if="property.propertyAntiquity"
            :property="property"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PropertyData from '@/components/properties/PropertyData'
import PropertyAmmenitiesData from '@/components/properties/PropertyAmmenitiesData'
import PropertyPublicServicesData from '@/components/properties/PropertyPublicServicesData'
import PropertyAntiquityData from '@/components/properties/PropertyAntiquityData'

export default {
  name: 'PropertyShow',
  components: {
    PropertyData,
    PropertyAmmenitiesData,
    PropertyPublicServicesData,
    PropertyAntiquityData,
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
}
</script>
