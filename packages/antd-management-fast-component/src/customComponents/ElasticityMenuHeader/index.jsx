import React from 'react';

import { BaseComponent } from '../BaseComponent';
import { FlexBox } from '../FlexBox';
import { VerticalBox } from '../VerticalBox';

class ElasticityMenuHeader extends BaseComponent {
  renderFurther() {
    const { logoDom, collapsed, navTheme, shortName } = this.props;

    return (
      <div
        style={{
          overflow: 'hidden',
        }}
      >
        <FlexBox
          flexAuto="right"
          left={logoDom}
          right={
            collapsed ? null : (
              <VerticalBox
                align="center"
                alignJustify="start"
                style={{
                  height: '100%',
                }}
              >
                <div
                  style={{
                    margin: ' 0 0 0 12px',
                    fontSize: '20px',
                    color: 'white',
                    fontWeight: '600',
                    lineHeight: '32px',
                    overflow: 'hidden',
                    height: '100%',
                    whiteSpace: 'nowrap',
                    ...(navTheme === 'light' ? { color: '#000000d9' } : {}),
                  }}
                >
                  {shortName || '应用简称'}
                </div>
              </VerticalBox>
            )
          }
        />
      </div>
    );
  }
}

ElasticityMenuHeader.defaultProps = {
  logoDom: null,
  collapsed: null,
  navTheme: '',
  shortName: '',
};

export { ElasticityMenuHeader };
