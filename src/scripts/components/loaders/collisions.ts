import { GameObj } from "kaplay";
import k from "../../kaplay";
import { loadEnemyHealthBar, loadPlayerHealthBar } from "./ui";
import { checkWaveClear } from "../waves";

export default function loadCollisions() {
  const player = k.get("player")[0];
  const wave = k.get("wave-settings")[0];

  player.onCollide("enemy", (e: GameObj) => {
    k.destroy(e);
    player.hurt(1);
    loadPlayerHealthBar();
    k.shake(5);

    if (player.hp() <= 0) {
      k.go("end", player.points, wave.value, player.defeatedEnemies, player.points);
    }

    player.defeatedEnemies += 1;
    if (player.defeatedEnemies >= wave.maxEnemies) {
      wave.hasMaxEnemiesReached = true;
    }

    checkWaveClear();
  });

  k.onCollide("attack", "enemy", (pr: GameObj, e: GameObj) => {
    k.destroy(pr);
    e.hurt(1);
    loadEnemyHealthBar();

    
    if (e.hp() <= 0) {
      k.destroy(e);

      k.add([
        'collectible',
        k.sprite("energy", {
          anim: "idle",
        }),
        k.area({ scale: 3 }),
        k.pos(e.pos),
        k.scale(0.8),
        k.rotate(0),
        k.anchor("center"),
      ]);

      player.defeatedEnemies += 1;
      if (player.defeatedEnemies >= wave.maxEnemies) {
        wave.hasMaxEnemiesReached = true;
      }

      checkWaveClear();
    }
  });

  k.onCollide("collectible", "player", (c: GameObj, p: GameObj) => {
    const score = k.get("points-counter")[0];

    k.destroy(c);
    player.points += 1;

    score.text = `$ ${player.points}`;
    score.value = player.points;
    // upgradePlayerAttackSpeed();

    
    if (player.hp() < player.maxHealth) {
      player.heal(1);
      loadPlayerHealthBar();
    }
    
    checkWaveClear();
  });
}