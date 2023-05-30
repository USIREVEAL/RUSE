import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '75%',
      margin: 'auto',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    rowGrid: {
      flexDirection: 'row',
      display: 'flex'
    },
    rootSingleCredit: {
      width: '220px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.background.main,
      color: theme.palette.background.secondary
    },
    divider: {
      backgroundColor: theme.palette.primary.main,
    },
    media: {
      width: '75%',
      paddingTop: '75%',
      borderRadius: '50%',
      margin: '5px'
    },
    name: {
      fontSize: '1rem',
      color: 'white'
    },
    tinyName: {
      fontSize: '0.8rem',
    }

}));

export default useStyles;