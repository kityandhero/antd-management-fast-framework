import { Dropdown, List } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  isArray,
  showSimpleErrorMessage,
  sortCollectionByKey,
  sortOperate,
} from 'easy-soft-utility';

import { AnchorLink, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { setMediaCollectionSortAction } from '../Assist/action';
import { getArticleIdFromExternalData } from '../Assist/config';
import { mediaItemData } from '../Common/data';

import styles from './index.less';

const { Base } = DataModal;

const visibleFlag = 'b47b4b567e1643b585f1f7c69a323cba';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class ChangeImageSortModal extends Base {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '变更图片顺序',
      loadApiPath: 'simple/listImage',
      submitApiPath: 'simple/updateImageSort',
      width: 700,
      simpleId: '',
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

  doOtherWhenChangeVisibleToShow = () => {
    this.reloadData({});
  };

  supplementLoadRequestParams = (o) => {
    const d = o;

    d.simpleId = getArticleIdFromExternalData(this.state);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaListData } = this.state;

    d.simpleId = getArticleIdFromExternalData(this.state);

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
    if ((o.simpleId || '') === '') {
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
    const { simpleId } = this.state;

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
          simpleId,
          ids,
        },
      });
    });
  };

  renderPresetFormContent = () => {
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
          <AnchorLink>{iconBuilder.retweet()} 排序</AnchorLink>
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
                    hasAuthority={checkHasAuthority(
                      accessWayCollection.simple.updateImageContentInfo
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
                  title={<AnchorLink href={item.href}>图片路径:</AnchorLink>}
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
