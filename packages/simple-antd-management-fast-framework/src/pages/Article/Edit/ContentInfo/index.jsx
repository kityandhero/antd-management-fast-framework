import { connect } from 'umi';

import MobileHtmlPreviewBox from 'antd-management-fast-framework/es/customComponents/MobileContainor/MobileHtmlPreviewBox';
import {
  animalType,
  cardConfig,
  iconCollection,
  mobileTypeCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';

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
            text: '????????????',
            subText: '[????????????????????????????????????]',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconCollection.infoCircle,
                text: '???????????????????????????!',
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
        alertMessage={'????????????????????????'}
        alertDescription={'???????????????????????????, ???????????????????????????????????????, ??????????????????????????????.'}
        alertType={'warning'}
        alertIcon={false}
        alertButtonText="??????"
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
