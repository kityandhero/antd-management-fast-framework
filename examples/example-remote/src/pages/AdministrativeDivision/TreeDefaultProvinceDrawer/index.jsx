import { Divider, Empty } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import {
  buildCustomGrid,
  ElasticityTree,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshSingleTreeListWithDefaultProvinceCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'c51c0e5d005740e1b0748e25d5cf48a8';

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
class TreeDefaultProvinceDrawer extends BaseVerticalFlexDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 640,
      pageTitle: '默认省节点树预览',
      loadApiPath: 'administrativeDivision/singleTreeListWithDefaultProvince',
      wrapperVisibility: 1,
      crossingLevel: 1,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    const { wrapperVisibility, crossingLevel } = this.state;

    d[fieldData.wrapperVisibility.name] = toNumber(wrapperVisibility);
    d[fieldData.crossingLevel.name] = toNumber(crossingLevel);

    return d;
  };

  refreshSingleTreeListWithDefaultProvinceCache = () => {
    refreshSingleTreeListWithDefaultProvinceCacheAction({
      target: this,
      handleData: {},
    });
  };

  setCrossingLevelOneAndWrapperDisplay = () => {
    const that = this;

    that.setState(
      {
        wrapperVisibility: 1,
        crossingLevel: 1,
      },
      () => {
        that.reloadData({});
      },
    );
  };

  setCrossingLevelOneAndWrapperHidden = () => {
    const that = this;

    that.setState(
      {
        wrapperVisibility: 0,
        crossingLevel: 1,
      },
      () => {
        that.reloadData({});
      },
    );
  };

  setCrossingLevelTwoAndWrapperDisplay = () => {
    const that = this;

    that.setState(
      {
        wrapperVisibility: 1,
        crossingLevel: 2,
      },
      () => {
        that.reloadData({});
      },
    );
  };

  setCrossingLevelTwoAndWrapperHidden = () => {
    const that = this;

    that.setState(
      {
        wrapperVisibility: 0,
        crossingLevel: 2,
      },
      () => {
        that.reloadData({});
      },
    );
  };

  establishExtraActionConfig = () => {
    const { crossingLevel, wrapperVisibility } = this.state;

    return {
      list: [
        {
          buildType: extraBuildType.dropdown,
          icon: iconBuilder.fork(),
          size: 'default',
          text: `${crossingLevel}级级联${wrapperVisibility === whetherNumber.yes ? '【显示包裹节点】' : '【隐藏包裹节点】'}`,
          handleData: {},
          hidden: false,
          // eslint-disable-next-line no-unused-vars
          handleButtonClick: ({ handleData }) => {
            this.reloadData({});
          },
          // eslint-disable-next-line no-unused-vars
          handleMenuClick: ({ key, handleData }) => {
            switch (key) {
              case 'setCrossingLevelOneAndWrapperHidden': {
                this.setCrossingLevelOneAndWrapperHidden();

                break;
              }

              case 'setCrossingLevelTwoAndWrapperHidden': {
                this.setCrossingLevelTwoAndWrapperHidden();

                break;
              }

              case 'setCrossingLevelOneAndWrapperDisplay': {
                this.setCrossingLevelOneAndWrapperDisplay();

                break;
              }

              case 'setCrossingLevelTwoAndWrapperDisplay': {
                this.setCrossingLevelTwoAndWrapperDisplay();

                break;
              }
            }
          },
          items: [
            {
              key: 'setCrossingLevelOneAndWrapperDisplay',
              icon: iconBuilder.fork(),
              text: '设为 1 级级联【显示包裹节点】',
            },
            {
              key: 'setCrossingLevelOneAndWrapperHidden',
              icon: iconBuilder.fork(),
              text: '设为 1 级级联【隐藏包裹节点】',
            },
            {
              key: 'setCrossingLevelTwoAndWrapperDisplay',
              icon: iconBuilder.fork(),
              text: '设为 2 级级联【显示包裹节点】',
            },
            {
              key: 'setCrossingLevelTwoAndWrapperHidden',
              icon: iconBuilder.fork(),
              text: '设为 2 级级联【隐藏包裹节点】',
            },
          ],
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.clear(),
          text: '清除缓存',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.administrativeDivision
              .refreshSingleTreeListWithDefaultProvinceCache.permission,
          ),
          handleClick: () => {
            this.refreshSingleTreeListWithDefaultProvinceCache();
          },
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的是默认省级地区树型预览.',
        },
        {
          text: '此处仅显示可用状态的数据.',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { firstLoadSuccess, metaListData, metaExtra } = this.state;

    return (
      <div style={{ padding: '20px 20px' }}>
        {buildCustomGrid({
          list: [
            {
              span: 2,
              label: fieldData.areaName.label,
              value: getValueByKey({
                data: metaExtra,
                key: fieldData.areaName.name,
              }),
            },
            {
              span: 2,
              label: fieldData.areaCode.label,
              value: getValueByKey({
                data: metaExtra,
                key: fieldData.areaCode.name,
              }),
            },
          ],
          props: {
            bordered: true,
            column: 2,
            size: 'small',
            labelStyle: {
              width: '160px',
            },
            emptyValue: '暂无',
            emptyStyle: {
              color: '#ccc',
            },
          },
        })}

        <Divider orientation="left" style={{ fontSize: '14px' }}>
          树型展示
        </Divider>

        {firstLoadSuccess && metaListData.length > 0 ? (
          <ElasticityTree
            listData={metaListData}
            dataConvert={(o) => {
              const { name: title, code: value } = o;

              return {
                title: `${title}【${value}】`,
                value,
              };
            }}
          />
        ) : null}

        {firstLoadSuccess && metaListData.length === 0 ? (
          <Empty description="无数据" />
        ) : null}
      </div>
    );
  };
}

export { TreeDefaultProvinceDrawer };
