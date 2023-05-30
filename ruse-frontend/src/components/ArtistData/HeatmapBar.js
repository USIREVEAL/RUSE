import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Svg, { Defs, LinearGradient, Polygon, Rect, Stop, Text } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { GLOBAL_PARS } from '../../globals';
import { getUpdateArtistEvent } from '../../socketAPI';

const HeatmapBar = ({
    names, ratio, direction, bounds, event, set, chart
}: Props) => {
  const {WIDTH} = GLOBAL_PARS;
  const compose = useSelector(st => st.settingsArtist.compose);

  const [updatedRatio, setUpdatedRatio] = useState(!event ? ratio[0] : 0);

  useEffect(() => {
    getUpdateArtistEvent((err, data) => {
      if (set === data.set && chart === data.chart) {
        setUpdatedRatio(data.ratio);
      }
    })

    if(!event) {
      setUpdatedRatio(0);
    }
    
  }, [event]);// eslint-disable-line react-hooks/exhaustive-deps
  
  const diff = bounds.max - bounds.min;

  const { t } = useTranslation();
  
  const adjustedWidth = WIDTH > 450 ? 350 : WIDTH;
  const offsetX = 60;
  const heatmapWidth = (adjustedWidth - offsetX);
  const heatmapHeight = 35;

  const settingsHeatmap = {
    pointerWidth: 10,
    pointerPercent: (ratio[0] + 1)/2,
    pointerPercentEvent: (updatedRatio + 1)/2,
    pointerHeight: 5,
    pointerLineWidth: 0.5
  }

  const val = Math.round((settingsHeatmap.pointerPercent * diff + bounds.min) * 100) / 100;
  const valEvent = Math.round((settingsHeatmap.pointerPercentEvent * diff + bounds.min) * 100) / 100;

  const pointerXBase = (settingsHeatmap.pointerWidth / 2 + settingsHeatmap.pointerPercent * heatmapWidth) + (offsetX/2);
  const pointerXBaseV = (settingsHeatmap.pointerWidth / 2 + (1 - settingsHeatmap.pointerPercent) * heatmapWidth) + (offsetX/2);
  const pointerXBaseEvent = (settingsHeatmap.pointerWidth / 2 + settingsHeatmap.pointerPercentEvent * heatmapWidth) + (offsetX/2);
  const polygonH = `
    ${pointerXBase - settingsHeatmap.pointerWidth / 2},${heatmapHeight + settingsHeatmap.pointerHeight + 20} 
    ${pointerXBase + settingsHeatmap.pointerWidth / 2},${heatmapHeight + settingsHeatmap.pointerHeight + 20}
    ${pointerXBase + settingsHeatmap.pointerLineWidth},${heatmapHeight + 20} 
    ${pointerXBase + settingsHeatmap.pointerLineWidth},20
    ${pointerXBase - settingsHeatmap.pointerLineWidth},20
    ${pointerXBase - settingsHeatmap.pointerLineWidth},${heatmapHeight + 20}
  `;

  const polygonV = `
    ${heatmapHeight + settingsHeatmap.pointerHeight} , ${pointerXBaseV - settingsHeatmap.pointerWidth / 2}
    ${heatmapHeight + settingsHeatmap.pointerHeight},${pointerXBaseV + settingsHeatmap.pointerWidth / 2}
    ${heatmapHeight} , ${pointerXBaseV + settingsHeatmap.pointerLineWidth}
    0,${pointerXBaseV + settingsHeatmap.pointerLineWidth} 
    0,${pointerXBaseV - settingsHeatmap.pointerLineWidth} 
    ${heatmapHeight},${pointerXBaseV - settingsHeatmap.pointerLineWidth}
  `;

  const polygonH2 = `
    ${pointerXBaseEvent - settingsHeatmap.pointerWidth / 2},15
    ${pointerXBaseEvent + settingsHeatmap.pointerWidth / 2},15
    ${pointerXBaseEvent + settingsHeatmap.pointerLineWidth},${settingsHeatmap.pointerHeight + 15} 
    ${pointerXBaseEvent + settingsHeatmap.pointerLineWidth},55 
    ${pointerXBaseEvent - settingsHeatmap.pointerLineWidth},55 
    ${pointerXBaseEvent - settingsHeatmap.pointerLineWidth},${settingsHeatmap.pointerHeight + 15}
  `;

  const textPointerH = [
    pointerXBase - settingsHeatmap.pointerWidth/2 + 4, 
    heatmapHeight + settingsHeatmap.pointerHeight + 13 + 17
  ];

  const textPointerHEvents = [
    pointerXBaseEvent - settingsHeatmap.pointerWidth/2 + 4, 
    10
  ];

  const textPointerV = [
    heatmapHeight + 7,
    pointerXBaseV - settingsHeatmap.pointerWidth / 2 + 10, 
  ];

  

  return (
    <Svg 
      width={direction === 'h'? adjustedWidth : heatmapHeight + 50}
      height={direction === 'h'? heatmapHeight + 60 : adjustedWidth}
    >
      <Defs>
        <LinearGradient id="gradient">
          <Stop offset="0%" stopColor="#3845fa" />
          <Stop offset="50%" stopColor="#a033ff" />
          <Stop offset="100%" stopColor="#fa3838" />
        </LinearGradient>
        <LinearGradient id="gradient2" gradientTransform="rotate(90)">
          <Stop offset="0%" stopColor="#fa3838" />
          <Stop offset="50%" stopColor="#a033ff" />
          <Stop offset="100%" stopColor="#3845fa" />
        </LinearGradient>
      </Defs>
      <Rect
        fill={direction === 'h' ? "url(#gradient)" : "url(#gradient2)"}
        width={direction === 'h'? heatmapWidth : heatmapHeight}
        height={direction === 'h'? heatmapHeight : heatmapWidth}
        x={direction === 'h' ? offsetX/2 : 0}
        y={direction === 'h' ? 20 : offsetX/2}
        rx='10px'
        ry='10px'
      />
      <Text
        fill="#e53358"
        fontSize="15"
        fontWeight="bold"
        x={direction === 'h' ? offsetX/2 : 0}
        y={direction === 'h' ? heatmapHeight + 45 : 15}
        textAnchor={direction === 'h' ? 'start' : 'start'}
      >
          {direction === 'h' ? t(names.low) : 'High'}
      </Text>
      <Text
        fill="#e53358"
        fontSize="15"
        fontWeight="bold"
        x={direction === 'h' ? adjustedWidth - offsetX/2 : 0}
        y={direction === 'h' ? heatmapHeight + 45 : adjustedWidth - 5}
        textAnchor={direction === 'h' ? 'end' : 'start'}
      >
          {direction === 'h' ? t(names.top) : 'Low'}
      </Text>
      {
        !event ?
          <>
            <Text
              fill="white"
              fontSize="12"
              fontWeight="bold"
              x={direction === 'h' ? textPointerH[0] : textPointerV[0]}
              y={direction === 'h' ? textPointerH[1] : textPointerV[1]}
              textAnchor={direction === 'h' ? 'middle' : 'start'}
            > 
                {`${val} ${bounds.measureUnit}`}
            </Text>
            <Polygon points={direction === 'h' ? polygonH : polygonV} fill="#fff" />
          </> : null
      }
      {
        direction === 'h' && event && !compose ?
        <>
          <Polygon points={polygonH2} fill="#fde412" />
          <Text
            fill="#fde412"
            fontSize="12"
            fontWeight="bold"
            x={textPointerHEvents[0]}
            y={textPointerHEvents[1]}
            textAnchor={'middle'}
          > 
              {`${valEvent} ${bounds.measureUnit}`}
          </Text> 
        </> : null
      }
    </Svg>
      
  )
}

  export default HeatmapBar;