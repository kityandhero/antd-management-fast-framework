import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import {
  animalType,
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
  mobileTypeCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { MobileContainor } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

const { MobileHtmlPreviewBox } = MobileContainor;

@connect(({ section, loading }) => ({
  section,
  loading: loading.models.section,
}))
class ContentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.section.get.permission;

  resetDataAfterLoad = false;

  htmlContent = '';

  constructor(properties) {
    super(properties);
    this.state = {
      ...this.state,

      loadApiPath: 'section/get',
      submitApiPath: 'section/updateContentInfo',
      sectionId: null,
      initContent: '',
      contentChanged: false,
      contentPreview: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { sectionId } = this.state;

    d[fieldData.sectionId.name] = sectionId;
    d[fieldData.contentData.name] = this.htmlContent;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const contentData = getValueByKey({
      data: metaData,
      key: fieldData.contentData.name,
    });

    this.htmlContent = contentData;

    this.setState({
      initContent: contentData,
      contentPreview: contentData,
      contentChanged: false,
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
                icon: iconBuilder.infoCircle(),
                text: '编辑完后记得保存哦!',
              },
              {
                buildType: cardConfig.extraBuildType.save,
                hidden: !checkHasAuthority(
                  accessWayCollection.section.updateContentInfo.permission,
                ),
              },
            ],
          },

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
