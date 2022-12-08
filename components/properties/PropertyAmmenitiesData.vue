<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">Características</h3>

        <div class="row mb-3">
          <div
            v-for="ammenity in property.propertyType.ammenities"
            :key="ammenity.id"
            class="col-sm-12 col-md-3"
          >
            <div>
              <p class="h5 mb-0">{{ ammenity.title }}</p>
              <p>{{ getAmmenityValue(ammenity) }}</p>
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

export default {
  name: 'PropertyAmmenities',
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
  methods: {
    getAmmenityValue(propertyAmmenity) {
      const ammenity = this.property.ammenityValues.find(
        (value) => value.propertyAmmenityId === propertyAmmenity.id
      )

      if (ammenity?.value === 'S') {
        return 'Si'
      } else if (ammenity?.value === 'N') {
        return 'No'
      } else if (ammenity?.value) {
        return ammenity?.value
      }
      return '-'
    },
  },
}
</script>
