<script setup lang="ts">
import { ref } from 'vue' 
import PandaClicker from './components/PandaClicker.vue'
import UpgradesPanel from './components/UpgradesPanel.vue'
import DpsCounter from './components/DpsCounter.vue'
import { type Upgrade } from './components/UpgradeItem.vue'
import { useSaveSystem } from './composables/useSaveSystem'

const counter = ref<number>(0)
const damage = ref<number>(1)
const dps = ref<number>(0) // Dégâts par seconde

const upgrades = ref<Upgrade[]>([
  { name: 'Attack +1', cost: 10, level: 0, type: 'click' },
  { name: 'Auto-Bambou', cost: 25, level: 0, type: 'passive' },
])

// Utiliser le composable de sauvegarde
const { lastSaveTime, saveGame, deleteSave } = useSaveSystem(counter, damage, dps, upgrades)

// Aucun intervalle nécessaire ici, déplacé dans DpsCounter.vue

function incrementCounter(): void {
  counter.value += damage.value
}

// État du panneau d'améliorations
const showPanel = ref(false)

function togglePanel() {
  showPanel.value = !showPanel.value
}

function buyUpgrade(upgrade: Upgrade) {
  if (counter.value >= upgrade.cost) {
    counter.value -= upgrade.cost
    upgrade.level += 1
    
    // Augmenter les dégâts en fonction du type d'amélioration
    if (upgrade.type === 'passive') {
      dps.value += 1 // Augmenter les DPS
    } else {
      damage.value += 1 // Augmenter les dégâts par clic par défaut
    }
    
    // Augmenter le coût pour le prochain niveau
    upgrade.cost = Math.floor(upgrade.cost * 1.5)
  }
}

// La logique DPS a été déplacée dans le composant DpsCounter.vue
// La logique de sauvegarde a été déplacée dans le composable useSaveSystem
</script>

<template>
  <div class="w-screen h-screen relative flex bg-cover bg-center" style="background-image: url('/fond_bambou.jpg')">
    <div class="flex-1 flex flex-col items-center justify-center text-white relative h-full">
      <div class="flex flex-col items-center gap-2">
        <h1 
          class="text-3xl px-6 py-3 bg-black/40 rounded-xl 
                shadow-2xl shadow-black/70 backdrop-blur-sm drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
        >
          Bambou : {{ counter }}
        </h1>
        
        <DpsCounter 
          :dps-value="dps" 
          :counter="counter" 
          @update:counter="counter = $event" 
        />
      </div>
      
      <PandaClicker 
        :damage="damage" 
        @click="incrementCounter" 
      />
      
      <button 
        @click="togglePanel" 
        class="mt-6 text-4xl font-bold text-white
               border-transparent bg-transparent
               drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]
               hover:drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)]
               hover:scale-110
               transition-all duration-200
               cursor-pointer"
      >
        Upgrades
      </button>
    </div>

    <UpgradesPanel 
      :upgrades="upgrades" 
      :current-bamboo="counter" 
      :visible="showPanel"
      :last-save-time="lastSaveTime"
      @buy-upgrade="buyUpgrade"
      @save-game="saveGame"
      @delete-save="deleteSave"
    />
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
