<template>
  <div
    class="
      sidenav
      navbar navbar-vertical
      fixed-left
      navbar-expand-xs navbar-light
      bg-white
    "
    :data="backgroundColor"
  >
    <div ref="sidebarScrollArea" class="scrollbar-inner">
      <div class="sidenav-header d-flex justify-content-center">
        <a class="navbar-brand" href="#">
          <img
            :src="require('~/assets/img/logo.png')"
            class="navbar-brand-img"
            alt="Sidebar logo"
          />
        </a>
      </div>
      <slot></slot>
      <div class="navbar-inner">
        <ul class="navbar-nav">
          <slot name="links">
            <sidebar-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <sidebar-item
                v-for="(subLink, index2) in link.children"
                :key="subLink.name + index2"
                :link="subLink"
              >
              </sidebar-item>
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  provide() {
    return {
      autoClose: this.autoClose,
    }
  },
  props: {
    title: {
      type: String,
      default: 'Creative Tim',
      description: 'Sidebar title',
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title',
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: (value) => {
        const acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'orange',
          'red',
          'primary',
        ]
        return acceptedValues.includes(value)
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)',
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  methods: {
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    },
  },
}
</script>
