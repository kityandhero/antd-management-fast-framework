import { PureComponent } from 'react';

import styles from './index.less';

class VerticalBox extends PureComponent {
  render() {
    const { style, align, alignJustify, children } = this.props;

    let alignStyle = 'center';

    switch (align) {
      case 'top':
        alignStyle = 'flex-start';
        break;

      case 'center':
        alignStyle = 'center';
        break;

      case 'bottom':
        alignStyle = 'flex-end';
        break;

      default:
        alignStyle = 'center';
        break;
    }

    let alignJustifyStyle = 'flex-start';

    switch (alignJustify) {
      case 'start':
        alignJustifyStyle = 'flex-start';
        break;

      case 'center':
        alignJustifyStyle = 'center';
        break;

      case 'end':
        alignJustifyStyle = 'flex-end';
        break;

      case 'between':
        alignJustifyStyle = 'space-between';
        break;

      case 'around':
        alignJustifyStyle = 'space-around';
        break;

      default:
        alignJustifyStyle = 'flex-start';
        break;
    }

    const flexStyle = {
      ...(style || {}),
      ...{ alignItems: alignStyle, justifyContent: alignJustifyStyle },
    };

    return (
      <>
        <div className={styles.centerBox} style={style}>
          <div className={styles.flexBox} style={flexStyle}>
            {children}
          </div>
        </div>
      </>
    );
  }
}

VerticalBox.defaultProps = {
  fitWidth: true,
  style: {},
  align: 'center',
  alignJustify: 'flex-start',
};

export default VerticalBox;
