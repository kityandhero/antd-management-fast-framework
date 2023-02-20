import parse from 'html-react-parser';

import { toNumber } from 'easy-soft-utility';

import { cardConfig, dataTypeCollection } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { Base } from '../../framework/DataDrawer/Base';

import styles from './index.less';

class DataPreviewDrawer extends Base {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      showBottomBar: true,
    };
  }

  renderTitleIcon = () => {
    const { icon } = this.props;

    return icon;
  };

  renderTitle = () => {
    const { title } = this.props;

    return title || '';
  };

  establishCardCollectionConfig = () => {
    const { dataType, data } = this.props;

    const list = [
      {
        title: {
          icon: iconBuilder.contacts(),
          text: '说明',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '',
              helper: '',
            },
            value: '本次操作的记录描述，请细心察看',
          },
        ],
      },
    ];

    if (toNumber(dataType) === dataTypeCollection.commonValue.flag) {
      list.push({
        title: {
          icon: iconBuilder.contacts(),
          text: '操作内容',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '操作内容',
              helper: '',
            },
            value: data,
          },
        ],
      });
    } else if (
      dataType === dataTypeCollection.jsonObject.flag ||
      dataType === dataTypeCollection.jsonObjectList.flag
    ) {
      list.push({
        title: {
          icon: iconBuilder.contacts(),
          text: '数据变更',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.jsonView,
            value: data,
          },
        ],
      });
    } else {
      list.push({
        title: {
          icon: iconBuilder.contacts(),
          text: '操作内容',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '操作内容',
              helper: '',
            },
            value: data,
          },
        ],
      });
    }

    return { list };
  };

  renderContentContainor = () => {
    const { dataType, data } = this.props;

    if (dataType === dataTypeCollection.html.flag) {
      return <div className={styles.previewContainor}>{parse(data)}</div>;
    }

    return <div className={styles.contentContainor}>{this.renderForm()}</div>;
  };
}

DataPreviewDrawer.defaultProps = {
  title: '',
  icon: iconBuilder.form(),
  placement: 'left',
  width: 380,
  dataType: dataTypeCollection.commonValue.flag,
};

export { DataPreviewDrawer };
