<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">
          Contrato:
          {{ contract.contractIdentifier | displayDashWhenEmpty }}
        </h3>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-2 my-1">
            <p class="h5 mb-0">Inicio de Contrato</p>
            <p>{{ contract.startContract | date }}</p>
          </div>
          <div class="col-sm-12 col-md-2 my-1">
            <p class="h5 mb-0">Fin de Contrato</p>
            <p>{{ contract.endContract | date }}</p>
          </div>
          <div class="col-sm-12 col-md-8 my-1">
            <p class="h5 mb-0">Propiedad</p>
            <p>{{ getPropertyData }}</p>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <p class="h5 mb-0">Canon Locativo</p>
            <p v-if="contract.contractLocativeCanon">
              {{ contract.contractLocativeCanon.title }}
            </p>
            <p v-else>-</p>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <p class="h5 mb-0">Tipo del Contrato</p>
            <p>{{ contract.contractType.title }}</p>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <p class="h5 mb-0">Locatario</p>
            <p>
              {{ contract.tenant.profile.cuit || '' }}
              {{
                contract.tenant.profile.firstName +
                contract.tenant.profile.lastName
              }}
            </p>
          </div>
          <div class="col-sm-12 col-md-12 my-1">
            <p class="h5 mb-0">Locador</p>
            <p>
              {{ contract.locator.profile.cuit || '' }}
              {{
                contract.locator.profile.firstName +
                contract.locator.profile.lastName
              }}
            </p>
          </div>
          <div v-if="contract.extintionDate" class="col-sm-12 col-md-4 my-1">
            <p class="h5 mb-0">Fecha de extinción</p>
            <p>
              {{ contract.extintionDate | date }}
            </p>
          </div>
          <div v-if="contract.extintionDate" class="col-sm-12 col-md-4 my-1">
            <p class="h5 mb-0">Motivo Extinción</p>
            <p>
              {{ contract.extintionReason.title}}
            </p>
          </div>
          <div v-if="contract.extintionReason.id === 9" class="col-sm-12 col-md-4 my-1">
            <p class="h5 mb-0">Otro motivo</p>
            <p>
              {{ contract.otherReason}}
            </p>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import Collapse from '@/components/theme/argon-core/Collapse/Collapse'
import CollapseItem from '@/components/theme/argon-core/Collapse/CollapseItem'
import { getPropertyFormattedData } from '@/support/utils/string'

export default {
  name: 'ContractData',
  components: {
    Collapse,
    CollapseItem,
  },
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getPropertyData() {
      return getPropertyFormattedData(this.contract.property)
    },
  },
}
</script>

<style>
</style>
