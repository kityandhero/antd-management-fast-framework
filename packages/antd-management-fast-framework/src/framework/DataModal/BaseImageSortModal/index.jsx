import { Dropdown, List } from 'antd';
import React from 'react';

import {
  showSimpleErrorMessage,
  sortCollectionByKey,
  sortOperate,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { AnchorLink, iconBuilder } from 'antd-management-fast-component';

import { BaseUpdateModal } from '../BaseUpdateModal';

import styles from './index.less';

const primaryCallName = 'DataModal::BaseImageSortModal';

/**
 * base image sort modal
 * @namespace framework.DataModal
 * @class BaseImageSortModal
 * @augments BaseUpdateModal
 */
class BaseImageSortModal extends BaseUpdateModal {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '变更图片顺序',
      width: 700,
      imageListData: [],
      sorts: '',
      bodyStyle: {
        height: '300px',
        overflow: 'auto',
      },
    };
  }

  /**
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  adjustSubmitRequestParams = () => {
    throw new Error(
      this.buildOverloadErrorText(
        'adjustSubmitRequestParams',
        'like adjustSubmitRequestParams = () => { return {}; }',
      ),
    );
  };

  checkSubmitRequestParams = (o) => {
    this.logCallTrack({}, primaryCallName, 'checkSubmitRequestParams');

    if ((o.sorts || '') === '') {
      showSimpleErrorMessage('请提交图片排序序列!');

      return false;
    }

    return true;
  };

  // eslint-disable-next-line no-unused-vars
  buildSortSubmitValue = (items) => {
    throw new Error(
      this.buildOverloadErrorText(
        'buildSortSubmitValue',
        'like buildSortSubmitValue = (items) => {}',
      ),
    );
  };

  // eslint-disable-next-line no-unused-vars
  saveChanged = ({ items, target, handleData }) => {
    throw new Error(
      this.buildOverloadErrorText(
        'saveChanged',
        'like saveChanged = ({ items, target, handleData }) => {}',
      ),
    );
  };

  changeSort = (key, record) => {
    this.logCallTrack({}, primaryCallName, 'changeSort');

    const { metaListData } = this.state;

    const list = sortCollectionByKey({
      operate: key,
      item: record,
      list: metaListData,
      key: 'sort',
      sortInitialValue: 1,
    });

    const that = this;

    that.setState({ metaListData: [...list] });
  };

  buildNotificationDescription = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'buildNotificationDescription');

    return ` 图片顺序已经更改成功。`;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  buildChangeSortArea = () => {
    const { metaListData } = this.state;

    const ListContent = ({ data: { sort } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>序列</span>
          <p>
            排序值:
            {sort}
          </p>
        </div>
      </div>
    );

    const MoreButton = (properties) => {
      const { current, listData, onMenuClick } = properties;

      const items = [
        {
          key: sortOperate.moveUp,
          label: '上移',
          icon: iconBuilder.arrowUp(),
          disabled: current.sort === 1,
        },
        {
          key: sortOperate.moveDown,
          label: '下移',
          icon: iconBuilder.arrowDown(),
          disabled: current.sort === (listData || []).length,
        },
      ];

      return (
        <Dropdown
          menu={{
            items: items,
            onClick: (event) => onMenuClick(event, current),
          }}
        >
          <AnchorLink>{iconBuilder.retweet()} 排序</AnchorLink>
        </Dropdown>
      );
    };

    return (
      <>
        <div className={styles.containorBox}>
          <List
            size="large"
            rowKey="id"
            pagination={false}
            dataSource={metaListData}
            renderItem={(one, index) => (
              <List.Item
                actions={[
                  <MoreButton
                    key={`${index}_`}
                    current={one}
                    listData={metaListData}
                    onMenuClick={(event, current) => {
                      const { key } = event;

                      this.changeSort(key, current);
                    }}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={one.url}
                      className={styles.imageItem}
                      alt={one.url}
                    />
                  }
                  title={<AnchorLink href={one.href}>图片路径:</AnchorLink>}
                  // description={one.url}
                  description={one.id}
                />

                <ListContent data={one} />
              </List.Item>
            )}
          />
        </div>
      </>
    );
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: this.buildChangeSortArea(),
            },
          ],
        },
      ],
    };
  };
}

export { BaseImageSortModal };
