<script setup lang="ts">
import clickImg from '../ressources/panda2.png'

defineProps<{
  damage: number
}>()

const emit = defineEmits<{
  click: []
}>()

function handleClick(): void {
  emit('click')
}
</script>

<template>
  <button @click="handleClick" class="p-0 border-none bg-transparent
      hover:drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)]
      hover:scale-110
      active:scale-95
      transition-all duration-200
      cursor-pointer">
    <img :src="clickImg" alt="Panda" class="max-w-[200px] max-h-[200px]"/>
  </button>
</template>

