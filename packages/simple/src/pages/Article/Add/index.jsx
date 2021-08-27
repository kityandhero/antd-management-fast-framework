import { connect, history } from 'umi';
import { notification } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  corsTarget,
} from 'antd-management-fast-framework/lib/utils/tools';
import { formContentConfig } from 'antd-management-fast-framework/lib/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import BaseAddForm from 'antd-management-fast-framework/lib/framework/DataForm/BaseAddForm';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Add extends BaseAddForm {
  componentAuthority = accessWayCollection.article.addBasicInfo;

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

  buildInitialValues = () => {
    const values = {};

    return values;
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
            list: [this.renderSaveButton('保存并进行下一步')],
          },
          spinning: processing,
          items: [
            {
              lg: 18,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
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
      instruction: {
        title: '操作说明',
        showNumber: true,
        list: [
          {
            text: '这里是操作说明。',
          },
        ],
      },
    };
  };
}

export default Add;
