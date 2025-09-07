<script setup lang="ts">
import { ref } from 'vue' 
import clickImg from './ressources/panda2.png'

const counter = ref<number>(0)
const damage = ref<number>(1)
const upgrades = ref([
  { name: 'Attack +1', cost: 10, level: 0 },
])

function incrementCounter(): void {
  counter.value = counter.value + damage.value
}

// Variable pour afficher/cacher le panel
const showPanel = ref(false)

function togglePanel() {
  showPanel.value = !showPanel.value
}

function buyUpgrade(upgrade: { name: string, cost: number, level: number }) {
  if (counter.value >= upgrade.cost) {
    counter.value -= upgrade.cost      
    damage.value += 1                   
    upgrade.level += 1                  
    upgrade.cost = Math.floor(upgrade.cost * 1.5)  // augmenter le coût pour le prochain niveau
  } else {
    alert("Pas assez de points !")
  }
}
</script>

<template>
 <div class="w-screen h-screen relative flex">
  <div class="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white relative h-full">
    <button @click="incrementCounter" class="p-0 border-none bg-transparent">
      <img :src="clickImg" alt="Panda" class="max-w-[200px] max-h-[200px]"/>
    </button>
    <h1 class="text-3xl mt-4">Counter : {{ counter }}</h1>

    <!-- Bouton pour ouvrir le panel -->
    <button @click="togglePanel" class="mt-6 px-4 py-2 bg-blue-500 rounded-lg text-white">
      Upgrades
    </button>
  </div>

  <transition name="slide">
    <div v-if="showPanel" class="fixed right-0 top-0 w-64 h-screen bg-gray-800 text-white p-4 flex flex-col gap-4 shadow-lg z-50">
      <h2 class="text-2xl mb-4">Upgrades</h2>
      <div v-for="(upgrade, index) in upgrades" :key="index">
  <button 
    @click="buyUpgrade(upgrade)"
    :class="['px-4 py-2 rounded-lg font-bold shadow-lg', counter.valueOf() >= upgrade.cost ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed']"
    :disabled="counter.valueOf() < upgrade.cost"
  >
    {{ upgrade.name }} (Coût: {{ upgrade.cost }})
  </button>
</div>
      <!-- Bouton pour fermer -->
      <button @click="togglePanel" class="mt-auto px-4 py-2 bg-red-500 rounded-lg text-white">
        Fermer
      </button>
    </div>
  </transition>
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

/* Transition pour le panel */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
