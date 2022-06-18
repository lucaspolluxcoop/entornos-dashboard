<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">
          Notificación:
          {{ contractNotification.id }}
        </h3>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Parte 1</p>
              <p>
                {{ contractNotification.firstPart.profile.cuit }} -
                {{ contractNotification.firstPart.profile.firstName }}
                <span v-if="contractNotification.firstPart.profile.lastName">{{
                  contractNotification.firstPart.profile.lastName
                }}</span>
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Parte 2</p>
              <p>
                {{ contractNotification.secondPart.profile.cuit }} -
                {{ contractNotification.secondPart.profile.firstName }}
                <span v-if="contractNotification.secondPart.profile.lastName">{{
                  contractNotification.secondPart.profile.lastName
                }}</span>
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Fecha</p>
              <p>{{ contractNotification.notificationDate }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Motivo</p>
              <p>
                {{ contractNotification.reason.title }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Detalle</p>
              <p>
                {{ contractNotification.contractNotificationCategory.title }}
              </p>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Respuesta</p>
              <p>
                {{
                  contractNotification.contractNotificationResponse
                    ? contractNotification.contractNotificationResponse.title
                    : '-'
                }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 my-1">
            <div>
              <p class="h5 mb-0">Fecha</p>
              <p>
                {{ contractNotification.responseDate | displayDashWhenEmpty }}
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
  name: 'ContractNotificationData',
  components: {
    Collapse,
    CollapseItem,
  },
  props: {
    contractNotification: {
      type: Object,
      required: true,
    },
  },
  computed: {},
}
</script>

<style>
</style>
