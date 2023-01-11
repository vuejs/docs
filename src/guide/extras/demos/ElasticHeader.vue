<script setup>
import dynamics from 'dynamics.js'

const headerHeight = 120

let isDragging = false
const start = { x: 0, y: 0 }
let c = $ref({ x: headerHeight, y: headerHeight })

const headerPath = $computed(() => {
  return `M0,0 L320,0 320,${headerHeight}Q${c.x},${c.y} 0,${headerHeight}`
})

const contentPosition = $computed(() => {
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
      { type: dynamics.spring, duration: 700, firction: 280 }
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
        href="https://sfc.vuejs.org/#eNqlVt1q40YUfpVBG1iHRpKdn+2iOukPpfSihS30oqUqZCyNZO1KM8PMyLETDKXXhd71tu/QEuhF9x2cN+o3M5JtOQkUFhJ55vx855tzzhzpLvhcymjRsiAJpjpTlTREM9PKq5RXjRTKkHzFaVNlmhRKNORlv43e6pcpT3kmuDZkzmjO1NesKueGXJLJ6djqamZIpb9UtCwrXkJe0Fqz3kcbCvhLckeWCRmfkBWeZO29MsiPFCtGTrmP7uwG4dbHhzzeUDO3AJloZGtYPhodk8srcpdyQhROpzi5/nZ8MibfnJ3aH/s8utsHXX93dJdFyzXEWbRag96B/jrl+3HxNIybN0JXphL8ueDeOF9BD1gSDg6yZ0AbySwILK+QlE/JKUnI+R59h0aIUZTrQqgmIdduXVPDRpYsPOMOZy2Xx6BLbG4956LlmaPpSmDrM2LHHpMhKouyOeUly78XbTZnGvEPRT+NfwYjlJIMC2xU64QOOFo6MElL9sNOaA/vhT+Cz4CO4B/KpSCjHZ8OBll1TAZN8xEZdcxQhY4tcuOsd0XqeG5NVgOLR1WaRBd9nWxQi3AQdK8sfUUOCiKky0HH/ZkDPXWprHx7OSlur20FLwaZk371fy7UnrFZSZbscLVUCHpC8lZRSzghH49xdYtKOf4JOX3t7rB1dun0J5zGfrZgqmBjWCNto2JHyDSvFl3Caqr1ZRrk9mh0VrM08IrPGtFqlosbDu22ZbdaY9vAiZ9UO+dGLBi0vsGGnk+rnFcrHaIvydCL8fwpnXOrGXWQQ607Lc6rF+X2qDPoyE2Vmzk2mELYzV0NsL14hW3nBDdpZ1pig+5mHMyLqq4he3H21cXkiws4TGNr2QeLEa1fI9HbwB4D5ps/N/cPv+D/14ffN39v3j/8gdVvZPPv5n7zfnM/jeH1FEA38MAg0WZV2+MezEAHDuh/Nn9Z0B1Sv5rGe42ArcMhOhOS5ZBE2z7wXT+j2btSiZbnYSZqoRLyoiiKT5xKLEM9p+gQ+wo5l0syeYWHKmcUw9C+W+xfNLk4duYu4Ymd+nLpBD7naN7zXoKeUEVt8eZVnjPuhA1VuHJwhBWhrRFOKrvzJpjNOEy1YE5s2NKEtK5KKDKkhSknLpCkUFe3uFQTEN3JbjoOZ+OxE6KPVGh7KYOQC+5RZ0KhbqGiedXqhLx2CLhg0az0WdqxoTMtaryAPBshkRq3rFkBRL++DSueM/v67WB8X+D+R101D1EHZ9y6T3wmaJ5jOvgE7QpT3TphRx2iQaz+xTisaF8RfEjsJ8kn7pQ1j/M2E3XugdH0tpPQQsFJ4D9iwoZKfLAIjs8cFy/tFDoNkn6opgG+g+we18MYqZM41kVmP47e6kioMsYqUi03VcMipptwpsQNqgTgNOhGJqbX7vtoiJXlPNLvVhJtHOVsEQ8Mt+6IEQMT7RcqzBim7C19ntKB6SNa/QgO1v8BI6lcOw=="
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
