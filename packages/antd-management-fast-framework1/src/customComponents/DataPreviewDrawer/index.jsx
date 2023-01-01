import parse from 'html-react-parser';

import {
  cardConfig,
  dataTypeCollection,
  iconCollection,
} from 'antd-management-fast-common/es/utils/constants';
import { toNumber } from 'antd-management-fast-common/es/utils/tools';
import Base from 'antd-management-fast-framework/es/framework/DataDrawer/Base';

import styles from './index.less';

class DataPreviewDrawer extends Base {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showBottomBar: true,
      },
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
          icon: iconCollection.contacts,
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
          icon: iconCollection.contacts,
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
          icon: iconCollection.contacts,
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
          icon: iconCollection.contacts,
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
  icon: iconCollection.form,
  placement: 'left',
  width: 380,
  dataType: dataTypeCollection.commonValue.flag,
};

export default DataPreviewDrawer;
