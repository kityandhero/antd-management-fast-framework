import React from 'react';

function computeHeight(node) {
  const { style } = node;
  style.height = '100%';
  const totalHeight = Number.parseInt(`${getComputedStyle(node).height}`, 10);
  const padding =
    Number.parseInt(`${getComputedStyle(node).paddingTop}`, 10) +
    Number.parseInt(`${getComputedStyle(node).paddingBottom}`, 10);
  return totalHeight - padding;
}

function getAutoHeight(n) {
  if (!n) {
    return 0;
  }

  const node = n;
  let height = computeHeight(node);
  const { parentNode } = node;

  if (parentNode) {
    height = computeHeight(parentNode);
  }

  return height;
}

class AutoHeightComponent extends React.Component {
  state = {
    computedHeight: 0,
  };

  root = undefined;

  componentDidMount() {
    const { height } = this.props;

    if (!height) {
      let h = getAutoHeight(this.root);
      this.setState({
        computedHeight: h,
      });

      if (h < 1) {
        h = getAutoHeight(this.root);
        this.setState({
          computedHeight: h,
        });
      }
    }
  }

  handleRoot = (node) => {
    this.root = node;
  };

  render() {
    const { height, children } = this.props;
    const { computedHeight } = this.state;
    const h = height || computedHeight;

    return (
      <div ref={this.handleRoot} style={{ height: `${h}px` }}>
        {h > 0 ? children : null}
      </div>
    );
  }
}

export { AutoHeightComponent };
