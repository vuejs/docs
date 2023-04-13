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
        href="https://play.vuejs.org/#eNqlVt2K4zYUfhWRXdiEJs7PTLaLm5n+UEovWthCL1qawiiW7LhrS0KSM8mEQOl1oXe97Tu0DPSi+w6ZN+onyU7ibBYKhRlHOj/f+XTO0bG3nU+VilYV78SdmUl0riwx3Fbqdi7yUkltyZZoThObr3ifJLJUleWM7EiqZUlewPPFwZJtBC3zxNS6Zhv9ZGAzF4kUxpIlp4zrL3meLS25IePJyOkKbkluPtc0y3KRQZ7SwvDGx1gK+BtQWcdk1CcbPMmu0SbQNBS73uQ0hrduBd31ztm8pnYJkOZ03W6P3NyS7VwQANtKC3L39ag/Il9dTdyPez7fnmLuvnm+TaL1DuIk2uzA8Ux/NxenYfG0XNjX0uQ2l+I9sYMt2zh1tCGD1jFODGipuMOA5S0S8zGZkJhcn7D3aIRYTYVJpS5jcufXBbW867jCc1jj7NS6B7bE5TdQTiuB3IKlL4OrUZf3AiZHVB4lSyoyzr6VVbLkBvHPRT+MfgQjlJO0i2x15YUeOFp7MEUz/t1R6A4fhN+DT4uOFP+XS0q6Rz41DLLqmbRa5gPSrZmhCjVb5MZbH4tU8zyYbFoW71RpHE2bOrmgDuEs6ElZmoqcFUQqn4Oa+3sOdOliOfnhglLcYNcKQQwy/Wb1X67TibHdKB4fcY3SCNonrNLUEY7JhyNc31Tnnn9MJq/8PXbOPp3hhLNhmESYQdhYXirXqNgRMmP5qk5YQY25mXeYOxpdFHzeCYpPSlkZzuS9gPbQsgetdW3gxRfV3rmUKw5taLC252WV96qURwwlaXtxwS7pvFvBqYdsa/1pcV6zyg5HXUBH7nNml9hgCGG39DXAdvoS29oJbspNtNgFPU44mKd5UUD27OqL6fizKRxmQ2fZBBsiWrNGog+BAwbM93/sH59+xv8vT7/t/9q/ffodq1/J/p/94/7t/nE2hNclgHregUFs7KZwxz0bgR4c0H/v/3SgR6RmNRueNAK2HoeYRCrOIIkOfRC6fkGTN5mWlWCDRBZSx+RZmqYfeZVcD8ySokPca+Rarcn4JR46W1AMQ/d+cX/ReNrz5j7hsRv6au0FIedo3utGgp7QaeHwljljXHhhSTWuHBxhRWhlpZeq+rwxZjMOg1eWF1u+tgNa5BkUCdLCtRenSNLA5A+4VGMQPcruaw5Xo5EXoo/0wPVSAqGQIqAupEbdBpqyvDIxeeURcMGiRRaydGRDF0YWeAEFNlIhNX5Z8BSIYf0wyAXj7hVcw4S+wP2P6mqeo7bOeHAfh0xQxjAdQoKOhckfvLCmDlErVvNibFe0qQg+Jk6TFBI34eW7eVvIggVgNL3rJLRQp98JHzKDkip8tEiBjyIfb14rzLwTN0MVk+f4fePkuCbWKhMPhwkTkXmzUWjBiPHVsGXYjLnO7l+qvTeT"
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
