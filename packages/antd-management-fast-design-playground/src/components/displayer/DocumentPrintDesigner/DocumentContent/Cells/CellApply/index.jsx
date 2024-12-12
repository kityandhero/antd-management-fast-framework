import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  transparentImage,
} from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import {
  colorStyle,
  fontFamilyStyle,
  frontSizeStyle,
  tdPaddingStyle,
} from '../../constant';
import { CellBase } from '../CellBase';

class CellApply extends CellBase {
  getTdPaddingStyle = () => {
    return {
      ...tdPaddingStyle,
      paddingTop: '0px',
      paddingBottom: '0px',
    };
  };

  buildContentBox = () => {
    const { content, signetStyle } = {
      signetStyle: null,
      ...this.getProperties(),
    };

    const { note, signet, time } = {
      note: '',
      signet: '',
      time: '',
      ...content,
    };

    return (
      <VerticalBox fillWidth>
        <div style={{ width: '100%' }}>
          {checkStringIsNullOrWhiteSpace(note) ? (
            <div
              style={{ padding: '3px 0 5px 0' }}
              dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
            ></div>
          ) : (
            <div
              style={{
                padding: '3px 0 5px 0',
                ...frontSizeStyle,
                ...colorStyle,
                ...fontFamilyStyle,
              }}
            >
              {note}
            </div>
          )}

          <div style={{ padding: '0px 0 5px 0' }}>
            <FlexBox
              flexAuto="left"
              left={<div></div>}
              right={
                <div>
                  <FlexBox
                    flexAuto="left"
                    left={
                      <div style={{ height: '40px', position: 'relative' }}>
                        <img
                          src={signet || transparentImage}
                          style={{
                            height: '40px',
                            top: '0',
                            ...signetStyle,
                            right: '0',
                            position: 'absolute',
                          }}
                        />
                      </div>
                    }
                    rightStyle={{
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                    right={
                      <div
                        style={{
                          fontSize: '18px',
                          fontWeight: 'normal',
                          lineHeight: '40px',
                          ...fontFamilyStyle,
                        }}
                      >
                        {time}
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        </div>
      </VerticalBox>
    );
  };
}

export { CellApply };
