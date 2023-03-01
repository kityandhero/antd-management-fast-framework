import { Space, Typography } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  sortBy,
} from 'easy-soft-utility';

import { pageHeaderRenderType } from 'antd-management-fast-common';

import { BaseComponent } from '../../BaseComponent';
import { DescriptionGrid } from '../../DescriptionGrid';

const { Paragraph } = Typography;

class HeaderContent extends BaseComponent {
  renderFurther() {
    const { list } = this.props;

    if (!isArray(list)) {
      return null;
    }

    let listData = list.map((o) => {
      const d = { sort: 10_000, ...o };

      return { ...d };
    });

    listData = sortBy(listData, (o) => o.sort);

    listData = listData.map((o, index) => {
      const d = { ...o };

      d.key = `pageHeaderContentItemContainer_${index}`;

      return { ...d };
    });

    return (
      <>
        {listData.map((o) => {
          const { type, list: listItem, key } = o;

          if (!isArray(listItem)) {
            return null;
          }

          if (type === pageHeaderRenderType.descriptionGrid) {
            const listGridData = listItem.map((one, index) => {
              return {
                key: `${key}_descriptionGridItem_${index}`,
                ...one,
              };
            });

            return (
              <DescriptionGrid
                key={`${key}_descriptionGrid`}
                list={listGridData}
                config={{
                  style: { marginBottom: '4px' },
                  size: 'small',
                }}
              />
            );
          }

          if (type === pageHeaderRenderType.paragraph) {
            const listParagraph = listItem.map((one, index) => {
              return { key: `${key}_paragraph_${index}`, ...one };
            });

            return (
              <div key={`${key}_paragraph_container`}>
                {listParagraph.map((item) => {
                  if (checkStringIsNullOrWhiteSpace(item.paragraph)) {
                    return null;
                  }

                  return <Paragraph key={item.key}>{item.paragraph}</Paragraph>;
                })}
              </div>
            );
          }

          if (type === pageHeaderRenderType.action) {
            const listAction = listItem.map((one, index) => {
              return { key: `${key}_action_${index}`, ...one };
            });

            return (
              <Space key={`${key}_space`}>
                {listAction.map((item) => {
                  return item.action;
                })}
              </Space>
            );
          }

          return null;
        })}
      </>
    );
  }
}

HeaderContent.defaultProps = {
  list: [],
};

export { HeaderContent };
