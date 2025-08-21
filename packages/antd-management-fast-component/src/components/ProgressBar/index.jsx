import React from 'react';
import { NProgress } from '@tanem/react-nprogress';

import { Bar } from './Bar';
import { Container } from './Container';
import { Spinner } from './Spinner';

const ProgressBar = ({
  progressing = true,
  animationDuration = 200,
  incrementDuration = 800,
  minimum = 0.08,
  showBar = true,
  showSpinner = true,
}) => {
  return (
    <NProgress
      isAnimating={progressing}
      animationDuration={animationDuration}
      incrementDuration={incrementDuration}
      minimum={minimum}
    >
      {({ animationDuration, isFinished, progress }) => (
        <Container
          animationDuration={animationDuration}
          isFinished={isFinished}
        >
          {showBar ? (
            <Bar animationDuration={animationDuration} progress={progress} />
          ) : null}
          <Spinner />

          {showSpinner ? <Spinner /> : null}
        </Container>
      )}
    </NProgress>
  );
};

export { ProgressBar };
