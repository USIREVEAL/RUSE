import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import React from 'react';

const WebsiteIcon = ({
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
      <LinkIcon />
    </Button>
  );
}


export default WebsiteIcon;