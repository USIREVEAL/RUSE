import { Button } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';

const LinkedinIcon = ({
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
      <LinkedInIcon />
    </Button>
  );
}


export default LinkedinIcon;