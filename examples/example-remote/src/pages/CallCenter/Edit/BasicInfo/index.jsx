import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  toString,
  whetherNumber,
  zeroString,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../../customSpecialComponents';
import { singleTreeListAction as categorySingleTreeListAction } from '../../../CallCenterCategory/Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ callCenter, schedulingControl }) => ({
  callCenter,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority = accessWayCollection.callCenter.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'callCenter/get',
      submitApiPath: 'callCenter/updateBasicInfo',
      categoryTreeData: [],
      callCenterId: null,
      categoryId: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  doOtherRemoteRequest = () => {
    this.loadCategoryTreeList({ refresh: whetherNumber.no });
  };

  loadCategoryTreeList = ({ refresh = whetherNumber.no }) => {
    categorySingleTreeListAction({
      target: this,
      handleData: { refresh },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          categoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadCategoryTreeList = () => {
    this.loadCategoryTreeList({ refresh: whetherNumber.yes });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { callCenterId } = this.state;

    d[fieldData.callCenterId.name] = callCenterId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { callCenterId, categoryId } = this.state;

    d[fieldData.callCenterId.name] = callCenterId;
    d[fieldData.categoryId.name] = categoryId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const categoryId = getValueByKey({
      data: metaData,
      key: fieldData.categoryId.name,
      convert: convertCollection.string,
    });

    this.setState({
      categoryId: categoryId === zeroString ? '' : categoryId,
    });
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.contactInformation.name] = getValueByKey({
        data: metaData,
        key: fieldData.contactInformation.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, categoryId, categoryTreeData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.contactInformation,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.categoryId,
              value: toString(categoryId),
              require: true,
              listData: categoryTreeData,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadCategoryTreeList();
                },
              }),
              dataConvert: (o) => {
                const { name: title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              // eslint-disable-next-line no-unused-vars
              onChange: ({ value, label, extra }) => {
                this.setState({
                  categoryId: toString(value),
                });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export default Index;
