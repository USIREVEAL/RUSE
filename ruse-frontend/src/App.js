import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  Route, Switch, useHistory, useLocation, withRouter
} from "react-router-dom";
import './App.css';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ArtistClient from './components/MainPage/ArtistClient/ArtistClient';
import AudienceClient from './components/MainPage/AudienceClient/AudienceClient';
import CreditsPage from './components/MainPage/CreditsPage/CreditsPage';
import Footer from './components/MainPage/Footer';
import HomePage from './components/MainPage/HomePage';
import { GLOBAL_PARS } from './globals';
import { getAudienceCheck, onDisconnect } from './socketAPI';
import * as actions from './store/actions';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  //const [isShown, setIsShown] = useState(true);
  const {WIDTH_S} = GLOBAL_PARS;
  //const [disconnect, setDisconnect] = useState(false);
  const [redirect, setRedirect] = useState(false);
  //const eCode = useSelector(st => st.clientReducer.eCode);
  const clientType = useSelector(st => st.clientReducer.clientType);

  let history = useHistory();

  const setECode = useCallback(
    data => {
      dispatch(actions.setECode(data));
    },
    [dispatch],
  );

  const setError = useCallback(
    data => {
      dispatch(actions.setError(data));
    },
    [dispatch],
  );

  const setClient = useCallback(
    data => {
      dispatch(actions.setClient(data));
    },
    [dispatch],
  );

  const setConnected = useCallback(
    data => {
      dispatch(actions.setConnected(data));
    },
    [dispatch],
  );

  // const resumeLoad = () => {
  //   //save to localStorage
  //   let ls_eCode = localStorage.getItem('eCode');
  //   let ls_client = localStorage.getItem('clientType');
    
  //   if ( window.location.pathname === '/ars') {
  //     ls_eCode = 999999;
  //     ls_client = 'artist';
  //   }

  //   addClient({status: ls_client}, eCode >= 0 ? eCode : ls_eCode);
    
  //   if (ls_eCode >= 0 && ls_client) {
  //     setECode(ls_eCode);
  //     setClient(ls_client);
  //     if (ls_client === 'artist') {
  //       setRedirect('/ars');
  //     } else {
  //       setRedirect('/audience');
  //     }
  //   } else {
  //     getAudienceCheck((err, data) => {
  //       if (data.status === 'success') {
  //         setECode(data.eCode);
  //         // set Item in local storage
  //         localStorage.setItem('clientType', 'audience');
  //         localStorage.setItem('eCode', data.eCode);
  //         setRedirect('/audience');
  //       } else {
  //         setError({status: true, msg: data.msg})
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getEventCode((err, data) => {
  //     setECode(data);
  //     // set Item in local storage
  //     localStorage.setItem('clientType', 'artist');
  //     localStorage.setItem('eCode', data);
  //     setClient('artist');
  //     history.push(`/ars`);
  //   });
  // }, [setECode])
  
  useEffect(() => {
    //save to localStorage
    let ls_eCode = localStorage.getItem('eCode');
    let ls_client = localStorage.getItem('clientType');

    //addClient({status: ls_client}, eCode >= 0 ? eCode : ls_eCode);
    
    if (ls_eCode >= 0 && ls_client) {
      setECode(ls_eCode);
      setClient(ls_client);
      // if (ls_client === 'artist') {
      //   setRedirect('/ars');
      // } else {
      //   setRedirect('/audience');
      // }
    } else {
      getAudienceCheck((err, data) => {
        if (data.status === 'success') {
          setECode(data.eCode);
          // set Item in local storage
          localStorage.setItem('clientType', 'audience');
          localStorage.setItem('eCode', data.eCode);
          setRedirect('/audience');
        } else {
          setError({status: true, msg: data.msg})
        }
      });
    }
    
    onDisconnect((err, data) => {
      // setDisconnect(true);
      history.push('/');
      setConnected(false)
    });

    // setTimeout(() => {
    //   setIsShown(false);
    // }, 2000);
    
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleRedirect = (path) => {
    history.push(`${path}`);
  };

  const setOpenSettings = useCallback(
    data => {
      dispatch(actions.setOpenSettings(data));
    },
    [dispatch],
  );

  const setArtistOpenSettings = useCallback(
    data => {
      dispatch(actions.setArtistOpenSettings(data));
    },
    [dispatch],
  );

  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar style={{ justifyContent: 'flex-end'}}>
          <Button variant={location === '/' ? 'contained' : 'text'} color="primary" onClick={() => handleRedirect('/')}>Home</Button>
          {
            clientType === 'artist' ?
            <Button variant={location === '/ars' ? 'contained' : 'text'} color="primary" onClick={() => handleRedirect('/ars')}>Artist</Button> : null
          }
          {
            clientType === 'audience' ?
              <Button variant={location === '/audience' ? 'contained' : 'text'} color="primary" onClick={() => handleRedirect('/audience')}>Audience</Button>
              : null
          }
          <Button variant={location === '/credits' ? 'contained' : 'text'} color="primary" onClick={() => handleRedirect('/credits')}>Credits</Button>
          {
            clientType === 'audience' && WIDTH_S < 768 ?
            <IconButton onClick={() => setOpenSettings(true)} aria-label="open settings">
              <TuneIcon color='primary' />
            </IconButton> : null
          }
          {
            clientType === 'artist' ?
            <IconButton onClick={() => setArtistOpenSettings(true)} aria-label="open settings">
              <TuneIcon color='primary' />
            </IconButton> : null
          }
        </Toolbar>
      </AppBar>
      {/* {
        disconnect ? 
          <Redirect to='/' /> : null
      } */}
      {
        redirect ? 
          <Redirect to={redirect} /> :
          null
      }
      <>
        <Switch>
          <Route path="/credits">
            <CreditsPage />
            {
              WIDTH_S < 768 ?
              <Footer /> : null
            }
          </Route>
          <Route path="/ars">
            <ArtistClient />
          </Route>
          {/* <Route path="/artist">
              {/* { isShown ?
              <div className='mainFrame css-selector'>
                <Svg width="200" height="120">
                  <Symbol id="s-text">
                    <Text textAnchor="middle" x="100" y="60" fontSize="60">RUSE</Text>
                  </Symbol>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                </Svg>
                <CircularProgress color='secondary' />
              </div> : <ArtistClient />} 
              <ArtistClient />
          </Route> */}
          <Route path="/audience">
            {/* { isShown ?
              <div className='mainFrame css-selector'>
                <Svg width="200" height="120">
                  <Symbol id="s-text">
                    <Text textAnchor="middle" x="100" y="60" fontSize="60">RUSE</Text>
                  </Symbol>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                  <Use className="text" href="#s-text"></Use>
                </Svg>
                <CircularProgress color='secondary' />
              </div> : <AudienceClient />} */}
              <AudienceClient />
          </Route>
          <Route path="/" exact>
            <HomePage />
            {
              WIDTH_S < 768 ?
              <Footer /> : null
            }
          </Route>
        </Switch> 
        {
          WIDTH_S > 768 ?
          <Footer /> : null
        }
      </>
      <ErrorMessage />
    </>
  );
}

export default withRouter(App);
