<script setup lang="ts">
import UpgradeItem, { type Upgrade } from './UpgradeItem.vue'

defineProps<{
  upgrades: Upgrade[]
  currentBamboo: number
  visible: boolean
  lastSaveTime?: string
}>()

const emit = defineEmits<{
  'buy-upgrade': [upgrade: Upgrade],
  'save-game': [],
  'delete-save': []
}>()

function handleBuyUpgrade(upgrade: Upgrade): void {
  emit('buy-upgrade', upgrade)
}
</script>

<template>
  <transition name="slide-left">
    <div v-if="visible" 
         class="fixed left-0 top-0 h-full w-1/6 max-w-xs min-w-[250px] bg-white text-gray-900 p-6 flex flex-col shadow-2xl z-50 rounded-r-3xl border-r border-gray-300"
         style="background-color: white; opacity: 1;">
      
      <!-- Titre -->
      <h2 class="text-3xl font-bold px-4 py-3 bg-gray-800 text-white rounded-xl 
                 shadow-2xl shadow-black/70 backdrop-blur-sm drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]
                 text-center mb-3">
        Upgrades
      </h2>

      <!-- Liste des upgrades -->
      <div class="space-y-4 mb-4">
        <div v-for="(upgrade, index) in upgrades" :key="index">
          <UpgradeItem 
            :upgrade="upgrade" 
            :current-bamboo="currentBamboo" 
            @buy="handleBuyUpgrade"
          />
        </div>
      </div>
      
      <!-- Espace flexible pour pousser le bouton de sauvegarde vers le bas -->
      <div class="flex-grow"></div>
      
      <!-- Boutons de sauvegarde en bas du panneau (version compacte) -->
      <div class="mt-4 flex flex-col items-center">
        <div class="flex space-x-2 w-full justify-center">
          <!-- Bouton de sauvegarde -->
          <button 
            @click="$emit('save-game')"
            class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg
                   shadow-sm hover:shadow transition-all duration-200
                   flex items-center justify-center border border-white
                   text-sm"
            title="Sauvegarder la partie"
          >
            <!-- Icône de sauvegarde (flèche vers le bas) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Sauver
          </button>
          
          <!-- Bouton de suppression -->
          <button 
            @click="$emit('delete-save')"
            class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg
                   shadow-sm hover:shadow transition-all duration-200
                   flex items-center justify-center border border-white
                   text-sm"
            title="Supprimer la sauvegarde"
          >
            <!-- Icône de suppression (poubelle) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Reset
          </button>
        </div>
        
        <!-- Indicateur de dernière sauvegarde (plus compact) -->
        <div v-if="lastSaveTime" class="text-xs text-gray-500 mt-1 text-center">
          Dernière sauvegarde manuelle: {{ lastSaveTime }}
        </div>
        <div v-else class="text-xs text-gray-500 mt-1 text-center italic">
          Aucune sauvegarde
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-left-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
