<script setup>
import { ref, computed } from 'vue'
import dynamics from 'dynamics.js'

const headerHeight = 120

let isDragging = false
const start = { x: 0, y: 0 }
const x = ref(headerHeight)
const y = ref(headerHeight)

const headerPath = computed(() => {
  return `M0,0 L320,0 320,${headerHeight}Q${x.value},${y.value} 0,${headerHeight}`
})

const contentPosition = computed(() => {
  const dy = y.value - headerHeight
  const dampen = dy > 0 ? 2 : 4
  return {
    transform: `translate(0,${dy / dampen}px)`
  }
})

function startDrag(e) {
  e = e.changedTouches ? e.changedTouches[0] : e
  isDragging = true
  start.x = e.pageX
  start.y = e.pageY
}

function onDrag(e) {
  e = e.changedTouches ? e.changedTouches[0] : e
  if (isDragging) {
    x.value = headerHeight + (e.pageX - start.x)
    const dy = e.pageY - start.y
    const dampen = dy > 0 ? 1.5 : 4
    y.value = headerHeight + dy / dampen
  }
}

function stopDrag() {
  if (isDragging) {
    isDragging = false
    dynamics.animate(
      { x: x.value, y: y.value },
      { x: headerHeight, y: headerHeight },
      { type: dynamics.spring, duration: 700, friction: 280 }
    )
  }
}
</script>

<template>
  <div
    class="draggable"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @touchstart.prevent="startDrag"
    @touchmove.prevent="onDrag"
    @touchend.prevent="stopDrag"
  >
    <svg class="bg" width="320" height="560">
      <path :d="headerPath" fill="#3F51B5"></path>
    </svg>
    <div class="header">Drag Me</div>
    <div class="content" :style="contentPosition">
      <a
        href="https://sfc.vuejs.org/#eNqlVmtv2zYU/SuEGqAOFkl2Hl2hOdkDw9APK9AB+7BhGhBapGS1EkmQlGPH8H/vISnZluMABQoEDnkf5x7ee3nFbfSrUsmq41EWzU2ha2WJ4bZTD7moWyW1JWwjaFsXhpRatuTtsE0+m7e5yEUhhbFkySnj+gOvq6Ul92R2PXW6hltSm981rapaVJCXtDF88DGWAv6ebMk6I9MrssEv2QWvAvILzcuJVx6je7tRuN3lKY9P1C4dQCFb1VnOJpNLcv9AtrkgRON0WpDHj9OrKfnz5tr9c78X22PQ3V8X2yJZ7yAuks0O9E70j7k4jotfy4X9JE1tayleCx6M2QZ6wJJ4dJAjA9oq7kBg+YCk/EyuSUZuj+h7NEKspsKUUrcZefTrhlo+cWThmfY4O7W+BF3ichs4l50oPE1fAlefCb8MmBxReVIsqag4+1t2xZIbxD8V/Tf9H4xQSjIusNWdF3rgZO3BFK34PwehO3wQ/gs+IzpSfC+XkkwOfHoYZNUzGTXND2TSM0MVerbIjbc+FKnnuTfZjCxeVGmW3A11ckEdwknQo7IMFTkpiFQ+Bz33Vw507lI5+f5yUtxe1wpBDDJXw+pbLtSRsd0onh1wjdIIekVYp6kjnJEfp7i6pa49/4xcv/d32Dn7dIYTztMwWzBVsLG8Va5RsSNkzupVn7CGGnOfR8wdjS4ankdB8UsrO8OZfBLQ7lt2r7WuDbz4rNo7t3LFoQ0NNvY8r/JenfKIoSRjLy7YOZ13azj1kGOtPy3Oa1bV/qgL6MhTzewSG0wh7Ja+BtjevcO2d4KbcjMtc0EPMw7mZd00kL25+eNu9tsdHOapsxyCpYg2rJHofeCAAXPHj3zk8xTac4b9YEOkzNhN4451MusA8oE3jTxADKt5elRpbD0AMYVUnEGS7Asd2npBiy+Vlp1gcSEbqTPypizLn7xKrmOzpGgB9424VWsye4cfXS0opp37eLi/ZHZ36c19RjM31tXaC0JS0Z23gwRF12Xj8JY1Y1x4YUs17hQcYUVoZ6WXqv6gGYYvDlOvuBdbvrYxbeoKigL54NqLS2QnNvUzbs0MRA+yp57DzXTqhWgUHbtmKSAUUgTUhdQoTKwpqzuTkfceATcoWVQhSwc2dGFkgy9MYCMVUuOXDS+BGNbPcS0Yd9/XHiYUHhc86ct4ijo64959FjJBGcP1Dwk6FKZ+9sKeOkSjWMOXb1zRoSJ4KRwnKSTumrcv87aQDQvA6GrXSWih6CoKr5S4pQovEinwjvHx8l5h8igbpmYe4aHj9uh/a5XJ0tSUhXv9fDaJ1FWKVaI7YeuWJ9y08ULLJ1QJwHnUz0SMp8MDaIxVMJGYLxuFNk4YX6Ujw707YqTARPvFGkOEa3cNX6d0YvqC1jBjo91Xn6ZCFA=="
        target="_blank"
        >Source code</a
      >
    </div>
  </div>
</template>

<style scoped>
.draggable {
  background-color: #fff;
  box-shadow: var(--vt-shadow-2);
  width: 320px;
  height: 240px;
  overflow: hidden;
  margin: 30px auto;
  position: relative;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  user-select: none;
  border-radius: 8px;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.header,
.content {
  position: relative;
  z-index: 1;
  padding: 30px;
  box-sizing: border-box;
}
.header {
  color: #fff;
  height: 120px;
  font-size: 2em;
  font-weight: bold;
}
</style>
