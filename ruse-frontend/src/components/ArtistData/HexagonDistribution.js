import React from "react";
import Svg, { Defs, LinearGradient, Polygon, Stop } from "react-native-svg";
import { GLOBAL_PARS } from '../../globals';

const HexagonDistribution = () => {
  const {ANGLES} = GLOBAL_PARS;

  const points = [];

  const computePoint = (angle, ratio) => {
    let x = 125 + (Math.cos(angle) * (125 * ratio));
    let y = 125 + (Math.sin(angle)* (125 *ratio));
    //approx to 3 decimals
    x = Math.round((x + Number.EPSILON) * 1000) / 1000;
    y = Math.round((y + Number.EPSILON) * 1000) / 1000;
    const point = [x, y];
    return point;
  }

  ANGLES.forEach(e => points.push(computePoint(e, 1)));


  return (
    <div>
      <Svg width={250} height={250}>
        <Defs>
          <LinearGradient id="gradient1" gradientTransform="rotate(90)">
            <Stop offset="0%" stopColor="#fa3838" />
            <Stop offset="50%" stopColor="#a033ff" />
            <Stop offset="100%" stopColor="#3845fa" />
          </LinearGradient>
        </Defs>
        <Polygon 
            fill="url(#gradient1)"
            fillOpacity="1"
            points={`${points.map(p => {
                return `${p[0]},${p[1]} `;
              })}`}
        />
      </Svg>
    </div>
  )
}

  export default HexagonDistribution;