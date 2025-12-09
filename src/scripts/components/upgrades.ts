import k from "../kaplay";
import { loadPlayerAttack } from "./loaders/animations";

export function upgradePlayerAttackSpeed() {
  const player = k.get("player")[0];

  player.attackSpeed -= 0.1;
  if (player.attackSpeed < 0.2) {
    player.attackSpeed = 0.1;
    return;
  }
  player.attackloopEvent.cancel();

  loadPlayerAttack(player);
}