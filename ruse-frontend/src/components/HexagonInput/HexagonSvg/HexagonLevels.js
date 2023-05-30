import React from "react";
import { Path } from 'react-native-svg';
import { inputHexagons } from '../../../globals';
import { computePoint } from '../../../utils';

const HexagonLevels = ({
  chart
}: Props) => {
  const level = [1, 0.75, 0.5, 0.25];

  const data = inputHexagons[chart];

  const pointsToPath = (points) => {
    let p = points.split(/\s+|,/);
    let x0=p.shift(), y0=p.shift();
    let pathdata = 'M'+x0+','+y0+'L'+p.join(' ')+'z';
    return pathdata;
  }

  return (
    <>
      {
        level.map(el => (
          <Path 
            key={el}
            stroke="#4e4e50"
            strokeWidth="1.5"
            strokeLinejoin="round"
            rx="15"
            fill="transparent"
            fillOpacity="0.7"
            d={pointsToPath(`${data.map(p => {
                const edgePoint = computePoint(p.angle, el);
                return `${edgePoint[0]},${edgePoint[1]} `;
              })}${data.map(p => {
                const edgePoint = computePoint(p.angle + Math.PI, el);
                return `${edgePoint[0]},${edgePoint[1]}`;
              })}`)}
          />
        ))
      }
    </>
  )
}

export default HexagonLevels;