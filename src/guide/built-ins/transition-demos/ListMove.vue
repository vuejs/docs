<script setup>
import { ref } from 'vue'
const items = ref([1, 2, 3, 4, 5])
let nextNum = items.value.length + 1

function add() {
  items.value.splice(randomIndex(), 0, nextNum++)
}

function remove() {
  items.value.splice(randomIndex(), 1)
}

function randomIndex() {
  return Math.floor(Math.random() * items.value.length)
}

function shuffle(array) {
  let currentIndex = array.length
  let randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }
  return array
}
</script>

<template>
  <div class="demo">
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <button @click="shuffle(items)">Shuffle</button>
    <TransitionGroup name="list2" tag="ul" style="margin-top: 20px">
      <li class="list-item" v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<style>
.list2-move, /* apply transition to moving elements */
.list2-enter-active,
.list2-leave-active {
  transition: all 0.5s ease;
}

.list2-enter-from,
.list2-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list2-leave-active {
  position: absolute !important;
}
</style>
