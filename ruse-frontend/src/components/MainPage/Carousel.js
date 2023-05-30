import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'RUSE',
    imgPath:
      'RUSE-event.jpg',
  },
  {
    label: 'ARS Eletronica 2021',
    imgPath:
      'ARS21.jpeg',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    color: 'white',
    margin: 'auto',
    "@media (min-width: 768px)": {
      maxWidth: 1000,

    }
  },
  img: {
    height: 300,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    "@media (min-width: 768px)": {
      height: 500,
    }
  },
  mobileStepper: {
    backgroundColor: '#1a1a1d',
  }
}));

const Carousel = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
      className={classes.mobileStepper}
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft style={{ color: '#e53358' }} /> : <KeyboardArrowRight style={{ color: '#e53358' }} />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight style={{ color: '#6e4049' }} /> : <KeyboardArrowLeft style={{ color: '#e53358' }} />}
          </Button>
        }
      />
    </div>
  );
}

export default Carousel;