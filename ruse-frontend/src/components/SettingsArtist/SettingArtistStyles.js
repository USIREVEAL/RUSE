import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.main,
    },
    divider: {
      backgroundColor: theme.palette.primary.main,
      marginBottom: '25px'
    },
    cardHead: {
      color: theme.palette.primary.main,
    },
    textFieldCont: {
      flex: '50%',
    },
    box: {
      display: 'flex',
      flexFlow: 'column wrap',
    },
}));

export default useStyles;