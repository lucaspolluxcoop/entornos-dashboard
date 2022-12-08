<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">Antiguedad y Conservación</h3>

        <div class="row mb-3">
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Antigüedad</p>
              <p>{{ property.propertyAntiquity.antiquity }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Estado de Conservación</p>
              <p>{{ property.propertyAntiquity.propertyConservation.title }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Terminaciones</p>
              <p>{{ property.propertyAntiquity.propertyTermination.title }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Se entrega recien pintado</p>
              <p>
                {{
                  property.propertyAntiquity.deliveredPainted === 'S'
                    ? 'Si'
                    : 'No'
                }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Propietario invierte en mantenimiento</p>
              <p>
                {{
                  property.propertyAntiquity.hasMaintenance === 'S'
                    ? 'Si'
                    : 'No'
                }}
              </p>
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
  name: 'PropertyData',
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
}
</script>
