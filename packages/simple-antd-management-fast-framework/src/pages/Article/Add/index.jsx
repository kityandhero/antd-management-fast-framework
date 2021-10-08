import { connect, history } from 'umi';
import { Space } from 'antd';
import { PictureOutlined, FormOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  corsTarget,
  showInfoMessage,
  isObject,
  isArray,
} from '@fast-framework/utils/tools';
import { formContentConfig } from '@fast-framework/utils/constants';
import BaseAddForm from '@fast-framework/framework/DataForm/BaseAddForm';
import FadeBox from '@fast-framework/customComponents/AnimalBox/FadeBox';
import QueueBox from '@fast-framework/customComponents/AnimalBox/QueueBox';
import IconInfo from '@fast-framework/customComponents/IconInfo';
import { buildButton } from '@fast-framework/customComponents/FunctionComponent';

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
        fadeBoxShow: true,
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

  toggleFadeBoxShow = () => {
    const { fadeBoxShow } = this.state;

    this.setState({
      fadeBoxShow: !fadeBoxShow,
    });
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

  buildHelpConfig = () => {
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

  fillFormDefaultInitialValues = () => {
    const v = {};

    v[fieldData.title.name] = '标题1';
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
              {
                buildType: formContentConfig.cardExtraBuildType.generalButton,
                icon: <FormOutlined />,
                text: '切换FadeBox显示',
                onClick: () => {
                  this.toggleFadeBoxShow();
                },
              },
              {
                buildType: formContentConfig.cardExtraBuildType.save,
                text: '保存并进行下一步',
              },
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
              title: '局部操作说明1',
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
              title: '局部操作说明2',
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

  buildHelpConfig = () => {
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

  renderOther = () => {
    const { fadeBoxShow } = this.state;

    return (
      <>
        <FadeBox show={fadeBoxShow}>
          <div>
            <Space>
              <IconInfo icon={<FormOutlined />} text="文字1" />
              <IconInfo icon={<FormOutlined />} text="文字2" />
              <IconInfo icon={<FormOutlined />} text="文字3" />
            </Space>
          </div>
        </FadeBox>

        <QueueBox
          show={fadeBoxShow}
          style={{
            marginTop: '20px',
          }}
          itemStyle={{
            marginBottom: '2px',
          }}
          items={[
            {
              hidden: true,
              builder: () => {
                return <IconInfo icon={<FormOutlined />} text="文字1" />;
              },
            },
            {
              hidden: false,
              builder: () => {
                return <IconInfo icon={<FormOutlined />} text="文字2" />;
              },
            },
            {
              hidden: true,
              builder: () => {
                return <IconInfo icon={<FormOutlined />} text="文字3" />;
              },
            },
            {
              hidden: false,
              builder: () => {
                return <IconInfo icon={<FormOutlined />} text="文字4" />;
              },
            },
          ]}
        />
      </>
    );
  };
}

export default Add;
