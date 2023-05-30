import { Card, CardHeader, Divider, Typography } from "@material-ui/core";
import React from 'react';
import ExportData from "./ExportData";
import HexagonBounds from "./HexagonBounds";
import HexagonNextInterval from "./HexagonNextInterval";
import HexagonTimeout from "./HexagonTimeout";
import useStyles from './SettingArtistStyles';

const SettingsArtist = () => {
  const classes = useStyles();

  return (
      <div>
        <Typography variant='h4' gutterBottom>
          Settings
        </Typography>
        <Divider className={classes.divider} />
        <Card className={classes.root}>
          <CardHeader
            className={classes.cardHead}
            title="Timeout settings"
          />
          <HexagonTimeout />
        </Card>
        <Card className={classes.root}>
          <CardHeader
            className={classes.cardHead}
            title="Axes settings"
          />
          <HexagonBounds />
        </Card>
        <Card className={classes.root}>
          <CardHeader
            className={classes.cardHead}
            title="Export Data"
          />
          <ExportData />
        </Card>
        <Card className={classes.root}>
          <CardHeader
            className={classes.cardHead}
            title="Next Interval"
          />
          <HexagonNextInterval />
        </Card>
      </div>
  )
}

export default SettingsArtist;