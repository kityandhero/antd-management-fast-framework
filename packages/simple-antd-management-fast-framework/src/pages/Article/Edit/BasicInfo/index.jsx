import React from 'react';
import { connect } from 'umi';
import { PictureOutlined, InfoCircleFilled, FormOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  corsTarget,
  getDerivedStateFromPropsForUrlParams,
  getPathValue,
  toDatetime,
  getValueByKey,
} from 'antd-management-fast-framework/lib/utils/tools';
import {
  formContentConfig,
  datetimeFormat,
} from 'antd-management-fast-framework/lib/utils/constants';

import { accessWayCollection } from '@/customConfig/config';
import { renderCustomArticleStatusSelect } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

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
        imageList: [],
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { articleId, image } = this.state;

    d.articleId = articleId;
    d.image = image;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    const { image, imageList } = metaData;

    this.setState({
      image,
      imageList,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  fillFormInitialValuesAfterLoad = ({
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

  formContentConfigData = () => {
    const { metaData, processing, dataLoading, image, imageList } = this.state;
    console.log({
      imageList,
    });
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
                buildType: formContentConfig.cardExtraBuildType.component,
                component: renderCustomArticleStatusSelect({
                  global: this.getGlobal(),
                }),
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
              lg: 6,
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.articleId,
              value: getValueByKey({
                data: metaData,
                key: fieldData.articleId.name,
              }),
              canCopy: true,
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
            text: '配图上传',
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
            icon: <PictureOutlined />,
            text: '单配图纯展示',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.imageShow,
              image,
              imageBoxContainorStyle: {
                width: '120px',
              },
            },
          ],
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '配图集合纯展示',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.imageListShow,
              imageList,
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
