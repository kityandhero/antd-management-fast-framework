import { connect } from 'umi';
import { InfoCircleFilled } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  defaultEmptyImage,
  cardConfig,
  convertCollection,
  formatCollection,
  mobileTypeCollection,
  animalType,
} from 'antd-management-fast-framework/es/utils/constants';
import MobileHtmlPreviewBox from 'antd-management-fast-framework/es/customComponents/MobileContainor/MobileHtmlPreviewBox';

import { accessWayCollection } from '@/customConfig/config';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

@connect(({ article, loading }) => ({
  article,
  loading: loading.models.article,
}))
class ContentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get.permission;

  resetDataAfterLoad = false;

  htmlContent = '';

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/get',
        submitApiPath: 'article/updateContentInfo',
        articleId: null,
        initContent: '',
        contentChanged: false,
        contentPreview: '',
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
    const { articleId } = this.state;

    d[fieldData.articleId.name] = articleId;
    d[fieldData.contentData.name] = this.htmlContent;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    const contentData = getValueByKey({
      data: metaData,
      key: fieldData.contentData.name,
    });

    this.htmlContent = contentData;

    this.setState({
      initContent: contentData,
    });
  };

  afterHtmlChange = ({ html, text }) => {
    this.htmlContent = html;
    this.textContent = text;

    const { contentChanged } = this.state;

    if (!contentChanged) {
      this.setState({ contentChanged: true });
    }
  };

  refreshContentPreview = () => {
    this.setState({
      contentPreview: this.htmlContent,
      contentChanged: false,
    });
  };

  establishCardCollectionConfig = () => {
    const { initContent } = this.state;

    return {
      list: [
        {
          title: {
            text: '详情信息',
            subText: '[请在此编辑您所需要的内容]',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: <InfoCircleFilled />,
                text: '编辑完后记得保存哦!',
              },
              {
                buildType: cardConfig.extraBuildType.save,
                hidden: !this.checkAuthority(
                  accessWayCollection.article.updateContentInfo.permission,
                ),
              },
            ],
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tinymce,
              html: initContent,
              afterChange: this.afterHtmlChange,
            },
          ],
        },
      ],
    };
  };

  establishPageContentLayoutSiderConfig = () => {
    return { width: 400 };
  };

  renderSiderTopArea = () => {
    const { contentPreview, contentChanged } = this.state;

    return (
      <MobileHtmlPreviewBox
        alertVisible={contentChanged}
        alertAnimationType={animalType.queue}
        alertMessage={'内容已经发生变化'}
        alertDescription={'编辑器内容已经更改,请点击刷新按钮查看最新预览.'}
        alertType={'warning'}
        alertIcon={false}
        alertButtonText="刷新"
        mobileList={[mobileTypeCollection.roughSketch, mobileTypeCollection.iPhone5S]}
        html={contentPreview || ''}
        afterAlertClick={() => {
          this.refreshContentPreview();
        }}
      />
    );
  };
}

export default ContentInfo;
