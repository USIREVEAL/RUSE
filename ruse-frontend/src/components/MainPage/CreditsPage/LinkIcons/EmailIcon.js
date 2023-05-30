import { Button } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import React from 'react';

const EmailIcon = ({
  link
}: Props) => {

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      target="_blank"
      rel="noopener noreferrer"
      href={`mailto:${link}`}
      style={{ minWidth: 'inherit'}}
    >
      <MailOutlineIcon />
    </Button>
  );
}


export default EmailIcon;