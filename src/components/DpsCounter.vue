<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  dpsValue: number
  counter: number
}>()

const emit = defineEmits<{
  'update:counter': [value: number]
}>()

// Intervalle pour les dégâts par seconde
let dpsInterval: number | null = null

// Fonction pour appliquer les dégâts par seconde
function applyDPS() {
  if (props.dpsValue > 0) {
    emit('update:counter', props.counter + props.dpsValue)
  }
}

// Initialiser l'intervalle DPS au montage du composant
onMounted(() => {
  dpsInterval = window.setInterval(applyDPS, 1000)
})

// Nettoyer l'intervalle au démontage du composant
onUnmounted(() => {
  if (dpsInterval !== null) {
    clearInterval(dpsInterval)
    dpsInterval = null
  }
})
</script>

<template>
  <div 
    v-if="dpsValue > 0"
    class="text-xl px-4 py-2 bg-green-800/60 rounded-lg
          shadow-lg backdrop-blur-sm animate-pulse"
  >
    +{{ dpsValue }} bambou/sec
  </div>
</template>
