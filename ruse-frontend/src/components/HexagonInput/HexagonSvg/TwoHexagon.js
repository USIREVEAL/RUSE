import React from "react";
import Svg, { Defs, LinearGradient, Polygon, Stop } from 'react-native-svg';
import { GLOBAL_PARS } from '../../../globals';
import { computePoint } from '../../../utils';

const TwoHexagon = () => {

  const {ANGLES} = GLOBAL_PARS;

  const computeMidpoint = (point1, point2) => {
      const x = (point1[0] + point2[0])/2;
      const y = (point1[1] + point2[1])/2;
      return [x, y];
  }

  const midPoint1 = computeMidpoint(computePoint(ANGLES[3], 1), computePoint(ANGLES[2], 1));
  const midPoint2 = computeMidpoint(computePoint(ANGLES[0], 1), computePoint(ANGLES[5], 1));

  const computeHalfHexagon = (half) => {
    let points = [];

    if (half) {
        points.push(midPoint1);
        points.push(computePoint(ANGLES[3], 1));
        points.push(computePoint(ANGLES[4], 1));
        points.push(computePoint(ANGLES[5], 1));
        points.push(midPoint2);
    } else {
        points.push(midPoint2);
        points.push(computePoint(ANGLES[0], 1));
        points.push(computePoint(ANGLES[1], 1));
        points.push(computePoint(ANGLES[2], 1));
        points.push(midPoint1);
    }

    return points;
  }

  return (
    <Svg>
      <Defs>
        <LinearGradient id="gradient1" gradientTransform="rotate(90)">
          <Stop offset="0%" stopColor="#fa3838" />
          <Stop offset="100%" stopColor="#a033ff" />
        </LinearGradient>
        <LinearGradient id="gradient2" gradientTransform="rotate(90)">
          <Stop offset="0%" stopColor="#a033ff" />
          <Stop offset="100%" stopColor="#3845fa" />
        </LinearGradient>
      </Defs>
      <Polygon 
          fill="url(#gradient1)"
          fillOpacity="1"
          points={`${computeHalfHexagon(true).map(p => {
              return `${p[0]},${p[1]} `;
            })}`}
      />
      <Polygon 
          fill="url(#gradient2)"
          fillOpacity="1"
          points={`${computeHalfHexagon(false).map(p => {
              return `${p[0]},${p[1]} `;
            })}`}
      />
    </Svg>
  )
}

export default TwoHexagon;