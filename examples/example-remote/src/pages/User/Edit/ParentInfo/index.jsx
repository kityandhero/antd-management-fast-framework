import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  replaceWithKeep,
  toString,
  zeroString,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { clearParentAction } from '../../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { UserSelectDrawerField } from '../../SelectDrawerField';
import { TabPageBase } from '../../TabPageBase';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class ParentInfo extends TabPageBase {
  resetDataAfterLoad = false;

  componentAuthority = accessWayCollection.user.updateBasicInfo.permission;

  goToUpdateWhenProcessed = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'user/get',
      submitApiPath: 'user/updateParent',
      parentId: '',
      parentNickname: '',
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

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const { userId, nickname, parentId, parentNickname } = metaData;

    if (checkStringIsNullOrWhiteSpace(nickname)) {
      metaData.nickname = replaceWithKeep(toString(userId), '***', 2, 6);
    }

    if (
      toString(parentId) !== zeroString &&
      checkStringIsNullOrWhiteSpace(parentNickname)
    ) {
      metaData.parentNickname = replaceWithKeep(parentId, '***', 2, 6);
    }

    this.setState({ parentId, parentNickname });
  };

  doOtherAfterSubmitSuccess = ({
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
    const { metaData } = this.state;

    const parentId = getValueByKey({
      data: singleData,
      key: fieldData.parentId.name,
    });

    const parentNickname = getValueByKey({
      data: singleData,
      key: fieldData.parentNickname.name,
    });

    this.setState({
      metaData: {
        ...metaData,

        parentId,
        parentNickname,
      },
    });
  };

  supplementSubmitRequestParams = (o) => {
    const { parentId } = this.state;

    return {
      ...this.supplementRequestParams(o),
      parentId,
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { userId } = this.state;

    if (!checkStringIsNullOrWhiteSpace(userId)) {
      d[fieldData.userId.name] = userId;
    }

    return d;
  };

  clearParent = () => {
    const { metaData } = this.state;

    clearParentAction({
      target: this,
      handleData: metaData,
      successCallback: ({ target, remoteData }) => {
        const parentId = getValueByKey({
          data: remoteData,
          key: fieldData.parentId.name,
        });

        const parentNickname = getValueByKey({
          data: remoteData,
          key: fieldData.parentNickname.name,
        });

        target.setState({
          metaData: {
            ...metaData,

            parentId,
            parentNickname,
          },
          parentId,
          parentNickname,
        });
      },
    });
  };

  afterUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldData.userId.name,
    });

    const nickname = getValueByKey({
      data: d,
      key: fieldData.nickname.name,
      convert: (v) => {
        return checkStringIsNullOrWhiteSpace(v)
          ? replaceWithKeep(userId, '***', 2, 6)
          : v;
      },
    });

    this.setState({
      parentId: userId,
      parentNickname: nickname,
    });
  };

  afterUserClearSelect = () => {
    this.setState({
      parentId: '',
      parentNickname: '',
    });
  };

  establishCardCollectionConfig = () => {
    const { metaData, parentNickname } = this.state;

    const parentId = getValueByKey({
      data: metaData,
      key: fieldData.parentId.name,
      defaultValue: '0',
      convert: convertCollection.string,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '指定推荐人',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: this.checkInProgress(),
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.user.updateBasicInfo.permission,
                  ) ||
                  metaData == null ||
                  parentId === '0',
                icon: iconBuilder.disconnect(),
                text: '清除上级',
                danger: true,
                confirm: true,
                title: '即将清除上级，确定吗？',
                handleClick: () => {
                  this.clearParent();
                },
              },
              {
                buildType: cardConfig.extraBuildType.save,
                hidden: !checkHasAuthority(
                  accessWayCollection.user.updateBasicInfo.permission,
                ),
                text: '保存上级',
              },
            ],
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <UserSelectDrawerField
                  label={fieldData.parentNickname.label}
                  defaultValue={parentNickname || null}
                  helper={fieldData.parentNickname.helper}
                  afterSelectSuccess={(d) => {
                    this.afterUserSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterUserClearSelect();
                  }}
                />
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '自填推荐人信息',
          },

          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.customRefererName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.customRefererName.name,
              }),
            },
          ],
        },
      ],
    };
  };
}

export default ParentInfo;
