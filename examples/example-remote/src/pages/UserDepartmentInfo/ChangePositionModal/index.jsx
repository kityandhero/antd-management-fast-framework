import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  toString,
  whetherNumber,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { singleListAction } from '../../Position/Assist/action';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '8f76c2b61a504c01baacf8b1daebad67';

@connect(({ userDepartmentInfo, position, schedulingControl }) => ({
  userDepartmentInfo,
  position,
  schedulingControl,
}))
class ChangePositionModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '职位设置',
      loadApiPath: modelTypeCollection.userDepartmentInfoTypeCollection.get,
      submitApiPath:
        modelTypeCollection.userDepartmentInfoTypeCollection.setPosition,
      positionId: '',
      positionListData: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadPositionList();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      positionId: '',
    });
  };

  loadPositionList = () => {
    singleListAction({
      target: this,
      handleData: {
        replenishEmptyOption: whetherNumber.yes,
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          positionListData: remoteListData,
        });
      },
    });
  };

  reloadPositionList = () => {
    this.loadPositionList();
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.userDepartmentInfoId.name] = getValueByKey({
      data: externalData,
      key: fieldData.userDepartmentInfoId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData, positionId } = this.state;

    d[fieldData.userDepartmentInfoId.name] = getValueByKey({
      data: externalData,
      key: fieldData.userDepartmentInfoId.name,
    });

    d[fieldData.positionId.name] = positionId;

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
    const positionId = getValueByKey({
      data: metaData,
      key: fieldData.positionId.name,
      convert: convertCollection.string,
    });

    this.setState({
      positionId: positionId === zeroString ? '' : positionId,
    });
  };

  buildNotificationDescription = (
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
  ) => {
    return `职位设置成功。`;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '80px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.realName.name,
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

    return values;
  };

  establishCardCollectionConfig = () => {
    const { positionListData, positionId } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.positionId,
              value: positionId,
              require: true,
              listData: positionListData,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadPositionList();
                },
              }),
              dataConvert: (o) => {
                const { name: title, positionId: value } = o;

                return {
                  title,
                  value,
                };
              },
              onChange: ({ value }) => {
                this.setState({
                  positionId: toString(value),
                });
              },
            },
          ],
        },
      ],
    };
  };
}

export { ChangePositionModal };
