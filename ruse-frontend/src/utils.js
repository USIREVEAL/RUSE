import { GLOBAL_PARS, inputHexagons } from './globals';

const {CX, CY, RAY} = GLOBAL_PARS;

const computePoint = (angle, ratio) => {
  let x = CX + (Math.cos(angle) * (RAY * ratio));
  let y = CY + (Math.sin(angle)* (RAY *ratio));
  //approx to 3 decimals
  x = Math.round((x + Number.EPSILON) * 1000) / 1000;
  y = Math.round((y + Number.EPSILON) * 1000) / 1000;
  const point = [x, y];
  return point;
}

const barycenterP = (ratios, chart) => {

  const data = inputHexagons[chart];
  const points = [];

  ratios.forEach((ratio, index) => {
    const edgePoint = computePoint(data[index].angle - Math.PI, ratio);
    points.push(edgePoint);
  });

  const sumX = points.reduce(function(r, a){
    return r + a[0];
  }, 0);
  
  const sumY = points.reduce(function(r, a){
    return r + a[1];
  }, 0);

  const barX = Math.round(((sumX/3) + Number.EPSILON) * 1000) / 1000;
  const barY = Math.round(((sumY/3) + Number.EPSILON) * 1000) / 1000;
  
  return [barX, barY];
}

export { computePoint };
export { barycenterP };

