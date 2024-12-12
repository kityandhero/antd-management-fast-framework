import { connect } from 'easy-soft-dva';

import { columnFacadeMode } from 'antd-management-fast-common';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData } from '../Common/data';

const { SinglePage: SinglePageView } = DataSinglePageView;

@connect(({ mongoSlowQueryInfo, schedulingControl }) => ({
  mongoSlowQueryInfo,
  schedulingControl,
}))
class SinglePage extends SinglePageView {
  componentAuthority =
    accessWayCollection.mongoSlowQueryInfo.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Mongo慢查询列表',
      paramsKey: accessWayCollection.mongoSlowQueryInfo.singleList.paramsKey,
      loadApiPath: 'mongoSlowQueryInfo/singleList',
    };
  }

  // establishListItemDropdownConfig = (record) => {
  //   return {
  //     size: 'small',
  //     text: '移除',
  //     icon: iconBuilder.delete(),
  //     disabled: !checkHasAuthority(
  //       accessWayCollection.mongoSlowQueryInfo.remove.permission,
  //     ),
  //     handleButtonClick: ({ handleData }) => {
  //       this.remove(handleData);
  //     },
  //     handleData: record,
  //     confirm: true,
  //     title: '即将移除数据，确定吗？',
  //   };
  // };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.nameSpace,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '连接 mongo, 获取慢查询配置, 示例如下: db.getProfilingStatus()。',
        },
        {
          text: '开启慢日志, 设置超过100毫秒的操作为慢操作, 示例如下: db.setProfilingLevel(1,100)。',
        },
        {
          text: '查看慢日志内容, 示例如下: db.system.profile.find().sort({$natural:-1}).limit(1).explain(true)。',
        },
      ],
    };
  };
}

export default SinglePage;
