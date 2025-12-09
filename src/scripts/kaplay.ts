// See the settings page: https://kaplayjs.com/
import kaplay from "kaplay";

export const k = kaplay({
  canvas: document.getElementById("game") as HTMLCanvasElement,
  background: [ 0, 0, 0],
  font: "sans-serif",
});

export default k;
