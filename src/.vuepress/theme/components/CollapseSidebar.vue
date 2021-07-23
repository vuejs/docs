<template>
  <div>
    <svg v-if='!isOpen' class='menu-drop' @click='toggle'></svg>
    <svg v-else class='close-menu' @click='toggle'></svg>
  </div>
</template>

<script>

export default {
  name: 'CollapseButton',
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen;
      this.$emit('toggle-item', this.isOpen)
    }
  }
}
</script>

<style scoped>
.menu-drop {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAxOHYxaC0yNHYtMWgyNHptMC02djFoLTI0di0xaDI0em0wLTZ2MWgtMjR2LTFoMjR6IiBmaWxsPSIjMTA0MGUyIi8+PHBhdGggZD0iTTI0IDE5aC0yNHYtMWgyNHYxem0wLTZoLTI0di0xaDI0djF6bTAtNmgtMjR2LTFoMjR2MXoiLz48L3N2Zz4=);
  background-size: contain;
  cursor: pointer;
  height: 35px;
  left:10rem;
  position: fixed;
  top: 10px;
  width: 35px;
  z-index: 20;
}

.close-menu {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAxMS4yOTNsMTAuMjkzLTEwLjI5My43MDcuNzA3LTEwLjI5MyAxMC4yOTMgMTAuMjkzIDEwLjI5My0uNzA3LjcwNy0xMC4yOTMtMTAuMjkzLTEwLjI5MyAxMC4yOTMtLjcwNy0uNzA3IDEwLjI5My0xMC4yOTMtMTAuMjkzLTEwLjI5My43MDctLjcwNyAxMC4yOTMgMTAuMjkzeiIvPjwvc3ZnPg==);
  background-size: contain;
  cursor: pointer;
  height: 25px;
  left: 10rem;
  position: fixed;
  top: 15px;
  width: 25px;
  z-index: 20;
}

@media only screen and (max-width: 1044px) {
  .menu-drop {
    display: none;
  }

  .close-menu {
    display: none;
  }
}

</style>
