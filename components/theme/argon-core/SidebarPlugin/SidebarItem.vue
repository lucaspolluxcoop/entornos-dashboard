<template>
  <component
    :is="baseComponent"
    :to="link.path ? link.path : '/'"
    class="nav-item"
    :class="{ active: isActive }"
    tag="li"
  >
    <a
      v-if="isMenu"
      class="sidebar-menu-item nav-link"
      :class="{ active: isActive }"
      :aria-expanded="!collapsed"
      data-toggle="collapse"
      @click.prevent="collapseMenu"
    >
      <template v-if="addLink">
        <span class="nav-link-text">
          {{ link.name }} <b class="caret"></b>
        </span>
      </template>
      <template v-else>
        <i :class="link.icon"></i>
        <div v-if="link.name == 'Examples (API)'">
          <span class="nav-link-text" style="color: #3cab79"
            >{{ link.name }} <b class="caret"></b
          ></span>
        </div>
        <div v-else>
          <span class="nav-link-text"
            >{{ link.name }} <b class="caret"></b
          ></span>
        </div>
        <div class="w-100">
          <fa
            icon="angle-right"
            class="float-right"
            :class="{ rotate: !collapsed }"
          />
        </div>
      </template>
    </a>

    <collapse-transition>
      <div v-show="!collapsed" class="collapse show">
        <ul class="nav nav-sm flex-column">
          <slot></slot>
        </ul>
      </div>
    </collapse-transition>

    <slot
      v-if="children.length === 0 && !$slots.default && link.path"
      name="title"
    >
      <component
        :is="elementType(link, false)"
        :to="link.path"
        class="nav-link"
        :class="{ active: link.active }"
        :target="link.target"
        :href="link.path"
        @click.native="linkClick"
      >
        <template v-if="addLink">
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'sidebar-item',
  components: {
    CollapseTransition,
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild,
    }
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true,
    },
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior.",
    },
    opened: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: '',
          path: '',
          children: [],
        }
      },
      description:
        'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info',
    },
  },
  data() {
    return {
      children: [],
      collapsed: !this.opened,
      // collapsed: true,
    }
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? 'li' : 'router-link'
    },
    linkPrefix() {
      if (this.link.name) {
        const words = this.link.name.split(' ')
        return words.map((word) => word.substring(0, 1)).join('')
      }
      return false
    },
    isMenu() {
      if (!this.$slots.default) {
        return false
      }
      return this.$slots.default.some((item) =>
        item.tag.endsWith('sidebar-item')
      )
    },
    isActive() {
      if (this.$route && this.$route.path) {
        const matchingRoute = this.children.find((c) =>
          this.$route.path.startsWith(c.link.path)
        )
        return Boolean(matchingRoute)
      }
      return false
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this)
    }
    if (this.link.collapsed) {
      this.collapsed = this.link.collapsed
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = true
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    if (this.removeLink) {
      this.removeLink(this)
    }
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default.indexOf(item.$vnode)
      this.children.splice(index, 0, item)
    },
    removeChild(item) {
      const tabs = this.children
      const index = tabs.indexOf(item)
      tabs.splice(index, 1)
    },
    elementType(link, isParent = true) {
      if (!link.isRoute) {
        return isParent ? 'li' : 'a'
      }
      return 'router-link'
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false)
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
.rotate {
  transform: rotate(90deg);
  transition: all 0.5s;
}
</style>
