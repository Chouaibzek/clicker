import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import type { Upgrade } from '../components/UpgradeItem.vue'

export interface GameState {
  counter: number
  damage: number
  dps: number
  upgrades: Upgrade[]
  timestamp: number
}

export function useSaveSystem(
  counter: Ref<number>,
  damage: Ref<number>,
  dps: Ref<number>,
  upgrades: Ref<Upgrade[]>
) {
  const lastSaveTime = ref<string>('')

  // Fonction pour sauvegarder l'état du jeu
  function saveGame() {
    const gameState: GameState = {
      counter: counter.value,
      damage: damage.value,
      dps: dps.value,
      upgrades: upgrades.value,
      timestamp: Date.now()
    }
    
    localStorage.setItem('clickerGameSave', JSON.stringify(gameState))
    const now = new Date()
    lastSaveTime.value = now.toLocaleTimeString()
    console.log('Jeu sauvegardé !', lastSaveTime.value)
    
    // Notification de sauvegarde réussie
    alert('Partie sauvegardée avec succès !')
  }

  // Fonction pour charger la sauvegarde
  function loadGame() {
    try {
      const savedGame = localStorage.getItem('clickerGameSave')
      if (savedGame) {
        const gameState: GameState = JSON.parse(savedGame)
        counter.value = gameState.counter
        damage.value = gameState.damage
        dps.value = gameState.dps
        upgrades.value = gameState.upgrades
        
        // Récupérer l'heure de la dernière sauvegarde
        if (gameState.timestamp) {
          const savedDate = new Date(gameState.timestamp)
          lastSaveTime.value = savedDate.toLocaleTimeString()
        }
        
        console.log('Sauvegarde chargée avec succès !')
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la sauvegarde:', error)
    }
  }

  // Initialiser le système de sauvegarde
  onMounted(() => {
    // Charger la sauvegarde au démarrage
    loadGame()
    
    // Plus de sauvegarde automatique - uniquement via le bouton
  })

  // Pas besoin de nettoyer les ressources car il n'y a plus d'intervalle ni d'écouteur d'événement
  onUnmounted(() => {
    // Rien à nettoyer
  })

  // Fonction pour supprimer la sauvegarde
  function deleteSave() {
    // Demander confirmation avant de supprimer
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre sauvegarde et réinitialiser le jeu ?')
    
    if (confirmDelete) {
      try {
        localStorage.removeItem('clickerGameSave')
        counter.value = 0
        damage.value = 1
        dps.value = 0
        upgrades.value = [
          { name: 'Attack +1', cost: 10, level: 0, type: 'click' },
          { name: 'Auto-Bambou', cost: 25, level: 0, type: 'passive' },
        ]
        lastSaveTime.value = ''
        console.log('Sauvegarde supprimée avec succès !')
        alert('Sauvegarde supprimée avec succès. Le jeu a été réinitialisé.')
      } catch (error) {
        console.error('Erreur lors de la suppression de la sauvegarde:', error)
        alert('Erreur lors de la suppression de la sauvegarde.')
      }
    }
  }

  return {
    lastSaveTime,
    saveGame,
    loadGame,
    deleteSave
  }
}
