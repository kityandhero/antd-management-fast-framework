import React from 'react';

const Container = ({ animationDuration, children, isFinished }) => (
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

Container.defaultProps = {
  animationDuration: 800,
  isFinished: true,
};

export { Container };
