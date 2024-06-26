import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey, throttle } from 'easy-soft-utility';

import {
  // animalType,
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
  mobileTypeCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { MobileContainor } from 'antd-management-fast-framework';

import { parseUrlParametersForSetState } from '../../../../businessAssists/config';
import { fieldData } from '../../../../businessData/data';
import { accessWayCollection } from '../../../../customConfig';
import TabPageBase from '../../TabPageBase';

const { MobileHtmlPreviewBox } = MobileContainor;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class ContentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.simple.get.permission;

  resetDataAfterLoad = false;

  htmlContent = '';

  autoSyncPrevEnable = true;

  autoSyncPrevFlag = false;

  autoSyncPrevInterval = 5000;

  autoSyncPrevTimer = null;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'simple/get',
      submitApiPath: 'simple/updateContentInfo',
      simpleId: null,
      initContent: '',
      // contentChanged: false,
      contentPreview: '',
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
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
              // contentChanged: false,
            },
            () => {
              that.autoSyncPrevFlag = false;
            },
          );
        }
      }, that.autoSyncPrevInterval);
    }
  };

  doWorkBeforeUnmount = () => {
    clearInterval(this.autoSyncPrevTimer);
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { simpleId } = this.state;

    d[fieldData.simpleId.name] = simpleId;
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
    });
  };

  afterHtmlChange = ({ html, text }) => {
    this.htmlContent = html;
    this.textContent = text;
    this.autoSyncPrevFlag = true;

    // const { contentChanged } = this.state;

    // if (!contentChanged) {
    //   this.setState({ contentChanged: true });
    // }

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
                  accessWayCollection.simple.updateContentInfo.permission,
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
              initConfig: {
                height: 700,
                toolbar_sticky: false,
              },
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

  renderPresetSiderTopArea = () => {
    const {
      contentPreview,
      //  contentChanged
    } = this.state;

    return (
      <MobileHtmlPreviewBox
        // affix
        affixOffsetTop={20}
        // alertVisible={contentChanged}
        // alertAnimationType={animalType.queue}
        // alertMessage={'内容已经发生变化'}
        // alertDescription={
        //   '编辑器内容已经更改, 请点击刷新按钮查看最新预览, 或者更待稍后自动更新.'
        // }
        // alertType={'warning'}
        // alertIcon={false}
        // alertButtonText="刷新"
        mobileList={[
          mobileTypeCollection.noneSketch,
          mobileTypeCollection.roughSketch,
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
