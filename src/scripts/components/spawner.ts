import k from '../kaplay';
import { getRandomPosition } from '../utils/random';
import { loadEnemyHealthBar } from './loaders/ui';

export default function spawn() {
  k.add([
    'player', // tag the object with "player"
    k.sprite('player', {
      anim: "idle",
    }),
    k.area({ scale: 0.6}),
    k.health(8),
    k.pos(k.center()),
    k.rotate(0),
    k.anchor('center'),
    k.scale(2),
    k.body(),
    {
      speed: 320, // custom property to store movement speed
      points: 0,
      attackSpeed: 1,
      maxHealth: 8,
      defeatedEnemies: 0,
      movex: 0,
      movey: 0,
    },
  ]);
  spawnEnemyWave();
}

export function spawnEnemyWave() {
  const wave = k.get("wave-settings")[0];
  const player = k.get("player")[0];

  const enemySpawnerLoop = k.loop(wave.enemySpawnRate, () => {
    const {x, y} = getRandomPosition();

    // prevents enemies from spawning on top of the player
    if (k.get('player')[0].pos.dist(k.vec2(x, y)) < 200) return;

    const enemy = k.add([
      'enemy', // tag the object with "enemy"
      k.sprite('enemy', {
        anim: "idle",
      }),
      k.area({ scale: 0.7 }),
      k.health(3),
      k.pos(x, y),
      k.scale(2),
      k.anchor('center'),
      k.body(),
      {
        speed: 120,
        maxHealth: 3,
      }
    ]);

    enemy.add([
      k.sprite('enemy-spark', {anim: 'idle'}),
      k.pos(0, -5),
      k.scale(0.6),
    ]);

    // shift enemy angle to look where its going
    enemy.onUpdate(() => {
        // Calculate the direction from the enemy to the player
        const dir = player.pos.sub(enemy.pos);

        // Flip the enemy sprite if needed
        if (dir.x < 0) {
          enemy.scale.x = 2; // Reset to the original scale
        } else {
          enemy.scale.x = -2; // Flip horizontally
        }
    });

    loadEnemyHealthBar();
    wave.enemiesSpawned += 1;

    if(wave.enemiesSpawned === wave.maxEnemies) {
      enemySpawnerLoop.cancel();
    }
  });
}