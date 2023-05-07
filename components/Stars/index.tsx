"use client";

import { useEffect, useRef } from "react";
import { Star, createStar } from "./utils";

const Stars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stars: Star[] = [];

    const initCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 10000);
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push(createStar(canvas));
      }
    };

    const drawStars = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        const x = centerX + (star.x - centerX) * (1 + star.z);
        const y = centerY + (star.y - centerY) * (1 + star.z);

        ctx.beginPath();
        ctx.arc(x, y, star.z * 2, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.closePath();
      });

      ctx.globalAlpha = 1;
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.z += star.speed * star.acceleration;
        star.acceleration += 0.01;
        if (star.z > 2) {
          const newStar = createStar(canvas);
          Object.assign(star, newStar);
        }
      });
    };

    const loop = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(loop);
    };

    const handleResize = () => {
      initCanvasSize();
      createStars();
    };

    initCanvasSize();
    createStars();
    loop();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-screen fixed top-0 left-0 z-[-1] bg-black"
    ></canvas>
  );
};

export { Stars };
