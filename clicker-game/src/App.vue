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
  
  <div class="w-screen h-screen relative flex bg-cover bg-center" style="background-image: url('/fond_bambou.jpg')">
    <div class="flex-1 flex flex-col items-center justify-center text-white relative h-full">
      <h1 
  class="text-3xl mt-4 px-6 py-3 bg-black/40 rounded-xl 
         shadow-2xl shadow-black/70 backdrop-blur-sm drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
>
  Bambou : {{ counter }}
</h1>
      <button @click="incrementCounter" class="p-0 border-none bg-transparent
          hover:drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)]
         hover:scale-110
         active:scale-95
         transition-all duration-200
         cursor-pointer">
        <img :src="clickImg" alt="Panda" class="max-w-[200px] max-h-[200px]"/>
      </button>
      
 <button 
  @click="togglePanel" 
  class="mt-6 text-4xl font-extrabold text-white
         border border-transparent bg-transparent
         drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]
         hover:drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)]
         hover:scale-110
         transition-all duration-200
         cursor-pointer"
>
  Upgrades
</button>

    </div>

<transition name="slide-left">
  <div v-if="showPanel" 
       class="fixed left-0 top-0 h-full w-64 bg-white text-gray-900 p-6 flex flex-col gap-4 shadow-2xl z-50 rounded-r-3xl border-r border-gray-300">
    
    <!-- Titre -->
    <h2 class="text-3xl mt-4 px-6 py-3 bg-gray-800 text-white rounded-xl 
               shadow-2xl shadow-black/70 backdrop-blur-sm drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
      Upgrades
    </h2>

    <!-- Liste des upgrades -->
    <div v-for="(upgrade, index) in upgrades" :key="index">
      <button
        @click="buyUpgrade(upgrade)"
        :class="[
          'w-full px-5 py-3 rounded-2xl font-extrabold text-lg text-center transition-all duration-200 transform shadow-lg',
          counter.valueOf() >= upgrade.cost
            ? 'bg-green-500 hover:bg-green-600 hover:scale-105 hover:shadow-xl text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
        ]"
        :disabled="counter.valueOf() < upgrade.cost"
      >
        {{ upgrade.name }} (Coût: {{ upgrade.cost }})
      </button>
    </div>
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

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-enter-to {
  transform: translateX(0%);
}
.slide-left-leave-from {
  transform: translateX(0%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}



</style>
