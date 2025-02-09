<script setup>
import { h, ref } from 'vue'

const CompA = () => h('div', 'Komponent A')
const CompB = () => h('div', 'Komponent B')

const activeComponent = ref(CompA)
</script>

<template>
  <div class="demo">
    <label>
      <input type="radio" v-model="activeComponent" :value="CompA" /> A
    </label>
    <label>
      <input type="radio" v-model="activeComponent" :value="CompB" /> B
    </label>
    <Transition name="fade" mode="out-in">
      <component :is="activeComponent"></component>
    </Transition>
  </div>
</template>
