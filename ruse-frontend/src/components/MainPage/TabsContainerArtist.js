import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import ArtistData from '../ArtistData/ArtistData';
import SettingsArtist from '../SettingsArtist/SettingsArtist';
import ArtistSwipeDrawer from '../SwipeDrawer/ArtistSwipeDrawer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{marginTop: '25px'}}
    >
      {value === index && (
          children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const TabsContainerArtist = () => {
  const classes = useStyles();
  const value = useSelector(st => st.settingsArtist.tab);

  // const dispatch = useDispatch();

  // const setArtistOpenSettings = useCallback(
  //   data => {
  //     dispatch(actions.setArtistOpenSettings(data));
  //   },
  //   [dispatch],
  // );

  return (
    <div className={classes.root}>
      {/* <Box display="flex" style={{position: 'absolute', top: '15px', right: '25px'}}>
          <Box flexGrow={1} />
          <IconButton onClick={() => setArtistOpenSettings(true)} aria-label="open settings">
            <TuneIcon color='primary' />
          </IconButton>
      </Box> */}
      <ArtistSwipeDrawer />
      <TabPanel value={value} index={0}>
        <ArtistData />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingsArtist />
      </TabPanel>
    </div>
  );
}

export default TabsContainerArtist;
