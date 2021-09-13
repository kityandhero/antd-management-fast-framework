import React from 'react';
import { connect } from 'umi';
import { PictureOutlined, InfoCircleFilled, FormOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  corsTarget,
  getDerivedStateFromPropsForUrlParams,
  getPathValue,
  toDatetime,
} from 'antd-management-fast-framework/lib/utils/tools';
import {
  formContentConfig,
  datetimeFormat,
} from 'antd-management-fast-framework/lib/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/get',
        submitApiPath: 'article/updateBasicInfo',
        articleId: null,
        image: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  buildInitialValues = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.title.name] = getPathValue(metaData, fieldData.title.name);
      values[fieldData.subtitle.name] = getPathValue(metaData, fieldData.subtitle.name);
      values[fieldData.description.name] = getPathValue(metaData, fieldData.description.name);

      values[fieldData.createTime.name] = formatDatetime(
        getPathValue(metaData, fieldData.createTime.name),
        datetimeFormat.monthDayHourMinuteSecond,
        '',
      );
      values[fieldData.updateTime.name] = formatDatetime(
        getPathValue(metaData, fieldData.updateTime.name),
        datetimeFormat.monthDayHourMinuteSecond,
        '',
      );
    }

    return values;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { articleId, image } = this.state;

    d.articleId = articleId;
    d.image = image;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    const { image } = metaData;

    this.setState({
      image,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  formContentConfigData = () => {
    const { metaData, processing, dataLoading, image } = this.state;

    return {
      list: [
        {
          title: {
            text: '基本信息',
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: formContentConfig.cardExtraBuildType.iconInfo,
                icon: <InfoCircleFilled />,
                text: '一些说明',
              },
              {
                buildType: formContentConfig.cardExtraBuildType.generalButton,
                icon: <FormOutlined />,
                text: '一般按钮',
              },
              {
                buildType: formContentConfig.cardExtraBuildType.generalButton,
                hidden: true,
                icon: <FormOutlined />,
                text: '隐藏按钮',
              },
              {
                buildType: formContentConfig.cardExtraBuildType.refresh,
              },
              {
                buildType: formContentConfig.cardExtraBuildType.save,
              },
            ],
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 18,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 24,
              type: formContentConfig.contentItemType.divider,
              text: '分隔线',
            },
            {
              lg: 24,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
            },
          ],
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '配图',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.imageUpload,
              image,
              action: `${corsTarget()}/article/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: true,
            },
          ],
        },
        {
          title: {
            text: '其他信息',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value:
                metaData == null
                  ? null
                  : formatDatetime(
                      toDatetime(metaData.createTime),
                      datetimeFormat.monthDayHourMinuteSecond,
                    ),
            },
            {
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.updateTime,
              value:
                metaData == null
                  ? null
                  : formatDatetime(
                      toDatetime(metaData.updateTime),
                      datetimeFormat.monthDayHourMinuteSecond,
                    ),
            },
          ],
        },
      ],
    };
  };
}

export default BasicInfo;
