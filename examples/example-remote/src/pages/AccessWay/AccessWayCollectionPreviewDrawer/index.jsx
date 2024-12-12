import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { buildJsonView, iconBuilder } from 'antd-management-fast-component';
import {
  DataSinglePageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayPermissionFieldData } from '../Common/data';

const { SinglePageDrawer } = DataSinglePageView;

const visibleFlag = '7cd0d274f58d4ad3be758d32a4d1b3d3';

// const defaultProperties = {
//   placement: 'left',
//   width: 880,
// };

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class AccessWayCollectionPreviewDrawer extends SinglePageDrawer {
  reloadWhenShow = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.cardCollectionView,
      loadApiPath: 'accessWay/singleListRoute',
      showBottomBar: true,
    };
  }

  renderPresetTitleIcon = () => {
    const { icon } = {
      icon: iconBuilder.form(),
      ...this.props,
    };

    return icon;
  };

  getPresetPageTitle = () => {
    const { title } = {
      title: '',
      ...this.props,
    };

    return title || '简要信息';
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: accessWayPermissionFieldData.title,
        },
        {
          lg: 12,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishCardCollectionViewItemConfig = (r) => {
    return {
      title: {
        text: getValueByKey({
          data: r,
          key: accessWayPermissionFieldData.title.name,
        }),
      },
      useAnimal: true,
      animalType: cardConfig.animalType.queue,
      bordered: true,
      items: [
        {
          lg: 24,
          type: cardConfig.contentItemType.component,
          component: buildJsonView({
            value: r.value,
          }),
        },
      ],
    };
  };
}

// AccessWayCollectionPreviewDrawer.defaultProps = {
//   placement: 'left',
//   width: 880,
// };

export default AccessWayCollectionPreviewDrawer;
