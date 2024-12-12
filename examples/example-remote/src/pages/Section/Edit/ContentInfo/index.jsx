import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey, throttle } from 'easy-soft-utility';

import {
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

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
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
    });
  };

  afterHtmlChange = ({ html, text }) => {
    this.htmlContent = html;
    this.textContent = text;

    this.refreshContentPreview();
  };

  refreshContentPreview = throttle(
    () => {
      this.setState({
        contentPreview: this.htmlContent,
      });
    },
    600,
    {
      trailing: true,
    },
  );

  establishCardCollectionConfig = () => {
    const { initContent, contentPreview } = this.state;

    return {
      list: [
        {
          fullLine: false,
          width: '400px',
          cardBodyStyle: { padding: 0 },
          otherComponent: (
            <div>
              <MobileHtmlPreviewBox
                // affix
                affixOffsetTop={20}
                alertType={'warning'}
                alertIcon={false}
                alertButtonText="刷新"
                mobileList={[
                  mobileTypeCollection.noneSketch,
                  mobileTypeCollection.roughSketch,
                ]}
                html={contentPreview || ''}
                afterAlertClick={() => {
                  this.refreshContentPreview();
                }}
              />
            </div>
          ),
        },
        {
          title: {
            text: '详情信息',
            subText: '[请在此编辑您所需要的内容]',
          },
          fullLine: false,
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
              initConfig: {},
              afterChange: this.afterHtmlChange,
            },
          ],
        },
      ],
    };
  };
}

export default ContentInfo;
