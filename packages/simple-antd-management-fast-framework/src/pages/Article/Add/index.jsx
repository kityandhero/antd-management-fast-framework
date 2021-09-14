import { connect, history } from 'umi';
import { notification } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  corsTarget,
  showInfoMessage,
  isObject,
  isArray,
} from 'antd-management-fast-framework/lib/utils/tools';
import { formContentConfig } from 'antd-management-fast-framework/lib/utils/constants';
import BaseAddForm from 'antd-management-fast-framework/lib/framework/DataForm/BaseAddForm';
import { buildButton } from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Add extends BaseAddForm {
  componentAuthority = accessWayCollection.article.addBasicInfo.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        pageName: '发布文章',
        submitApiPath: 'article/addBasicInfo',
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

  getApiData = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  doAfterSubmitSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    const { articleId } = singleData;

    this.goToPath(`/news/article/edit/load/${articleId}/1/basicInfo`);
  };

  buildToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: this.renderGeneralButton({
            text: '按钮1',
            onClick: () => {
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
            onClick: () => {
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
            onClick: () => {
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
            onClick: () => {
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

  fillFormDefaultInitialValues = () => {
    const v = {};

    v[fieldData.sort.name] = 0;
    v[fieldData.subtitle.name] = '';

    return v;
  };

  formContentConfigData = () => {
    const { processing, image } = this.state;

    return {
      list: [
        {
          title: {
            text: '基本信息',
          },

          extra: {
            affix: true,
            list: [
              this.renderSaveButton({
                text: '保存并进行下一步',
              }),
            ],
          },
          spinning: processing,
          items: [
            {
              lg: 12,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.sort,
            },
            {
              lg: 6,
              type: formContentConfig.contentItemType.placeholder,
            },
            {
              lg: 24,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
            },
          ],
          instruction: {
            title: '操作说明',
            showDivider: true,
            showNumber: true,
            list: [
              {
                text: '这里是操作说明。',
              },
              {
                text: '这里是操作说明。',
              },
              {
                text: '这里是操作说明。',
              },
            ],
          },
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '配图',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: processing,
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
          instruction: [
            {
              title: '操作说明1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
              ],
            },
            {
              title: '操作说明2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },
          spinning: processing,
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
          spinning: processing,
          items: [
            {
              type: formContentConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default Add;
