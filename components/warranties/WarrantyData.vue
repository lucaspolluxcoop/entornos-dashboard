<template>
  <div>
    <collapse :active-index="0">
      <collapse-item>
        <h3 slot="title" class="mb-0">Garantía: {{ warranty.title }}</h3>

        <div class="row mb-4">
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Descripción</p>
              <p>{{ warranty.description }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Archivo adjunto</p>
              <p>
                <a target="_blank" :href="getWarrantyFileUrl">{{
                  warranty.filePath
                }}</a>
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Tipo de Garantía</p>
              <p>{{ warranty.warrantyType.title }}</p>
            </div>
          </div>
          <div v-if="warranty.user" class="col-sm-12 col-md-4">
            <div>
              <p class="h5 mb-0">Garante / Fiador</p>
              <NuxtLink
                :to="`/users/${warranty.user.id}/edit?contract=${contract.id}`"
              >
                {{
                  `${warranty.user.profile.cuit} - ${warranty.user.profile.name}`
                }}
              </NuxtLink>
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
  name: 'WarrantyData',
  components: {
    Collapse,
    CollapseItem,
  },
  props: {
    warranty: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('modules/contracts', {
      contract: (state) => state.contract,
    }),
    getWarrantyFileUrl() {
      return `${this.$config.apiURL}/storage/warranties/${this.warranty.filePath}`
    },
  },
}
</script>
