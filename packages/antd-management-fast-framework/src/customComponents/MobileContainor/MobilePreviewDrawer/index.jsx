import React from 'react';
import { PictureOutlined } from '@ant-design/icons';

import { recordObject, showErrorMessage, isObject } from '../../../utils/tools';
import {
  cardConfig,
  mobileTypeCollection,
  whetherNumber,
  drawerConfig,
} from '../../../utils/constants';
import Base from '../../../framework/DataDrawer/Base';
import VerticalBox from '../../VerticalBox';
import RoughSketch from '../RoughSketch';
import IphoneX from '../Devices/IphoneX';
import Iphone8plus from '../Devices/Iphone8plus';
import Iphone8 from '../Devices/Iphone8';
import IPhone5S from '../Devices/IPhone5S';
import GalaxyNote8 from '../Devices/GalaxyNote8';
import { buildOptionItem } from '../../FunctionComponent';

class MobilePreviewDrawer extends Base {
  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        placement: 'top',
        height: '100vh',
        showBottomBar: false,
        mobileType: mobileTypeCollection.roughSketch.name,
      },
    };
  }

  renderTitleIcon = () => {
    return <PictureOutlined />;
  };

  renderTitle = () => {
    return '设备预览';
  };

  establishExtraActionConfig = () => {
    const { mobileType } = this.state;

    const listConfig = [];

    Object.entries(mobileTypeCollection).forEach((o, index) => {
      const [k, v] = o;

      if (isObject(v)) {
        const key = `mobileType_${index}`;

        listConfig.push({
          key,
          flag: k,
          name: v.label,
          alias: v.label,
          description: '',
          availability: whetherNumber.yes,
        });
      }
    });

    return {
      list: [
        {
          buildType: drawerConfig.extraBuildType.flexSelect,
          label: '模拟设备',
          value: mobileType,
          renderItemFunction: () => {
            return buildOptionItem({
              list: listConfig,
            });
          },
          onChangeCallback: (v) => {
            this.setState({
              mobileType: v,
            });
          },
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { mobileType } = this.state;

    let mobileView = null;

    switch (mobileType) {
      case mobileTypeCollection.roughSketch.name:
        mobileView = <RoughSketch>{this.renderInnerView()}</RoughSketch>;
        break;

      case mobileTypeCollection.iphoneX.name:
        mobileView = <IphoneX>{this.renderInnerView()}</IphoneX>;
        break;

      case mobileTypeCollection.iphone8.name:
        mobileView = <Iphone8>{this.renderInnerView()}</Iphone8>;
        break;

      case mobileTypeCollection.iphone8plus.name:
        mobileView = <Iphone8plus>{this.renderInnerView()}</Iphone8plus>;
        break;

      case mobileTypeCollection.iPhone5S.name:
        mobileView = <IPhone5S>{this.renderInnerView()}</IPhone5S>;
        break;

      case mobileTypeCollection.galaxyNote8.name:
        mobileView = <GalaxyNote8>{this.renderInnerView()}</GalaxyNote8>;
        break;

      default:
        mobileView = null;

        const text = 'invalid mobile type，please check in console';

        showErrorMessage({
          message: text,
        });

        recordObject({
          message: 'available mobile type list',
          mobileTypeCollection,
        });

        break;
    }

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <VerticalBox
                    align="center"
                    alignJustify="center"
                    style={{
                      height: '100%',
                    }}
                  >
                    {mobileView}
                  </VerticalBox>
                </div>
              ),
            },
          ],
        },
      ],
    };
  };

  renderInnerView = () => {
    return null;
  };
}

MobilePreviewDrawer.defaultProps = {};

export default MobilePreviewDrawer;
