import { connect } from 'umi';

import {
  animalType,
  cardConfig,
  mobileTypeCollection,
} from 'antd-management-fast-common/es/utils/constants';
import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
} from 'antd-management-fast-common/es/utils/tools';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import MobileHtmlPreviewBox from 'antd-management-fast-component/es/customComponents/MobileContainor/MobileHtmlPreviewBox';

import { accessWayCollection } from '@/customConfig/config';

import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import TabPageBase from '../../TabPageBase';

@connect(({ article, loading }) => ({
  article,
  loading: loading.models.article,
}))
class ContentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get.permission;

  resetDataAfterLoad = false;

  htmlContent = '';

  autoSyncPrevEnable = true;

  autoSyncPrevFlag = false;

  autoSyncPrevInterval = 5000;

  autoSyncPrevTimer = null;

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

  adjustWhenDidMount = () => {
    const that = this;

    if (that.autoSyncPrevEnable) {
      that.autoSyncPrevTimer = setInterval(() => {
        if (that.autoSyncPrevFlag) {
          that.setState(
            {
              contentPreview: that.htmlContent,
              contentChanged: false,
            },
            () => {
              that.autoSyncPrevFlag = false;
            },
          );
        }
      }, that.autoSyncPrevInterval);
    }
  };

  beforeUnmount = () => {
    clearInterval(this.autoSyncPrevTimer);
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { articleId } = this.state;

    d[fieldData.articleId.name] = articleId;
    d[fieldData.contentData.name] = this.htmlContent;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
  }) => {
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
    this.autoSyncPrevFlag = true;

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
                icon: iconBuilder.infoCircle(),
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
              initConfig: {},
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
        affix
        affixOffsetTop={20}
        alertVisible={contentChanged}
        alertAnimationType={animalType.queue}
        alertMessage={'内容已经发生变化'}
        alertDescription={
          '编辑器内容已经更改, 请点击刷新按钮查看最新预览, 或者更待稍后自动更新.'
        }
        alertType={'warning'}
        alertIcon={false}
        alertButtonText="刷新"
        mobileList={[
          mobileTypeCollection.roughSketch,
          mobileTypeCollection.iPhone5S,
        ]}
        html={contentPreview || ''}
        afterAlertClick={() => {
          this.refreshContentPreview();
        }}
      />
    );
  };
}

export default ContentInfo;
