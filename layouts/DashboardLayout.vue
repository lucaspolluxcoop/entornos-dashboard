<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Panel de Administración',
            icon: 'ni ni-app',
            path: '/dashboard',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Usuarios',
            icon: 'ni ni-single-02',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Usuarios',
              icon: 'ni ni-single-02',
              path: '/users',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Usuarios en revisión',
              icon: 'ni ni-single-02',
              path: '/revision-users',
            }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Contratos',
            icon: 'ni ni-archive-2',
            path: '/contracts',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Inmuebles',
            icon: 'ni ni-building',
            path: '/locations',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Reportes',
            icon: 'ni ni-single-copy-04',
            path: '/reports',
          }"
        />
        <hr
          class="my-3"
          style="
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            min-width: 80%;
            overflow: visible;
            box-sizing: content-box;
            height: 0;
          "
        />
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        :type="$route.name === 'alternative' ? 'light' : 'default'"
      ></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import DashboardNavbar from '@/components/theme/layouts/argon/DashboardNavbar.vue'
import ContentFooter from '@/components/theme/layouts/argon/ContentFooter.vue'

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  name: 'DashboardLayout',
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  methods: {
    initScrollbar() {
      const isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        initScrollbar('scrollbar-inner')
      }
    },
  },
}
</script>
<style lang="scss">
</style>
