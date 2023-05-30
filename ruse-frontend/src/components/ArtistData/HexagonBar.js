import React from 'react';
import { Circle, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { GLOBAL_PARS } from '../../globals';
import { barycenterP } from '../../utils';
import HexagonLevels from '../HexagonInput/HexagonSvg/HexagonLevels';
import HexagonTexts from '../HexagonInput/HexagonSvg/HexagonTexts';
import TwoHexagon from '../HexagonInput/HexagonSvg/TwoHexagon';

const HexagonBar = ({
    chart
}: Props) => {
    const {HEIGHT, WIDTH, BULLET_RAY} = GLOBAL_PARS;
    const ratios = useSelector(st => st.settingsArtist.ratios);
    const barP = barycenterP(ratios[chart], chart);

    return (
        <Svg height={HEIGHT} width={WIDTH}>
            <TwoHexagon />
            <HexagonLevels chart={chart}/>
            <Circle cx={barP[0]} cy={barP[1]} r={BULLET_RAY/2} fill="pink" />
            <HexagonTexts chart={chart} addAngle={0} />
            <HexagonTexts chart={chart} addAngle={Math.PI} />
        </Svg>
    )
  }

  export default HexagonBar;