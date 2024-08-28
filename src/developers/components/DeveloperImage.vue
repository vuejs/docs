<script setup lang="ts">
import { computed } from 'vue'
import partnerConfig from '../partnerConfig.js'

const { imageStorageUrl } = partnerConfig

const props = withDefaults(defineProps<{
  src: string
  alt: string
  width: number
  height: number
  quality?: string
  crop?: string
  faceRecognition?: boolean
  loading?: 'lazy' | 'eager'
  className?: string
}>(), {
  quality: 'q_auto:best',
  crop: 'c_fit',
  faceRecognition: false
})

const imageSrc = computed(() => {
  const attributes = [
    'f_auto',
    'dpr_auto',
    props.crop,
    props.quality,
    props.faceRecognition ? 'g_face' : '',
    props.width ? `w_${props.width}` : '',
    props.height ? `h_${props.height}` : '',
  ]
    .filter((item) => item !== '')
    .join(',')

  return `${imageStorageUrl}/${attributes}/v1/${props.src.replace(/^\/+/, '')}`
})
</script>

<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :class="['c-image', className || '']"
  />
</template>

<style scoped>
.c-image {
  max-width: 100%;
  height: auto;
  vertical-align: top;
}
</style>
