import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './CreditsPageStyles';
import EmailIcon from './LinkIcons/EmailIcon';
import LinkedinIcon from './LinkIcons/LinkedinIcon';
import TwitterIco from './LinkIcons/TwitterIco';
import WebsiteIcon from './LinkIcons/WebsiteIcon';

const SingleCredit = ({
  user
}: Props) => {
  const classes = useStyles();

  const linkButton = (link, idx) => {
    switch(link.type) {
      case 'email':
        return <EmailIcon key={idx} link={link.email} />
      case 'linkedin':
        return <LinkedinIcon key={idx} link={link.linkedin} />
      case 'twitter':
        return <TwitterIco key={idx} link={link.twitter} />
      case 'website':
        return <WebsiteIcon key={idx} link={link.website} />
      default:
        return
    }
  }

  return (
        <Card className={classes.rootSingleCredit}>
          <CardActionArea style={{margin: 'auto'}}>
              <CardMedia
                className={classes.media}
                image={user.img}
                title={user.firstname + ' ' + user.lastname}
              />
              <CardContent>
                <Typography className={classes.name}>
                    {user.firstname}
                </Typography>
                <Typography gutterBottom className={classes.name}>
                    {user.lastname}
                </Typography>
                <Typography gutterBottom className={classes.tinyName}>
                    {user.company}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {
                user.links.map((link, idx) => (
                  linkButton(link, idx)
                ))
              } 
            </CardActions>
          </Card>
  );
}


export default SingleCredit;