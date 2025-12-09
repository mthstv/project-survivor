import k from "../kaplay";

export const getRandomPosition = () => {
  const x = k.rand(32, 1600);
  const y = k.rand(32, 800);

  return { x, y };
};