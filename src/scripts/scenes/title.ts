import k from "../kaplay";

export function loadTitle() {
  k.scene("title", () => {
    k.add([
      k.text("survive"),
      k.color(0, 255, 0),
      k.pos(k.width() * 0.5, k.height() * 0.5),
      k.anchor("center"),
    ]);
    
    k.add([
      k.text("press space to start"),
      k.color(255, 255, 255),
      k.opacity(0.2),
      k.pos(k.width() * 0.5, k.height() * 0.5 + 32),
      k.anchor("center"),
    ]);
    
    k.onKeyPress("space", () => {
      k.go("main");
    });

    k.onMousePress((m) => {
      console.log(m);
      if (m === 'left') k.go("main");
    });
  });
}