import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { useStyles } from './body.style.js'

export function CarouselImages(props) {

  const { images } = props;
  const classes = useStyles()

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = images.length;

  const handleNext = () =>
    setActiveStep((prev) => (activeStep === images.length - 1 ? 0 : prev + 1));

  const handleBack = () =>
    setActiveStep((prev) => (activeStep === 0 ? images.length - 1 : prev - 1));

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      handleNext();
      clearInterval(interval);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [activeStep]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Box sx={{ maxWidth: '100%', flexGrow: 1, paddingTop: '15px' }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  className={classes.slider}
                  src={step.imgPath}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          variant="progress"
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Container>
  );
}
