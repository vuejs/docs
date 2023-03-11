<script setup>
import { shallowRef } from 'vue'
import CompA from './CompA.vue'
import CompB from './CompB.vue'

const current = shallowRef(CompA)

defineProps({ useKeepAlive: Boolean })
</script>

<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <template v-if="useKeepAlive">
      <KeepAlive>
        <component :is="current"></component>
      </KeepAlive>
    </template>
    <template v-else>
      <component :is="current"></component>
    </template>
  </div>
</template>
