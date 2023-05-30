import { Dimensions } from 'react-native';


let height = Dimensions.get('window').height - 75;
let heightToSwipe = height - (height/2 + 150);
let widthScreen = Dimensions.get('window').width;
let width = widthScreen >= 768 ? (widthScreen / 2) - 50 : widthScreen;
const cx = width/2;
const cy = height/2 - 75;
const r = 150;
const bullet_ray = 36;
const bullet_color = 'red';

// armonico -  inarmonico from consonance -  dissonance

const inputHexagons = {
    first: [
      {name:{top: 'consonance', low: 'dissonance' }, color:'red', ratio: 0.8, angle:Math.PI/6 },
      {name:{top: 'high-pitch', low: 'low-pitch'}, color:'blue', ratio: 0.8, angle:Math.PI * 1/3 + Math.PI/6 },
      {name:{top: 'bright timbre', low: 'dark timbre'}, color:'yellow', ratio: 0.8, angle:Math.PI * 2/3 + Math.PI/6 },
    ],
    second: [
      {name:{top: 'chaotic', low: 'regular'}, color:'blue', ratio: 0.8, angle:Math.PI/6 },
      {name:{top: 'fast', low: 'slow'}, color:'yellow', ratio: 0.8, angle:Math.PI * 1/3 + Math.PI/6 },
      {name:{top: 'polyphony', low: 'monophony' }, color:'red', ratio: 0.8, angle: Math.PI * 2/3 + Math.PI/6 },
    ],
}
const angles = [Math.PI * 2 + Math.PI/6, 
                Math.PI * 1/3 + Math.PI/6, 
                Math.PI * 2/3 + Math.PI/6, 
                Math.PI + Math.PI/6, 
                Math.PI * 4/3 + Math.PI/6, 
                Math.PI * 5/3 + Math.PI/6];

const GLOBAL_PARS = {
    HEIGHT: height,
    HEIGHT_SWIPE: heightToSwipe,
    WIDTH_S: widthScreen,
    WIDTH: width,
    CX: cx,
    CY: cy,
    RAY: r,
    ANGLES: angles,
    BULLET_RAY: bullet_ray,
    BULLET_COLOR: bullet_color,
};
export { GLOBAL_PARS };
export { inputHexagons };

