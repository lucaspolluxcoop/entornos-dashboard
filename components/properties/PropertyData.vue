<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">
          Inmueble: {{ property.propertyIdentifier }}
        </h3>

        <div class="row mb-3">
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Calle</p>
              <p>{{ property.street }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Número</p>
              <p>{{ property.number }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Piso</p>
              <p>{{ property.floor | displayDashWhenEmpty }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Departamento</p>
              <p>{{ property.apartment | displayDashWhenEmpty }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Provincia</p>
              <p>{{ property.city.state.name }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Ciudad</p>
              <p>{{ getPropertyCity }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Barrio</p>
              <p>{{ property.neightbourhood | displayDashWhenEmpty }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Código Postal</p>
              <p>{{ property.zip }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Partida Inmobiliaria</p>
              <p>{{ property.propertyIdentifier }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">CUIT del Titular</p>
              <p>{{ property.ownerTaxId }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Tipo de Inmueble</p>
              <p>{{ property.propertyType.title }}</p>
            </div>
          </div>
          <div v-if="property.propertyZone" class="col-sm-12 col-md-3">
            <div>
              <p class="h5 mb-0">Ubicación</p>
              <p>{{ property.propertyZone.title | displayDashWhenEmpty }}</p>
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
import { capitalize } from '~/support/utils/string'

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
  computed: {
    getPropertyCity() {
      return capitalize(this.property.city.title)
    },
  },
}
</script>
