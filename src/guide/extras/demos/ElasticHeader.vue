<script setup>
import { reactive, computed } from 'vue'
import dynamics from 'dynamics.js'

const headerHeight = 120

let isDragging = false
const start = { x: 0, y: 0 }
const c = reactive({ x: headerHeight, y: headerHeight })

const headerPath = computed(() => {
  return `M0,0 L320,0 320,${headerHeight}Q${c.x},${c.y} 0,${headerHeight}`
})

const contentPosition = computed(() => {
  const dy = c.y - headerHeight
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
    c.x = headerHeight + (e.pageX - start.x)
    const dy = e.pageY - start.y
    const dampen = dy > 0 ? 1.5 : 4
    c.y = headerHeight + dy / dampen
  }
}

function stopDrag() {
  if (isDragging) {
    isDragging = false
    dynamics.animate(
      c,
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
        href="https://sfc.vuejs.org/#eNqlVm2L4zYQ/ivCd3BZGttJdnM93Oz2hVLuQw+u0A8tTWEVS3Z8Z0tCkrPJhvz3PpLsJM5moXCwZKV5eebRzGisffSzUsmm5VEWLUyuK2WJ4bZVD0tRNUpqS/ZEc5rbasPHJJeNai1n5EAKLRvyDp7vjpZsJ2hT5abT9dvki4HNUuRSGEvWnDKuP/KqXFtyT6azidPV3JLK/KppWVaihLygteG9j7EU8Pegss3IZEx2+CWHXptD01MceZPzGN56EPRwc8nmM7VrgPSnG41uyP0D2S8FAbBttSCPnybjCfn9dub+ud+3+3PMwx9v93myPUCcJ7sDOF7oH5fiPCx+LRf2szSVraR4JXawZTunTnYkHhzjzIA2ijsMWD4gMT+SGcnI3Rl7j0aI1VSYQuomI49+XVPLR44rPNMO56C2N2BLXH4D5aIVyC1Y+jK4Go34TcDkiMqTfE1Fydmfss3X3CD+peifyb9ghHKSYZGtbr3QAydbD6Zoyf86Cd3hg/Bv8BnQkeJbuRRkdOLTwSCrnsmgZb4jo44ZqtCxRW689alIHc+jyW5g8aJK02Te18kFdQgXQc/K0lfkoiBS+Rx03F850LWL5eTHC0pxg10rBDHIjPvV/7lOZ8Z2p3h2wjVKI+iYsFZTRzgj309wfQtdef4ZmX3w99g5+3SGEy7SMIkwg7CxvFGuUbEjZMGqTZewmhpzv4yYOxpd1XwZBcVPjWwNZ/JJQHts2aPWujbw4qtq79zIDYc2NNjQ87rKe7XKI4aSDL24YNd03q3m1EMOtf60OK/ZlMejrqAjTxWza2wwhLBb+xpgO3+PbecEN+UmWuaCniYczIuqriF7c/vbfPrLHA6L1Fn2wVJE69dI9DFwwIC540c+8UUK7TXDbq4hUmbsrnbHuhh1APnI61qeIPrVIj2rNLYegJhcKs4gSY6FDm29ovnXUstWsDiXtdQZeVMUxQ9eJbexWVO0gPtO3Kktmb7Hjy5XFNPOfUDcXzKd33hzn9HMTXW19YKQVHTnXS9B0XVRO7x1xRgXXthQjTsFR1gR2lrppao7aIbhi8Pgm+TFlm9tTOuqhCJHPrj24gLZiU31jFszBdGT7KnjcDuZeCEaRceuWXIIhRQBdSU1ChNryqrWZOSDR8ANSlZlyNKJDV0ZWeMLE9hIhdT4Zc0LIIb1c1wJxt03toMJhccFT7oyXqIOznh0n4ZMUMZw/UOCToWpnr2wow7RIFb/5RtWtK8IXgvnSQqJm/HmZd5WsmYBGF3tOgktFI2j8FKJG6rwKpECrx4fb9kpzDLK+qm5jPC4cXv0v7XKZGlqity9lb6YROoyxSrRrbBVwxNumnil5ROqBOBl1M1EjKfTI2iIlTORmK87hTZOGN+kA8OjO2KkwET7xRpDhGt3DV+ndGH6glY/Y6PDfyVJU+8="
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
