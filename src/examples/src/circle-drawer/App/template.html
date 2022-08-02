<svg @click="onClick">
  <foreignObject x="0" y="40%" width="100%" height="200">
    <p class="tip">
      Click on the canvas to draw a circle. Click on a circle to select it.
      Right-click on the canvas to adjust the radius of the selected circle.
    </p>
  </foreignObject>
  <circle
    v-for="circle in circles"
    :cx="circle.cx"
    :cy="circle.cy"
    :r="circle.r"
    :fill="circle === selected ? '#ccc' : '#fff'"
    @click="selected = circle"
    @contextmenu.prevent="adjust(circle)"
  ></circle>
</svg>

<div class="controls">
  <button @click="undo" :disabled="index <= 0">Undo</button>
  <button @click="redo" :disabled="index >= history.length - 1">Redo</button>
</div>

<div class="dialog" v-if="adjusting" @click.stop>
  <p>Adjust radius of circle at ({{ selected.cx }}, {{ selected.cy }})</p>
  <input type="range" v-model="selected.r" min="1" max="300">
</div>
