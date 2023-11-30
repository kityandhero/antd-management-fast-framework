import { Affix } from 'antd';
import React from 'react';

import {
  isArray,
  isObject,
  logCallTrack,
  mergeArrowText,
  toString,
  whetherNumber,
} from 'easy-soft-utility';

import {
  animalType,
  cardConfig,
  mobileTypeCollection,
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';
import { iconBuilder, MobileContainor } from 'antd-management-fast-component';

import { Base } from '../../../framework/DataOperation/Base';

const { MobileSimulation } = MobileContainor;

const primaryCallName = 'MobileContainor::MobilePreviewArea';

class MobilePreviewArea extends Base {
  resetDataAfterLoad = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      placement: 'top',
      height: '100vh',
      mobileType: mobileTypeCollection.noneSketch.name,
    };
  }

  buildMobileTypeArray = () => {
    const list = [];

    for (const o of Object.entries(mobileTypeCollection)) {
      // eslint-disable-next-line no-unused-vars
      const [k, v] = o;

      if (isObject(v)) {
        list.push(v);
      }
    }

    return list;
  };

  establishCardCollectionConfig = () => {
    const {
      alertVisible,
      alertAnimationType,
      alertMessage,
      alertDescription,
      alertIcon,
      alertType,
      alertButtonText,
      afterAlertClick,
      mobileList,
    } = this.props;
    const { mobileType } = this.state;

    const listConfig = [];

    const mobileCollection =
      isArray(mobileList) && mobileList.length <= 0
        ? this.buildMobileTypeArray()
        : mobileList;

    for (const [index, o] of mobileCollection.entries()) {
      if (isObject(o)) {
        const key = `mobileType_${index}`;
        const { label, name } = { label: '', name: '', ...o };

        listConfig.push({
          key,
          flag: name,
          label: label,
          alias: label,
          description: '',
          availability: whetherNumber.yes,
        });
      }
    }

    return {
      list: [
        {
          title: {
            text: '内容预览',
            icon: iconBuilder.read(),
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                size: 'small',
                label: '模拟设备',
                defaultValue: mobileType,
                list: listConfig,
                style: { minWidth: '170px' },
                dataConvert: (o) => {
                  const { label, flag: value } = {
                    label: '',
                    flag: '',
                    ...o,
                  };

                  return {
                    ...o,
                    label,
                    value,
                    alias: label,
                  };
                },
                onChange: (v) => {
                  this.setState({
                    mobileType: v,
                  });
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <MobileSimulation
                    alertVisible={alertVisible}
                    alertAnimationType={alertAnimationType}
                    alertMessage={alertMessage}
                    alertDescription={alertDescription}
                    alertIcon={alertIcon}
                    alertType={alertType}
                    alertButtonText={alertButtonText}
                    afterAlertClick={afterAlertClick}
                    mobileType={mobileType}
                  >
                    {this.renderPresetInnerViewWrapper()}
                  </MobileSimulation>
                </div>
              ),
            },
          ],
        },
      ],
    };
  };

  renderPresetInnerView = () => {
    return null;
  };

  renderPresetInnerViewWrapper = () => {
    return this.renderPresetInnerView();
  };

  renderFurther() {
    if (this.showCallProcess) {
      this.logCallTrack({}, primaryCallName, 'renderFurther');
    } else {
      logCallTrack(
        {},
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'renderFurther',
          'showCallProcess',
          toString(this.showCallProcess),
        ),
        {
          color: renderFurtherColorWhenNoCallProcess,
          prefix: renderFurtherPrefixWhenNoCallProcess,
        },
      );
    }

    const { affix, affixOffsetTop, affixOffsetBottom } = this.props;

    if (!affix) {
      return this.buildCardCollectionArea(this.establishCardCollectionConfig());
    }

    const affixProperties = {
      ...(affixOffsetBottom > 0 ? { offsetBottom: affixOffsetBottom } : {}),
      ...(affixOffsetTop > 0 ? { offsetTop: affixOffsetTop } : {}),
    };

    return (
      <Affix {...affixProperties}>
        {this.buildCardCollectionArea(this.establishCardCollectionConfig())}
      </Affix>
    );
  }
}

MobilePreviewArea.defaultProps = {
  affix: false,
  affixOffsetBottom: 0,
  affixOffsetTop: 0,
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  mobileList: [],
  afterAlertClick: null,
};

export { MobilePreviewArea };
