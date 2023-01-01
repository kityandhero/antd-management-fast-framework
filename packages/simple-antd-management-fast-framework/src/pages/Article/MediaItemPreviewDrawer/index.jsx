import { iconCollection } from 'antd-management-fast-common/es/utils/constants';
import {
  isArray,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-common/es/utils/tools';
import { buildPlayer } from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import MobilePreviewDrawer from 'antd-management-fast-component/es/customComponents/MobileContainor/MobilePreviewDrawer';

class MediaItemPreviewDrawer extends MobilePreviewDrawer {
  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{},
    };
  }

  renderTitleIcon = () => {
    return iconCollection.picture;
  };

  renderTitle = () => {
    return '媒体图文预览';
  };

  buildArticle = () => {
    const { data } = this.props;

    if (!isArray(data)) {
      const text = '预览数据格式无效';

      showErrorMessage({
        message: text,
      });

      return null;
    }

    const list = data.map((item, index) => {
      return { ...item, ...{ key: `data_${index}` } };
    });

    return (
      <>
        {list.map((o) => {
          return <div key={o.key}>{this.buildItem(o)}</div>;
        })}
      </>
    );
  };

  buildItem = (record) => {
    if ((record || null) == null) {
      return null;
    }

    return (
      <>
        {stringIsNullOrWhiteSpace(record.image) ? null : (
          <img width="100%" src={record.image} />
        )}
        {stringIsNullOrWhiteSpace(record.description) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {record.description}
          </p>
        )}
        {stringIsNullOrWhiteSpace(record.video)
          ? null
          : buildPlayer({ url: record.video })}
      </>
    );
  };

  renderInnerView = () => {
    return this.buildArticle();
  };
}

MediaItemPreviewDrawer.defaultProps = {
  data: [],
};

export default MediaItemPreviewDrawer;
