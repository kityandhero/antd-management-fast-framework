import { Checkbox, Col, Row } from 'antd';
import React from 'react';

import { checkInCollection, toString } from 'easy-soft-utility';

import { VerticalBox } from 'antd-management-fast-component';

import { colorStyle, fontFamilyStyle } from '../../constant';
import { CellBase } from '../CellBase';

class CellEnum extends CellBase {
  buildContentBox = () => {
    const { enumList, valueList, content } = {
      enumList: [],
      valueList: [],
      ...this.getProperties(),
    };

    return (
      <Row style={{ height: '100%' }} wrap>
        {enumList.map((o, index) => {
          const { label, value } = o;

          return (
            <Col key={`${name}_${index}`}>
              <VerticalBox>
                <Checkbox
                  value={value}
                  checked={
                    value == content ||
                    checkInCollection(valueList, toString(content))
                  }
                  style={{
                    fontSize: '16px',
                    ...fontFamilyStyle,
                    ...colorStyle,
                  }}
                >
                  {label}
                </Checkbox>
              </VerticalBox>
            </Col>
          );
        })}
      </Row>
    );
  };
}

export { CellEnum };
