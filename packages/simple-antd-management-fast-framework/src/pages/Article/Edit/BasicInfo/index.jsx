import React from 'react';
import { connect } from 'umi';
import { PictureOutlined, InfoCircleFilled, FormOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  corsTarget,
  getDerivedStateFromPropsForUrlParams,
  toDatetime,
  getValueByKey,
  showInfoMessage,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  cardConfig,
  datetimeFormat,
  convertCollection,
  formatCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import ColorText from 'antd-management-fast-framework/es/customComponents/ColorText';
import {
  buildColorText,
  buildCustomGrid,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

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

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: this.renderGeneralButton({
            text: '按钮1',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮4',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            confirm: {
              placement: 'topRight',
              title: '将要进行操作，确定吗？',
              okText: '确定',
              cancelText: '取消',
            },
          }),
        },
      ],
    };
  };

  fillInitialValuesAfterLoad = ({
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
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.subtitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.subtitle.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, processing, dataLoading, image, imageList } = this.state;

    return {
      list: [
        {
          title: {
            text: '基本信息',
            subText: buildColorText({
              textPrefix: '文本前缀',
              text: '附属文本',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>【{c}】</>;
              },
            }),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: <InfoCircleFilled />,
                text: '一些说明',
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomArticleStatusSelect({
                  global: this.getGlobal(),
                }),
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: <FormOutlined />,
                text: '一般按钮',
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: true,
                icon: <FormOutlined />,
                text: '隐藏按钮',
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.articleId,
              value: getValueByKey({
                data: metaData,
                key: fieldData.articleId.name,
              }),
              canCopy: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '分隔线',
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
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
            icon: <PictureOutlined />,
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: cardConfig.contentItemType.imageUpload,
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
              type: cardConfig.contentItemType.imageShow,
              image,
              imageBoxContainorStyle: {
                width: '120px',
              },
            },
          ],
        },
        {
          title: {
            text: '表格展示',
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    label: fieldData.articleId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.articleId.name,
                    }),
                    canCopy: true,
                  },
                  {
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    label: fieldData.sort.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.sort.name,
                      convert: convertCollection.string,
                    }),
                  },
                  {
                    label: fieldData.subtitle.label,
                    value: '',
                    emptyValue: '空白值演示',
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 3,
                  emptyStyle: {
                    color: '#cccccc',
                  },
                  emptyValue: '待完善',
                  labelStyle: {
                    width: '140px',
                  },
                },
              }),
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
              type: cardConfig.contentItemType.imageListShow,
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
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: true,
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
            text: '其他信息',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.save,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.button,
              config: {
                text: '一般按钮',
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.actionList,
              config: [
                {
                  buildType: cardConfig.extraBuildType.refresh,
                },
                {
                  buildType: cardConfig.extraBuildType.save,
                },
                {
                  buildType: cardConfig.extraBuildType.generalButton,
                  text: '一般按钮',
                },
              ],
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

export default BasicInfo;
