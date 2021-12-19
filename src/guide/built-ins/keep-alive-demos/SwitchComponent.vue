<script setup>
import CompA from './CompA.vue'
import CompB from './CompB.vue'

let current = $shallowRef(CompA)

const { useKeepAlive } = defineProps(['useKeepAlive'])
</script>

<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <template v-if="useKeepAlive">
      <component :is="current"></component>
    </template>
    <template v-else>
      <KeepAlive>
        <component :is="current"></component>
      </KeepAlive>
    </template>
  </div>
</template>
