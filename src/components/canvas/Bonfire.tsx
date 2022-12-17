import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";

type Props = {};

export default function Bonfire(props: Props) {
  const bonFireRef = useRef<HTMLCanvasElement>(null);

  const bonFireImageRef = useRef<HTMLImageElement>();

  // Define the size of a frame
  const frameWidth = 160.5;
  const frameHeight = 246;

  // Rows and columns start from 0
  const row = useRef(0);
  const column = useRef(0);

  const x = "46%";
  const y = "55%";

  const intervalId = useRef(null);

  const renderbonFire = useCallback(
    (bonFireImageRef) => {
      const bonFire = bonFireRef?.current;
      const bonFireContext = bonFire?.getContext("2d");

      bonFireContext?.clearRect(0, 0, frameHeight, frameWidth);
      bonFireContext?.drawImage(
        bonFireImageRef,
        column.current * frameWidth,
        0,
        frameWidth,
        frameHeight,
        0,
        0,
        frameWidth,
        frameHeight
      );

      column.current < 5 ? column.current++ : (column.current = 0);
    },
    [frameHeight, frameWidth]
  );

  useEffect(() => {
    bonFireImageRef.current = new Image();
    bonFireImageRef.current.src = "/images/bonfire.png";

    // const bonFire = bonFireRef?.current;
    // const bonFireContext = bonFire?.getContext('2d');

    bonFireImageRef.current.onload = () => {
      if (!intervalId.current) {
        intervalId.current = setInterval(
          () => renderbonFire(bonFireImageRef.current),
          100
        );
      }
    };
  }, [frameHeight, frameWidth, renderbonFire]);

  return (
    <canvas
      style={{
        position: "absolute",
        zIndex: 1,
        top: y,
        left: x,
      }}
      id={"bonfire"}
      ref={bonFireRef}
      height={frameHeight}
      width={frameWidth}
    />
  );
}
