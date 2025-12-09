import k from "../kaplay";

export function loadEnd() {
  k.scene("end", (points: number, waves: number, enemiesDestroyed: number, money: number) => {
    k.add([
      k.text("you died"),
      k.color(255, 0, 0),
      k.pos(k.width() * 0.5, k.height() * 0.5),
      k.anchor("center"),
    ]);

    k.add([
      k.text("press space to restart"),
      k.color(255, 255, 255),
      k.opacity(0.2),
      k.pos(k.width() * 0.5, k.height() * 0.5 + 32),
      k.anchor("center"),
    ]);

    k.add([
      k.text("stats"),
      k.color(0, 255, 0),
      k.pos(0, k.height() - 32 * 5),
    ]);

    k.add([
      k.text("points: " + points),
      k.color(0, 255, 0),
      k.pos(0, k.height() - 32 * 4),
    ]);

    k.add([
      k.text("waves: " + waves),
      k.color(0, 255, 0),
      k.pos(0, k.height() - 32 * 3),
    ]);

    k.add([
      k.text("enemies destroyed: " + enemiesDestroyed),
      k.color(0, 255, 0),
      k.pos(0, k.height() - 32 * 2),
    ]);

    k.add([
      k.text("money: " + money),
      k.color(0, 255, 0),
      k.pos(0, k.height() - 32),
    ]);
    
    k.onKeyPress("space", () => {
      k.go("main");
    })

    k.onMousePress((m) => {
      console.log(m);
      if (m === 'left') k.go("main");
    });
  });
}