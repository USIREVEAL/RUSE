import { Divider, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import useStyles from './CreditsPageStyles';
import SingleCredit from './SingleCredit';

const CreditsPage = () => {
  const classes = useStyles();

  useEffect(() => {
    let html = window.document.getElementsByTagName('html')[0];
    html.style.overflow = 'initial'; 
  });

  const creditsPeople = [{firstname: 'Andrea', lastname: 'Brites Marto', img: 'brit.png', 
                          links: [{type: 'email', email: 'britea@usi.ch'}, 
                                  {type: 'linkedin', linkedin: 'https://www.linkedin.com/in/andrea-brites-marto-8a804a158/'}],
                          company: 'Software Institute',
                          place: 'USI, Lugano'}, 
                         {firstname:'Danilo', lastname: 'Gervasoni', img: 'danilo.jpeg', 
                         links: [{type: 'email', email: 'danilo.gervaosoni@conservatorio.ch'}],
                         company: 'Conservatorio della Svizzera italiana',
                         place: 'Conservatorio della Svizzera italiana'}, 
                         {firstname: 'Dr. Roberto', lastname: 'Minelli', img: 'rob.png', 
                         links: [{type: 'email', email: 'roberto.minelli@usi.ch'}, 
                                 {type: 'linkedin', linkedin: 'https://www.linkedin.com/in/minellir/'}, 
                                 {type: 'twitter', twitter: 'https://twitter.com/robertominelli'}, 
                                 {type: 'website', website: 'https://robertominelli.com/'}],
                          company: 'Software Institute',
                          place: 'USI, Lugano'},
                         {firstname: 'Alberto', lastname: 'Barberis', img: 'alberto.png', 
                         links: [{type: 'email', email: 'albertobarberis11@gmail.com'}, 
                                 {type: 'website', website: 'http://www.albertobarberis.it/'}],
                          company: 'Conservatorio della Svizzera italiana',
                          place: 'Conservatorio della Svizzera italiana'},
                         {firstname: 'Prof. Dr. Michele', lastname: 'Lanza', img: 'michele.png', 
                          links: [{type: 'email', email: 'michele.lanza@usi.ch'}, 
                                {type: 'linkedin', linkedin: 'https://www.linkedin.com/in/michelelanza/'}, 
                                {type: 'twitter', twitter: 'https://twitter.com/lanzamichele'}, 
                                {type: 'website', website: 'https://www.inf.usi.ch/faculty/lanza/'}],
                          company: 'Software Institute',
                          place: 'USI, Lugano'},   
                        {firstname: 'Prof. Nadir', lastname: 'Vassena', img: 'nadir.png', 
                         links: [{type: 'email', email: 'nadir.vassena@conservatorio.ch'}, 
                                {type: 'website', website: 'http://nadirvassena.ch/'}],
                        company: 'Conservatorio della Svizzera italiana',
                        place: 'Conservatorio della Svizzera italiana'}
                        ];

  return (
    <>
    <div>
      <Typography variant='h4' gutterBottom style={{margin: '10px'}}>
        Credits
      </Typography>
      <Divider className={classes.divider} />
    </div>
    <Grid container spacing={2} style={{padding: '24px', width:'90%', margin: 'auto'}}>
    {creditsPeople.map( (user, idx) =>
        <Grid key={idx} item
        xs={12} sm={6} md={4} lg={4} xl={3}
        style={{display: 'flex', justifyContent: 'center'}}
        >
        <SingleCredit
          user={user}
        />
        </Grid> 
      )
    }
    </Grid>
  </>
  );
}


export default CreditsPage;