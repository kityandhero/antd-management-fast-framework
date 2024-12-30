import { Col, Row } from 'antd';
import React from 'react';

import { ColorText, VerticalBox } from 'antd-management-fast-component';

import { fontFamilyStyle } from '../../constant';
import { CellBase } from '../CellBase';

class CellEnum extends CellBase {
  buildContentBox = () => {
    const { content } = {
      enumList: [],
      valueList: [],
      ...this.getProperties(),
    };

    return (
      <Row style={{ height: '100%' }} wrap gutter={16}>
        {content.map((o, index) => {
          const { label, checked } = o;

          return (
            <Col key={`${name}_${index}`}>
              <VerticalBox>
                <ColorText
                  textPrefix={checked ? '☑' : '⬜'}
                  textPrefixStyle={{ paddingRight: '2px' }}
                  separator=""
                  text={label}
                  textStyle={{ ...fontFamilyStyle, fontSize: '14px' }}
                />
              </VerticalBox>
            </Col>
          );
        })}
      </Row>
    );
  };
}

export { CellEnum };
