<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <div class="demo">
    <button @click="show = !show" style="margin-bottom: 20px">Przełącz</button>
    <Transition duration="550" name="nested">
      <div v-if="show" class="transition-demo-outer">
        <div class="transition-demo-inner">Witaj</div>
      </div>
    </Transition>
  </div>
</template>

<style>
.transition-demo-outer,
.transition-demo-inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.transition-demo-inner {
  background: #ccc;
  color: rgb(33, 53, 71);
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* opóźnij usunięcie elementu rodzica */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* możemy również animować zagnieżdżone elementy używając selektorów zagnieżdżonych */
.nested-enter-active .transition-demo-inner,
.nested-leave-active .transition-demo-inner {
  transition: all 0.3s ease-in-out;
}
/* opóźnij wejście zagnieżdżonego elementu */
.nested-enter-active .transition-demo-inner {
  transition-delay: 0.25s;
}

.nested-enter-from .transition-demo-inner,
.nested-leave-to .transition-demo-inner {
  transform: translateX(30px);
  /*
  	Obejście błędu Chrome 96 w obsłudze zagnieżdżonych przejść przezroczystości.
    Nie jest to wymagane w innych przeglądarkach ani Chrome 99+, gdzie błąd
    został naprawiony.
  */
  opacity: 0.001;
}
</style>
