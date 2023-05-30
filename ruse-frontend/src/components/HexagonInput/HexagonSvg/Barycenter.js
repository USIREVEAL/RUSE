import React from "react";
import { Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { GLOBAL_PARS } from "../../../globals";
import { barycenterP } from '../../../utils';

const Barycenter = ({
  chart
}: Props) => {
  const { BULLET_RAY} = GLOBAL_PARS;

  const ratios = useSelector(st => st.chartPoints.ratios[chart]);
  const barP = barycenterP(ratios, chart);

  return (
    <>
      <Circle cx={barP[0]} cy={barP[1]} r={BULLET_RAY/4} fill="pink" />
    </>
  )
}

export default Barycenter;