<script setup>
import { h, ref } from 'vue'

const CompA = () => h('div', 'Компонент A')
const CompB = () => h('div', 'Компонент Б')

const activeComponent = ref(CompA)
</script>

<template>
  <div class="demo">
    <label>
      <input type="radio" v-model="activeComponent" :value="CompA" /> A
    </label>
    <label>
      <input type="radio" v-model="activeComponent" :value="CompB" /> Б
    </label>
    <Transition name="fade" mode="out-in">
      <component :is="activeComponent"></component>
    </Transition>
  </div>
</template>
