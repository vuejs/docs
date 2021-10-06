<script setup>
import { defineProps } from 'vue'
import IconCode from './IconCode.vue'

const props = defineProps({
  detail: {
    type: [Array, Object],
    required: true
  },
  heading: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="member-detail-section">
    <IconCode />
    <h4>{{ props.heading }}</h4>
    <h4 v-if="props.detail.length > 0" class="sr-only">Projects</h4>
    <ul v-if="props.detail.length > 0" class="member-language-list">
      <li
        v-for="project in props.detail"
        :key="`project-${project.label}`"
        class="member-language"
      >
        <a :href="project.url">{{ project.label }}</a>
      </li>
    </ul>
  </section>
</template>

<style></style>
