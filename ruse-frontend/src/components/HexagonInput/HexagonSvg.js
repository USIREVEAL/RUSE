import React from 'react';
import { Line, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { GLOBAL_PARS, inputHexagons } from '../../globals';
import { computePoint } from '../../utils';
import Barycenter from './HexagonSvg/Barycenter';
import HexagonLevels from './HexagonSvg/HexagonLevels';
import HexagonTexts from './HexagonSvg/HexagonTexts';
import TwoHexagon from './HexagonSvg/TwoHexagon';

const HexagonSvg = ({
    chart
}: Props) => {
    const {CX, CY, HEIGHT, WIDTH} = GLOBAL_PARS;
    const data = inputHexagons[chart];
    const withDiagonals = useSelector(st => st.chartPoints.withDiagonals);
    const withBar = useSelector(st => st.chartPoints.withBarycenter);

    return (
        <Svg height={HEIGHT} width={WIDTH}>
            <TwoHexagon />
            <HexagonLevels chart={chart}/>
            {
              withDiagonals ?
                data.map(el => ( 
                    <Line 
                      key={el.angle} 
                      x1={CX} 
                      y1={CY} 
                      x2={computePoint(el.angle, 1)[0]} 
                      y2={computePoint(el.angle, 1)[1]} 
                      stroke="black" 
                      strokeWidth="0.5" 
                      fill="transparent" />
                )) : null
            }
            { 
              withDiagonals ?
                data.map(el => ( 
                    <Line 
                      key={el.angle + Math.PI} 
                      x1={CX} 
                      y1={CY} 
                      x2={computePoint(el.angle + Math.PI, 1)[0]} 
                      y2={computePoint(el.angle + Math.PI, 1)[1]} 
                      stroke="black" 
                      strokeWidth="1" 
                      fill="transparent" />
                )) : null
            }
            {
              withBar ?
                <Barycenter chart={chart}/>
              : null
            }
            <HexagonTexts chart={chart} addAngle={Math.PI} />
            <HexagonTexts chart={chart} addAngle={0} />
        </Svg>
    )
  }

  export default HexagonSvg;