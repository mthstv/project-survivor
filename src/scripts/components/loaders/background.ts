import k from "../../kaplay";

export default function loadBackground() {
  k.addLevel([
    "====",
    "====",
  ], {
    tileWidth: 410,
    tileHeight: 410,
    tiles: {
        "=": () => [
            k.sprite("dirt"),
            k.scale(0.5),
        ],
    }
  })

  // Map borders
  const borderSize = 120;
  const borderHeight = 820;
  const borderwidth = 1640;

  k.add([
    'left-border',
    k.rect(borderSize , borderHeight + borderSize + borderSize),
    k.color(0, 0, 255),
    k.opacity(0.2),
    k.pos(-borderSize, -borderSize),
    k.area(),
    k.body({ isStatic: true}),
  ])

  k.add([
    'right-border',
    k.rect(borderSize, borderHeight + borderSize + borderSize),
    k.color(0, 0, 255),
    k.opacity(0.2),
    k.pos(borderwidth, -borderSize),
    k.area(),
    k.body({ isStatic: true}),
  ])

  k.add([
    'top-border',
    k.rect(borderwidth + borderSize + borderSize, borderSize),
    k.color(0, 0, 255),
    k.opacity(0.2),
    k.pos(-borderSize, -borderSize),
    k.area(),
    k.body({ isStatic: true}),
  ])
  
  k.add([
    'bottom-border',
    k.rect(borderwidth + borderSize + borderSize, borderSize),
    k.color(0, 0, 255),
    k.opacity(0.2),
    k.pos(-borderSize, borderHeight),
    k.area(),
    k.body({ isStatic: true}),
  ])
}
