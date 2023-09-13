const transformStyle = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): React.CSSProperties => {
  return {
    transform: `translate3d(${x / 1000}px, ${y / 1000}px, 0) rotateX(${
      -y / 1000
    }deg) rotateY(${x / 2000}deg)`,
  };
};

const eyeTransformStyle = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): React.CSSProperties => {
  return {
    transform: `translate3d(${x / 10}px, ${y / 10}px, 0) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`,
  };
};

const dotStyle = (size: number): React.CSSProperties => {
  return {
    width: `${size}%`,
  };
};

const calculateDotSize = (x: number, y: number): number => {
  const minDiameterBlack = 15;
  const maxDiameterBlack = 30;

  const i = Math.abs((x + y) / 2);
  const xmax = window.innerWidth / 40;
  const ymax = window.innerHeight / 40;
  const imax = (ymax + xmax) / 2;
  const ipercent = (i * 100) / imax;

  const diameterBlack =
    (ipercent * (minDiameterBlack - maxDiameterBlack)) / 100 + maxDiameterBlack;

  return diameterBlack;
};


export {
  transformStyle,
  eyeTransformStyle,
  dotStyle,
  calculateDotSize,
};