<script setup lang="ts">
defineProps<{
  lastSaveTime: string
}>()

const emit = defineEmits<{
  save: []
}>()

function handleSave() {
  emit('save')
}
</script>

<template>
  <div class="fixed top-20 right-10 z-[9999]">
    <div class="flex flex-col items-end gap-2">
      <button 
        @click="handleSave" 
        class="flex items-center gap-2 px-5 py-3 rounded-lg
              bg-green-600 hover:bg-green-700
              text-white font-bold text-lg
              drop-shadow-xl
              border-2 border-white
              hover:scale-105
              transition-all duration-200
              cursor-pointer"
        title="Sauvegarder la partie"
      >
        <!-- Icône de sauvegarde -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h1v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
        </svg>
        <span>Sauvegarder</span>
      </button>
      
      <div v-if="lastSaveTime" class="text-sm text-white bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
        Dernière sauvegarde : {{ lastSaveTime }}
      </div>
    </div>
  </div>
</template>
