import { Button, makeStyles, Typography } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addClient, joinEvent } from '../../socketAPI';
import * as actions from '../../store/actions';
import Carousel from './Carousel';

// const CssTextField = withStyles((theme) => ({
//   root: {
//     '& label.Mui-focused': {
//       color: theme.palette.secondary.main,
//     },
//     '& .MuiFormLabel-root': {
//       color: 'white'
//     },
//     '& .MuiInputBase-root': {
//       color: 'white'
//     }
//   },
// }))(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.main,
    color: 'white',
    width: '75%',
    margin: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  middleCont: {
    display: 'flex',
    padding: '50px',
    flexDirection: 'column',
    color: 'white',
    maxWidth: '850px',
    margin: 'auto',
  },
  topTitle: {
    textAlign: 'center',
    fontWeight: 'bolder',
  }
}));

const HomePage = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  //const [join, setJoin] = useState('');
  const classes = useStyles();
  const connected = useSelector(st => st.clientReducer.connected);

  const setError = useCallback(
    data => {
      dispatch(actions.setError(data));
    },
    [dispatch],
  );

  useEffect(() => {
    let html = window.document.getElementsByTagName('html')[0];
    html.style.overflow = 'initial'; 
  });

  // const handleChange = (e, type) => {
  //   setJoin(parseInt(e.target.value));
  // }

  // const startE = () => {
  //   startEvent();
  // }

  const joinE = () => {
    if (!connected) {
      let event = 999999;
      addClient({status: 'audience'}, event)
      joinEvent(event, 'audience'); 
    } else {
      history.push('/audience')
      //setError({status: true, msg: 'Sei già in un concerto'})
    }
  }

  return (
    <>
      {/* <div style={{textAlign:'center', margin: '20px 0'}}>
        <img src='Logo-RUSE.png' width='256px' alt='RUSE'></img>
      </div> */}
      {/* <Card className={classes.root} variant="outlined">
        <CardContent>
          {/* <Typography gutterBottom>
            RUSE è un' esperienza di musica partecipativa che trasforma un concerto di live electronics in un processo creativo democratico, dove il pubblico è investito di un ruolo attivo in quanto parte integrante dello sviluppo del concerto stesso. Durante la performance, il pubblico ha la possibilità di esprimere un riscontro in tempo reale su sei coppie di parametri percettivi e musicali utilizzando il proprio smartphone. I valori raccolti dal sistema, sono inviati all’artista e andranno a influenzare in tempo reale la sintesi dei suoni e il processo compositivo.
            RUSE si inserisce nell’ambito dell’arte partecipativa e della pratica musicale condivisa che hanno come obiettivo la realizzazione di media per la costruzione di interconnessioni. In RUSE il pubblico si relaziona con l’oggetto artistico, con l’artista e prende parte a un processo di composizione condivisa e partecipata esprimendo decisioni collettive su scelte compositive ed estetiche. L’artista abbandona così il canonico ruolo elitario per assumere quello di facilitatore del dialogo democratico tramite la gestione di una “piattaforma compositiva” – spaziando tra generi musicali antitetici dal noise/glitch all’ambient/drone. RUSE è stato sviluppato da una collaborazione tra il Software Institute (USI, Lugano) e il Dipartimento di Composizione del Conservatorio della Svizzera italiana.
          </Typography> 
        </CardContent>
      </Card> */}
      <div className={classes.middleCont}>
        <Grow in={true} timeout={1000}>  
          <div>
            <Typography variant="h6" className={classes.topTitle}>
              RUSE è un' esperienza
            </Typography>
            <Typography variant="h6" className={classes.topTitle} gutterBottom>
              di arte partecipativa
            </Typography>
          </div>
        </Grow>
        <Grow in={true} timeout={4000} >
          <Typography style={{textAlign: 'center'}} gutterBottom>
            Trasforma un concerto di musica elettronica in un processo creativo e democratico, in cui il pubblico è investito di un ruolo attivo.
              {/* Durante la performance potrai modificare la musica utilizzando un’applicazione web. Avrai accesso a due esagoni sui cui vertici troverai delle coppie di parametri musicali che – in momenti specifici – ti verrà chiesto di modificare a tuo piacimento. La media delle votazioni del pubblico andrà a influenzare in tempo reale la musica che ascolterai, rendendoti parte della creazione! */}
          </Typography>
        </Grow>
        <div id='homeBox'>
          <div className='homeInternBox'>
            <Button variant="contained" color="primary" onClick={joinE}>
              Partecipa al concerto
            </Button>
          </div>
        </div>
        <Carousel />
      </div>
      {/* <div id='homeBox'>
        <div className='homeInternBox'>
          <Typography variant="body1" gutterBottom>
            Here join a live event with its event code.
          </Typography>
          <CssTextField 
            label="Event Code" 
            value={join} 
            style={{ userSelect: 'none', WebkitUserSelect: 'auto'}}
            type="number"
            onChange={(e) => handleChange(e)}
            inputProps={{
              maxLength: 6
            }}
          />
          <Button variant="contained" color="primary" onClick={joinE}>
            Join a Live Event
          </Button>
        </div>
        <div className='homeInternBox'>
          <Typography variant="body1" gutterBottom>
            Here start a live event and share the event code.
          </Typography>
          <Button variant="contained" color="primary" onClick={startE}>
            Start a Live Event
          </Button>
        </div>
      </div> */}
    </>
  );
}


export default HomePage;