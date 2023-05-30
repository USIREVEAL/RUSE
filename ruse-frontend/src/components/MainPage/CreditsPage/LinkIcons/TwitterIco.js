import { Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';

const TwitterIco = ({
  link
}: Props) => {

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      target="_blank"
      rel="noopener noreferrer"
      href={`${link}`}
      style={{ minWidth: 'inherit'}}
    >
      <TwitterIcon />
    </Button>
  );
}


export default TwitterIco;