import { Dropdown, List } from 'antd';
import { connect } from '@umijs/max';

import {
  getValueByKey,
  isArray,
  showSimpleErrorMessage,
  sortCollectionByKey,
  sortOperate,
} from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';
import { DataModal } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/config';
import { setMediaCollectionSortAction } from '../Assist/action';
import { getArticleIdFromExternalData } from '../Assist/config';
import { mediaItemData } from '../Common/data';

import styles from './index.less';

const { Base } = DataModal;

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class ChangeImageSortModal extends Base {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

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
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
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

    for (const item of metaListData || []) {
      list.push(`${item.id}|${item.sort}`);
    }

    d.sorts = list.join(',');

    return d;
  };

  buildNotificationDescription = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    return ` 图片顺序已经更改成功。`;
  };

  checkSubmitRequestParams = (o) => {
    if ((o.articleId || '') === '') {
      showSimpleErrorMessage('请提交产品标识!');
      return false;
    }

    if ((o.sorts || '') === '') {
      showSimpleErrorMessage('请提交产品图片排序序列!');
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
        .join(',');

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

    const MoreButton = (properties) => {
      const { current, metaListDataList, hasAuthority, onMenuClick } =
        properties;

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
            onClick: (event) => onMenuClick(event, current),
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
                  <MoreButton
                    key={`${index}_`}
                    current={item}
                    metaListDataList={metaListData}
                    hasAuthority={this.checkAuthority(
                      accessWayCollection.article.updateImageContentInfo
                        .permission,
                    )}
                    onMenuClick={(event, current) => {
                      const { key } = event;

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
