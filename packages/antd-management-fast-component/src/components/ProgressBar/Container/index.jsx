import React from 'react';

const Container = ({
  animationDuration = 800,
  isFinished = true,
  children,
}) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

export { Container };
