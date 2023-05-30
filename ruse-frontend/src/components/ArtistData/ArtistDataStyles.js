import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    generalControlsRoot: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    box: {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    timerRoot: {
      width: '50px',
    },
    time: {
      margin: '0',
      textAlign: 'center'
    },
    titleCode: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }
}));

export default useStyles;