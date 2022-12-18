import { GetServerSideProps } from "next";
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { fetcher, postFetcher } from "../../helper/Helper";
import useSWR from "swr";
import _ from "lodash";

export default function SnowFlake() {
  const snowRef = useRef<HTMLCanvasElement>(null);

  const windowHeight = useRef(0);
  const windowWidth = useRef(0);

  useEffect(() => {
    windowHeight.current = document.body.offsetHeight;
    windowWidth.current = document.body.offsetWidth;
  }, []);

  // const snowVersion1 = useCallback(() => {
  //     const canvas = snowRef?.current;
  //     const canvasContext = canvas?.getContext('2d');

  //     var flakes = [];
  //     const flakeCount = 200;
  //     let mX = -100;
  //     let mY = -100;

  // function snow() {
  //     canvasContext.clearRect(0, 0, windowWidth.current, windowHeight.current);

  //     for (var i = 0; i < flakeCount; i++) {
  //         var flake = flakes[i],
  //             x = mX,
  //             y = mY,
  //             minDist = 150,
  //             x2 = flake.x,
  //             y2 = flake.y;

  //         var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
  //             dx = x2 - x,
  //             dy = y2 - y;

  //         if (dist < minDist) {
  //             var force = minDist / (dist * dist),
  //                 xcomp = (x - x2) / dist,
  //                 ycomp = (y - y2) / dist,
  //                 deltaV = force / 2;

  //             flake.velX -= deltaV * xcomp;
  //             flake.velY -= deltaV * ycomp;

  //         } else {
  //             flake.velX *= .98;
  //             if (flake.velY <= flake.speed) {
  //                 flake.velY = flake.speed
  //             }
  //             flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
  //         }

  //         canvasContext.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
  //         flake.y += flake.velY;
  //         flake.x += flake.velX;

  //         if (flake.y >= windowHeight.current || flake.y <= 0) {
  //             reset(flake);
  //         }

  //         if (flake.x >= windowWidth.current || flake.x <= 0) {
  //             reset(flake);
  //         }

  //         canvasContext.beginPath();
  //         canvasContext.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
  //         canvasContext.fill();
  //     }
  //     requestAnimationFrame(snow);
  // };

  // function reset(flake) {
  //     flake.x = Math.floor(Math.random() * windowWidth.current);
  //     flake.y = 0;
  //     flake.size = (Math.random() * 3) + 2;
  //     flake.speed = (Math.random() * 1) + 0.5;
  //     flake.velY = flake.speed;
  //     flake.velX = 0;
  //     flake.opacity = (Math.random() * 0.9) + 0.1;
  // }

  // function init() {
  //     for (var i = 0; i < flakeCount; i++) {
  //         var x = Math.floor(Math.random() * windowWidth.current),
  //             y = Math.floor(Math.random() * windowHeight.current),
  //             size = (Math.random() * 3) + 2,
  //             speed = (Math.random() * 1) + 0.5,
  //             opacity = (Math.random() * 0.5) + 0.3;

  //         flakes.push({
  //             speed: speed,
  //             velY: speed,
  //             velX: 0,
  //             x: x,
  //             y: y,
  //             size: size,
  //             stepSize: (Math.random()) / 30,
  //             step: 0,
  //             angle: 180,
  //             opacity: opacity
  //         });
  //     }
  //     snow();
  //     };
  // }, []);

  // const canvas = snowRef?.current;
  // const canvasContext = useMemo(() => canvas?.getContext('2d'), [canvas]);
  const snowVersion2 = useCallback((context) => {
    if (!context) return;
    // Variables
    const snowAttributes = {
      particleCount: 400, // Change amount of snowflakes
      particleSize: 4, // Max size of a snowflake
      fallingSpeed: 1, // Intensity of the snowfall horizontal
      colors: ["#ccc", "#eee", "#fff", "#ddd"], // Array of usable colors
    };

    // Utility Functions
    function randomIntFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Objects
    function Particle(x, y, radius, color, radians) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.radians = radians;
      this.velocity = 0.001;

      this.update = () => {
        // Move these points over time
        this.radians += this.velocity;
        this.x = x + Math.cos(this.radians) * 200;
        this.y = y + Math.tan(this.radians) * 200;

        this.draw();
      };

      this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();

        context.closePath();
      };
    }

    // Implementation
    let particles;
    function init() {
      particles = [];
      for (let i = 0; i < snowAttributes.particleCount; i++) {
        particles.push(
          new Particle(
            Math.random() * windowWidth.current,
            Math.random() * windowHeight.current,
            randomIntFromRange(0.5, snowAttributes.particleSize),
            randomColor(snowAttributes.colors),
            Math.random() * 80
          )
        );
      }
    }

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      context?.clearRect(0, 0, windowWidth.current, windowHeight.current);

      particles.forEach((particle) => {
        particle.update();
      });
    }

    init();
    animate();
  }, []);

  useEffect(() => {
    const context = snowRef?.current.getContext("2d");

    snowVersion2(context);
  }, [snowVersion2]);

  return (
    <canvas
      style={{
        position: "absolute",
        zIndex: 2,
      }}
      id={"snow"}
      ref={snowRef}
      height={windowHeight.current}
      width={windowWidth.current}
    />
  );
}
