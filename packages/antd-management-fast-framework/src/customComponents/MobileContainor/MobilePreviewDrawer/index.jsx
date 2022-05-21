import { PictureOutlined } from '@ant-design/icons';

import { isObject } from '../../../utils/tools';
import {
  cardConfig,
  mobileTypeCollection,
  whetherNumber,
  drawerConfig,
} from '../../../utils/constants';
import BaseNeedlessLoadDrawer from '../../../framework/DataDrawer/BaseNeedlessLoadDrawer';
import MobileSimulation from '../MobileSimulation';
import { buildOptionItem } from '../../FunctionComponent';

class MobilePreviewDrawer extends BaseNeedlessLoadDrawer {
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
    const {
      alertVisible,
      alertAnimationType,
      alertMessage,
      alertDescription,
      alertIcon,
      alertType,
      alertButtonText,
      afterAlertClick,
    } = this.props;
    const { mobileType } = this.state;

    return {
      list: [
        {
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
                    {this.renderInnerViewWrapper()}
                  </MobileSimulation>
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

  renderInnerViewWrapper = () => {
    return this.renderInnerView();
  };
}

MobilePreviewDrawer.defaultProps = {};

export default MobilePreviewDrawer;
