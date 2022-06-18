<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">Servicios Públicos</h3>

        <div class="row mb-3">
          <div
            v-for="publicService in propertyPublicServices"
            :key="publicService.id"
            class="col-sm-12 col-md-3"
          >
            <div>
              <p class="h5 mb-0">{{ publicService.title }}</p>
              <p>{{ getServiceValue(publicService) }}</p>
            </div>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Collapse from '@/components/theme/argon-core/Collapse/Collapse'
import CollapseItem from '@/components/theme/argon-core/Collapse/CollapseItem'

export default {
  name: 'PropertyPublicServices',
  components: {
    Collapse,
    CollapseItem,
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('modules/propertyPublicServices', {
      propertyPublicServices: (state) => state.propertyPublicServices,
    }),
  },
  methods: {
    getServiceValue(publicService) {
      const service = this.property.propertyPublicServices.find((propertyPublicService) => propertyPublicService.id === publicService.id)

      if (service) {
        return 'Si'
      }
      
      return 'No'
    },
  },
}
</script>

<style>
</style>
