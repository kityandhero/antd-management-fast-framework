import { Avatar } from 'antd';
import { connect } from 'umi';

import FlexBox from 'antd-management-fast-framework/es/customComponents/FlexBox';
import DataLoad from 'antd-management-fast-framework/es/framework/DataSingleView/DataLoad';
import {
  cardConfig,
  defaultUserAvatar,
  iconCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import { getValueByKey } from 'antd-management-fast-framework/es/utils/tools';

import { accessWayCollection } from '@/customConfig/accessWayCollection';

@connect(({ article, user, global }) => ({
  article,
  user,
  global,
}))
class Index extends DataLoad {
  componentAuthority = accessWayCollection.article.pageList.permission;

  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '工作台',
        loadApiPath: 'article/pageList',
      },
    };
  }

  apiDataConvert = (props) => {
    const {
      user: { data },
    } = props;

    return data;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconCollection.contacts,
            text: '基本信息',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: <div>11</div>,
            },
          ],
        },
        {
          title: {
            icon: iconCollection.contacts,
            text: '推荐人信息',
          },
          spinning: this.checkInProgress(),
          items: [
            // {
            //   lg: 6,
            //   type: cardConfig.contentItemType.onlyShowTextByFlexText,
            //   fieldData: fieldData.parentId,
            //   value: getValueByKey({
            //     data: metaData,
            //     key: fieldData.parentId.name,
            //   }),
            // },
            // {
            //   lg: 6,
            //   type: cardConfig.contentItemType.onlyShowTextByFlexText,
            //   fieldData: fieldData.parentNickname,
            //   value: getValueByKey({
            //     data: metaData,
            //     key: fieldData.parentNickname.name,
            //   }),
            // },
            // {
            //   lg: 6,
            //   type: cardConfig.contentItemType.onlyShowTextByFlexText,
            //   fieldData: fieldData.parentRealName,
            //   value: getValueByKey({
            //     data: metaData,
            //     key: fieldData.parentRealName.name,
            //   }),
            // },
          ],
        },
        {
          title: {
            icon: iconCollection.contacts,
            text: '其他信息',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };

  renderPageHeaderContent = () => {
    console.log(this.props);

    const currentOperator = this.getCurrentOperator();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    // console.log(article);

    return (
      <>
        <FlexBox
          flexAuto="right"
          left={
            <Avatar
              size="small"
              style={{
                width: '70px',
                height: '70px',
              }}
              // className={styles.avatar}
              src={avatar || defaultUserAvatar}
              alt="avatar"
            />
          }
          leftStyle={{
            paddingRight: '20px',
          }}
          right={<FlexBox flexAuto="top" top={<div>1</div>} bottom={2} />}
        />
      </>
    );
  };
}

export default Index;
