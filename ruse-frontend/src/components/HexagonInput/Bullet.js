import React, { useCallback, useState } from "react";
import { Animated, PanResponder } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_PARS, inputHexagons } from '../../globals';
import { updateFromAudience } from '../../socketAPI';
import * as actions from '../../store/actions';
import { barycenterP, computePoint } from '../../utils';

const Bullet = ({
    nPoint,
    chart
}: Props) => {
    const {RAY, BULLET_RAY} = GLOBAL_PARS;
    const data = inputHexagons[chart];
    const ratios = useSelector(st => st.chartPoints.ratios[chart]);
    const eCode = useSelector(st => st.clientReducer.eCode);

    const dispatch = useDispatch();

    const setRatios = useCallback(
        data => {
          dispatch(actions.setRatios(data));
        },
        [dispatch],
    );

    const angleView = data[nPoint].angle - Math.PI;
    //x: [0], y: [1]
    const [offsets, setOffsets] = useState(computePoint(angleView, ratios[nPoint]));
    const [colorUp, setColorUp] = useState('#1a1a1d')
    const [colorDown, setColorDown] = useState('#1a1a1d')
    
    const [animation] = useState(new Animated.ValueXY({x: (offsets[0] - BULLET_RAY), y: (offsets[1] - BULLET_RAY)}));
    const [ratio, setRatio] = useState(ratios[nPoint]);

    const updatePoint = (ratio) => {
        const newArray = [];

        for (let i = 0; i < ratios.length; i++) {
            if (i === nPoint ) {
                newArray.push(ratio);
            } else {
                newArray.push(ratios[i]);
            }
        }
        setRatios({chart: chart, ratio: newArray});
    }

    const projectPoint = (dX, dY) => {
        let target = {x: offsets[0] + dX, y: offsets[1] + dY};

        let ipotenusa = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

        let angle = angleView - Math.atan2(target.y - offsets[1], target.x - offsets[0]);

        let dist = (RAY * ratio) + Math.cos(angle) * ipotenusa;

        return dist;
    }

    const computeNewRatio = (dx, dy) => {
        let newDist = Math.round(projectPoint(dx, dy));

        if (newDist > RAY) {
            newDist = RAY;
        }

        if (newDist < -RAY) {
            newDist = -RAY;
        }

        let newRatio = newDist/RAY;
        newRatio = Math.round((newRatio + Number.EPSILON) * 1000) / 1000;
        return newRatio;
    }
    // useEffect(() => {
    //     console.log('changed')
    //     let newIntRatio = ratio;
    //     let newCoords = computePoint(angleView, newIntRatio);
    //     animation.setValue({x: Math.round(newCoords[0] - BULLET_RAY), y: Math.round(newCoords[1] - BULLET_RAY) });
    //     setOffsets(newCoords);

    //     // onUpdateNextInterval((err, data) => {
    //     //     console.log('bullet received')
    //     //     newIntRatio = data.ratios[chart][nPoint];
    //     //     let newCoords = computePoint(angleView, newIntRatio);

    //     //     animation.setValue({x: Math.round(newCoords[0] - BULLET_RAY), y: Math.round(newCoords[1] - BULLET_RAY) });
    //     //     setOffsets(newCoords);
    //     //   })

    // });// eslint-disable-line react-hooks/exhaustive-deps

    const handlePanResponderMove = (e, gt) => {
        
        const newRatio = computeNewRatio(gt.dx, gt.dy);
        if (newRatio > ratio ) {
            if (colorUp !== '#f5f7fa') {
                setColorDown('#1a1a1d')
                setColorUp('#f5f7fa')
            }
        } 
        if (newRatio < ratio ) {
            if (colorDown !== '#f5f7fa' ) {
                setColorUp('#1a1a1d')
                setColorDown('#f5f7fa')
            }
        } 
        setRatio(newRatio);
       // updatePoint(newRatio);

        let newCoords = computePoint(angleView, ratio);

        animation.setValue({x: Math.round(newCoords[0] - BULLET_RAY), y: Math.round(newCoords[1] - BULLET_RAY) });
        setOffsets(newCoords);
    };
    const handlePanResponderRelease = (e, gt) => {
        setColorDown('#1a1a1d');
        setColorUp('#1a1a1d');
        
        const newRatio = computeNewRatio(gt.dx, gt.dy);
        setRatio(newRatio);
        updatePoint(newRatio);
        const barP = barycenterP(ratios, chart);
        updateFromAudience({chart: chart, set: nPoint, barycenter: barP, data: {...data[nPoint], ratio: newRatio}, timestamp: new Date()}, eCode);

        let newCoords = computePoint(angleView, ratio);

        animation.setValue({x: Math.round(newCoords[0] - BULLET_RAY), y: Math.round(newCoords[1] - BULLET_RAY) });
        setOffsets(newCoords);
    };

     const handlePanResponderGrant = (e, gt) => {
        // setColorDown('#1a1a1d');
        // setColorUp('#1a1a1d');
     }


    const animatedStyle = {
        transform: [...animation.getTranslateTransform()]
    }

    const _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => handlePanResponderGrant(evt, gestureState),
        onPanResponderMove: (evt, gestureState) => handlePanResponderMove(evt, gestureState),
        onPanResponderRelease: (evt, gestureState) =>  handlePanResponderRelease(evt, gestureState),
    });

    const panHandlers = _panResponder.panHandlers;

    return (
            <Animated.View
                { ...panHandlers }
                style={[{position: "absolute", height: BULLET_RAY*2, width: BULLET_RAY*2}, animatedStyle ]}
            > 
            <Svg style={{transform: `rotate(`+ (angleView + Math.PI/2) *180/Math.PI + `deg)`}} width="72" height="200" viewBox="0 0 72 200" fill="none">
                <Path d="M36 0L68 64C43.0065 45.3317 28.9936 44.9163 4 64L36 0Z" fill={colorUp} opacity="0.7" />
                <Path d="M35 199.945L5.64609 136C29.8678 154.652 43.8635 155.067 69.6461 136L35 199.945Z" fill={colorDown} opacity="0.7" />
                <Circle cx="36" cy="100" r="48" fill="#fcc603" stroke="#1a1a1d" strokeWidth="2" opacity="0.9" />
            </Svg>
            </Animated.View>
    )
}

export default Bullet;