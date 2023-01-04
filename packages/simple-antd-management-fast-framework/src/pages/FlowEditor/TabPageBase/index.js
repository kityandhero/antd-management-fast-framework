import { cardConfig } from 'antd-management-fast-common/es/utils/constants';
import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common/es/utils/tools';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import BaseUpdateFormTab from 'antd-management-fast-framework/es/framework/DataForm/BaseUpdateFormTab';

import {
  checkNeedUpdateAssist,
  parseUrlParamsForSetState,
} from '../Assist/config';

class BaseEditTab extends BaseUpdateFormTab {
  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'flowEditor/init',
        logo: '',
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

  apiDataConvert = (props) => {
    const {
      flowEditor: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.component,
              component: this.renderEdit(),
            },
          ],
        },
      ],
    };
  };

  renderEdit = () => {
    return null;
  };
}

export default BaseEditTab;
