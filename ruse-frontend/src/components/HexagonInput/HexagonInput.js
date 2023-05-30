import React from "react";
import { View } from "react-native";
import { GLOBAL_PARS } from '../../globals';
import Bullet from './Bullet';
import HexagonSvg from "./HexagonSvg";

  const HexagonInput = ({
    idx,
    actives
}: Props) => {

  //const dispatch = useDispatch();

  //const [active, setActive] = useState([false, false, false]);

  // const setRatios = useCallback(
  //   data => {
  //     dispatch(actions.setRatios(data));
  //   },
  //   [dispatch],
  // );

  // useEffect(() => {
  //   getUpdateBullets((err, data) => {
  //     setActive(data.data[idx]);
  //   })

  //   onUpdateNextInterval((err, data) => {
  //     console.log(data, idx)
  //     setRatios({chart: idx, ratio: data.ratios[idx]});
  //     setActive(data.active[idx]);
  //   });

  //   onEndEventTimeout((err, data) => {
  //     setActive([false, false, false])
  //   });
    
  // }, [active] );// eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        <View key="hexagon" style={{width: GLOBAL_PARS.WIDTH, height: GLOBAL_PARS.HEIGHT - GLOBAL_PARS.HEIGHT_SWIPE}}>
            <HexagonSvg chart={idx} />
            {
              actives.map((el, index) => (
                el ? <Bullet key={index} chart={idx} nPoint={index} /> : null
              ))
            }
        </View>
      </>
    )
  }

  export default HexagonInput;