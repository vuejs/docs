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
    <div class="header">Перетягніть мене</div>
    <div class="content" :style="contentPosition">
      <a
        href="https://sfc.vuejs.org/#eNqlVt1q40YUfpXBu7AOtSQ7m2wX1Ul/KKUXLWyhFy11IWPNSNauNDPMjBw7wVB6Xehdb/sOLYFedN/BeaN+MyPZlpNAYSGRZ87Pd74558yRbgefKxUvGz5IB1OT6VJZYrht1OVMlLWS2pJbojnNbLnkI5LJWjWWM7IhuZY1eQHPFztLtha0LjPT6rpt/NbAZiYyKYwlC04Z11/zslhYckEmp2Onq7glpflS06IoRQF5TivDOx9jKeAvQGWVkvGIrPEkm06bQdNRHHqTwxjeuhd0c3LM5g21C4B0pxsOT8jFJbmdCQJg22hBrr4dj8bkm5en7sc9n98eYm6+e36bxasNxFm83oDjkf5qJg7D4mm5sG+kKW0pxROxgy1bO3W8JlHvGAcGtFbcYcDyEon5lJySlJwdsPdohFhNhcmlrlNy5dcVtXzouMIzaXE2anUCtsTlN1DOG4HcgqUvg6vRkJ8ETI6oPM4WVBScfS+bbMEN4h+Lfhr/DEYoJ+kX2erGCz1wvPJgihb8h73QHT4IfwSfHh0pPpRLToZ7Pi0MsuqZ9FrmIzJsmaEKLVvkxlvvi9Ty3JmsexYPqjSJz7s6uaAO4SjoQVm6ihwVRCqfg5b7Ewd67GI5+e6CUtxg1wpBDDKjbvV/rtOBsV0rnu5xjdIIOiKs0dQRTsnHY1zfXJeef0pOX/t77Jx9OsMJp0mYRJhB2FheK9eo2BEyZeWyTVhFjbmYDZg7Gp1XfDYIis9q2RjO5LWAdteyO611beDFj6q9cy2XHNrQYH3Px1Xeq1EeMZSk78UFe0zn3SpOPWRf60+L85plsTvqHDpyXTK7wAZDCLuFrwG256+wbZ3gptxES13Q/YSDeV5WFWTPXn51PvniHA7TxFl2wRJE69ZI9C5wwID59s/t3f0v+P/1/vft39v3939g9RvZ/ru9277f3k0TeD0G0M47MEiNXVfuuEcj0IMD+p/tXw50j9StpslBI2DrcYjJpOIMknjXB6Hr5zR7V2jZCBZlspI6Jc/yPP/Eq+QqMguKDnGvkTO1IpNXeOhiTjEM3fvF/cWT8xNv7hOeuqGvVl4Qco7mPesk6AmdVw5vUTLGhRfWVOPKwRFWhDZWeqlqz5tiNuMweGV5seUrG9GqLKDIkBauvThHkiJT3uBSTUB0L7tuObwcj70QfaQj10sZhEKKgDqXGnWLNGVlY1Ly2iPggsXzImRpz4bOjazwAgpspEJq/LLiORDD+iYqBePuFdzChL7A/Y/bah6j9s64c5+ETFDGMB1CgvaFKW+8sKUOUS9W92LsV7SrCD4mDpMUEnfK64d5m8uKBWA0vesktNBgNAgfMlFNFT5apMBHkY83axVmNki7oTob4NvH7XE9rFUmTRKTZ+5T6q2JpS4SrGLdCFvWPOamjuZaXqNKAJ4N2pGJ6bX/RupjZUzE5t1aoY1jxpdJz3DnjhgJMNF+kcaM4drd0qcpHZk+oNWN4MHmP9LpbhY="
        target="_blank"
        >Вихідний код</a
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
