import { GameObj } from "kaplay";
import k from "../kaplay";
import { loadWaveUI } from "./loaders/ui";
import { spawnEnemyWave } from "./spawner";

export default function loadWaves() {
  k.add([
    'wave-settings',
    {
      value: 1,
      text: `Wave ${1}`,
      maxEnemies: 12,
      enemiesSpawned: 0,
      enemySpawnRate: 2,
      hasMaxEnemiesReached: false,
      haveAllEnergiesBeenCollected: false,
      shouldAbsorbEnergy: false
    }
  ]);
}


export function checkWaveClear() {
  const wave = k.get("wave-settings")[0];
  const enemies = k.get("enemy");
  const collectibles = k.get("collectible");

  if (wave.hasMaxEnemiesReached && enemies.length === 0) {
    wave.text = 'Wave Cleared';

    wave.shouldAbsorbEnergy = true;

    if (collectibles.length === 0) {
      wave.haveAllEnergiesBeenCollected = true;

      k.wait(4, () => {
        wave.value++;
        wave.text = `Wave ${wave.value}`;
        wave.hasMaxEnemiesReached = false;
        wave.haveAllEnergiesBeenCollected = false;
        wave.maxEnemies += wave.maxEnemies + (wave.value * 2);
        wave.enemySpawnRate -= 0.1;
        wave.shouldAbsorbEnergy = false;

        loadWaveUI();
        spawnEnemyWave();
      });
    }
  }

  loadWaveUI();
}