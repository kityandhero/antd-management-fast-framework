import { Dropdown, List, Menu } from 'antd';
import { connect } from 'umi';

import { sortOperate } from 'antd-management-fast-common/es/utils/constants';
import {
  getValueByKey,
  isArray,
  showError,
  sortCollectionByKey,
} from 'antd-management-fast-common/es/utils/tools';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import Base from 'antd-management-fast-framework/es/framework/DataModal/Base';

import { accessWayCollection } from '@/customConfig/config';

import { setMediaCollectionSortAction } from '../Assist/action';
import { getArticleIdFromExternalData } from '../Assist/config';
import { mediaItemData } from '../Common/data';

import styles from './index.less';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class ChangeImageSortModal extends Base {
  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '变更图片顺序',
        loadApiPath: 'article/listImage',
        submitApiPath: 'article/updateImageSort',
        width: 700,
        articleId: '',
        videoUrl: '',
        sorts: '',
        bodyStyle: {
          height: '300px',
          overflow: 'auto',
        },
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  apiDataConvert = (props) => {
    const {
      article: { data },
    } = props;
    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProps, preState, snapshot) => {
    this.reloadData();
  };

  supplementLoadRequestParams = (o) => {
    const d = o;

    d.articleId = getArticleIdFromExternalData(this.state);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaListData } = this.state;

    d.articleId = getArticleIdFromExternalData(this.state);

    const list = [];

    (metaListData || []).forEach((item) => {
      list.push(`${item.id}|${item.sort}`);
    });

    d.sorts = list.join();

    return d;
  };

  buildNotificationDescription = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    return ` 图片顺序已经更改成功。`;
  };

  checkSubmitRequestParams = (o) => {
    if ((o.articleId || '') === '') {
      showError('请提交产品标识!');
      return false;
    }

    if ((o.sorts || '') === '') {
      showError('请提交产品图片排序序列!');
      return false;
    }

    return true;
  };

  changeSort = (key, record) => {
    const { metaListData } = this.state;

    const list = sortCollectionByKey({
      operate: key,
      item: record,
      list: metaListData,
      sortKey: 'sort',
      sortMin: 1,
    });

    this.saveSortChangedMediaItem(list);
  };

  saveSortChangedMediaItem = (mediaItems) => {
    const { articleId } = this.state;

    this.setState({ mediaItemList: mediaItems }, () => {
      const ids = (isArray(mediaItems) ? mediaItems : [])
        .map((o) => {
          const v = getValueByKey({
            data: o,
            key: mediaItemData.id.name,
          });

          return v;
        })
        .join();

      setMediaCollectionSortAction({
        target: this,
        handleData: {
          articleId,
          ids,
        },
      });
    });
  };

  formContent = () => {
    const { metaListData } = this.state;

    const ListContent = ({ data: { sort } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>序列</span>
          <p>
            排序值:
            {sort}
          </p>
        </div>
      </div>
    );

    const MoreBtn = (props) => {
      const { current, metaListDataList, hasAuthority, onMenuClick } = props;

      const items = [
        {
          key: sortOperate.moveUp,
          label: '上移',
          icon: iconBuilder.arrowUp(),
          disabled: current.sort === 1,
        },
        {
          key: sortOperate.moveDown,
          label: '下移',
          icon: iconBuilder.arrowDown(),
          disabled: current.sort === (metaListDataList || []).length,
        },
      ];

      return (
        <Dropdown
          disabled={!hasAuthority}
          menu={{
            items: items,
            onClick: (e) => onMenuClick(e, current),
          }}
        >
          <a>{iconBuilder.retweet()} 排序</a>
        </Dropdown>
      );
    };

    return (
      <>
        <div className={styles.containorBox}>
          <List
            size="large"
            rowKey="id"
            // loading={this.checkInProgress()}
            pagination={false}
            dataSource={metaListData}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <MoreBtn
                    key={`${index}_`}
                    current={item}
                    metaListDataList={metaListData}
                    hasAuthority={this.checkAuthority(
                      accessWayCollection.article.updateImageContentInfo
                        .permission,
                    )}
                    onMenuClick={(e, current) => {
                      const { key } = e;

                      this.changeSort(key, current);
                    }}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.url}
                      className={styles.imageItem}
                      alt={item.url}
                    />
                  }
                  title={<a href={item.href}>图片路径:</a>}
                  description={item.url}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </div>
      </>
    );
  };
}

export default ChangeImageSortModal;
