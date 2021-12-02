import React from 'react';
import { connect } from 'umi';
import { ContactsOutlined } from '@ant-design/icons';

import { cardConfig } from 'antd-management-fast-framework/es/utils/constants';
import BaseAddDrawer from 'antd-management-fast-framework/es/framework/DataDrawer/BaseAddDrawer';

import { accessWayCollection } from '@/customConfig/accessWayCollection';

import { fieldData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseAddDrawer {
  componentAuthority = accessWayCollection.article.addBasicInfo.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/get',
        submitApiPath: 'article/addBasicInfo',
      },
    };
  }

  getGlobal = () => {
    const { global } = this.props;

    return global || null;
  };

  getApiData = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  renderTitle = () => {
    return '新增选项';
  };

  establishCardCollectionConfig = () => {
    const { processing } = this.state;

    return {
      list: [
        {
          title: {
            icon: <ContactsOutlined />,
            text: '基本信息',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
        {
          title: {
            icon: <ContactsOutlined />,
            text: '简介描述',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
          instruction: [
            {
              title: '局部操作说明1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
            {
              title: '局部操作说明2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: <ContactsOutlined />,
            text: '其他信息',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
      ],
    };
  };
}

export default Index;
