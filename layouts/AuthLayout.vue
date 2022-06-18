<template>
  <div :class="layoutClass" class="auth-layout">
    <div class="main-content">
      <nuxt></nuxt>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      year: new Date().getFullYear(),
      pageClass: 'login-page',
    }
  },
  computed: {
    title() {
      return `${this.$route.name} Page`
    },
    layoutClass() {
      const exceptions = ['index', 'home']
      if (!exceptions.includes(this.$route.name)) {
        return 'bg-default'
      } else {
        return ''
      }
    },
  },
  watch: {
    '$route.path'() {
      if (this.showMenu) {
        this.closeMenu()
      }
    },
  },
  methods: {
    closeMenu() {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    },
  },
}
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
