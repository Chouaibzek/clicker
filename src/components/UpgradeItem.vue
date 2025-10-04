<script setup lang="ts">
import { computed } from 'vue'

export interface Upgrade {
  name: string
  cost: number
  level: number
  type?: 'click' | 'passive' // 'click' pour les dégâts par clic, 'passive' pour les DPS
}

const props = defineProps<{
  upgrade: Upgrade
  currentBamboo: number
}>()

const emit = defineEmits<{
  buy: [upgrade: Upgrade]
}>()

const canBuy = computed(() => props.currentBamboo >= props.upgrade.cost)

function handleBuy(): void {
  if (canBuy.value) {
    emit('buy', props.upgrade)
  } else {
    alert("Pas assez de points !")
  }
}
</script>

<template>
  <div class="px-4 mb-4 flex justify-center">
    <button
      @click="handleBuy"
      :class="[
        'w-[85%] min-h-[60px] px-6 py-4 rounded-2xl font-bold text-xl text-center',
        'transition-all duration-200 relative overflow-hidden',
        'shadow-lg hover:shadow-xl active:translate-y-1',
        'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-white/50 before:to-white/20',
        canBuy
          ? upgrade.type === 'passive'
            ? 'bg-[#9C27B0] hover:bg-[#7B1FA2] hover:scale-105 text-white border-2 border-[#6A1B9A] shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_-4px_0_rgba(0,0,0,0.2)]'
            : 'bg-[#4CAF50] hover:bg-[#388E3C] hover:scale-105 text-white border-2 border-[#2E7D32] shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_-4px_0_rgba(0,0,0,0.2)]'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
      ]"
      :disabled="!canBuy"
    >
      <div>
        {{ upgrade.name }} (Niv. {{ upgrade.level }})
        <div class="text-sm mt-1 font-normal">
          <template v-if="upgrade.type === 'passive'">
            +1 bambou/sec
          </template>
          <template v-else>
            +1 bambou/clic
          </template>
        </div>
        <div class="text-xs mt-1 opacity-80">Coût: {{ upgrade.cost }} bambou</div>
      </div>
    </button>
  </div>
</template>

