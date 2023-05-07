export type Star = {
  x: number;
  y: number;
  z: number;
  speed: number;
  color: string;
  opacity: number;
  acceleration: number;
};

export const createStar = (canvas: HTMLCanvasElement): Star => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const minDistanceFromCenter = 100;

  let x, y;
  let distanceFromCenter;

  do {
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  } while (distanceFromCenter < minDistanceFromCenter);

  return {
    x: x,
    y: y,
    z: Math.random(),
    speed: Math.random() * 0.01 + 0.01,
    color: `hsl(${Math.random() * 360}, 100%, 80%)`,
    opacity: Math.random() * 0.5 + 0.5,
    acceleration: 1,
  };
};
