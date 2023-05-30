import React from "react";
import { useTranslation } from 'react-i18next';
import Text from 'react-svg-text';
import { inputHexagons } from '../../../globals';
import { computePoint } from '../../../utils';

const HexagonTexts = ({
  chart, addAngle
}: Props) => {

  const { t } = useTranslation();
  const data = inputHexagons[chart];

  return (
    <>
    {
      data.map((p) => {
          const edgePoint = computePoint(p.angle + addAngle, 1.15);
          return (
              <Text
                  key={p.angle+addAngle}
                  fill="#e53358"
                  fontSize="15"
                  fontWeight="bold"
                  x={edgePoint[0]}
                  y={edgePoint[1]}
                  textAnchor='middle'
                  angle={p.angle <= (Math.PI * 5/6) ? (p.angle)*(180/Math.PI) - 90 : (p.angle)*(180/Math.PI) + 90}
              >
                  {t(addAngle === Math.PI ? p.name.top : p.name.low)}
              </Text>
          )
      })
    }
    </>
  )
}

export default HexagonTexts;