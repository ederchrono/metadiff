<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        Metadiff
      </nuxt-link>

      <button class="button navbar-burger"
        :class="{'is-active': menuOpen}"
        @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu" :class="{'is-active': menuOpen}">
      <div class="navbar-end">
        <a class="navbar-item" href="https://github.com/ederchrono" target="_blank">
            On Github
        </a>
        <nuxt-link class="navbar-item" to="/about">
            About
        </nuxt-link>
      </div>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>


<style lang="scss" scoped>
$bgColor:   #1B3B6F;
$menuColor: #065A82;
$linksColor:#FFFFFF;

.navbar {
  background-color: $bgColor;
  margin-bottom: 30px;
}
.navbar-menu {
  background-color: $menuColor;
}
.navbar-item {
  color: $linksColor;
}

.navbar-burger {
  background-color: $bgColor;
  border: none;
  span {
    background-color: $linksColor;
  }
}
.navbar-burger:focus {
  outline: 0;
  box-shadow: none;
}

</style>
