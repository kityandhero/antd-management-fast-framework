import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildInputItem } from '../../../../utils';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class WeChatMessageTemplateInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority = accessWayCollection.application.getConfigure.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.applicationTypeCollection.getConfigure,
      applicationId: null,
      targetFieldData: null,
      keyValueEditMode: keyValueEditModeCollection.string,
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { applicationId } = this.state;

    d.applicationId = applicationId;

    return d;
  };

  showUpdateKeyValueInfoModal = ({
    fieldData: targetFieldData,
    editMode = keyValueEditModeCollection.string,
  }) => {
    this.setState(
      {
        targetFieldData,
        keyValueEditMode: editMode,
      },
      () => {
        UpdateKeyValueInfoModal.open();
      },
    );
  };

  afterUpdateKeyValueInfoModalOk = () => {
    this.reloadData({});
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
      values[
        fieldData.weChatOfficialAccountArticleNotificationTemplateId.name
      ] = getValueByKey({
        data: metaData,
        key: fieldData.weChatOfficialAccountArticleNotificationTemplateId.name,
      });

      values[fieldData.weChatMiniProgramArticleNotificationPagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatMiniProgramArticleNotificationPagePath.name,
        });

      values[fieldData.weChatOfficialArticleNotificationPagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatOfficialArticleNotificationPagePath.name,
        });

      values[fieldData.articleNotificationTitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationTitle.name,
      });

      values[fieldData.articleNotificationFirstParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationFirstParam.name,
      });

      values[fieldData.articleNotificationSecondParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationSecondParam.name,
      });

      values[fieldData.articleNotificationThirdParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationThirdParam.name,
      });

      values[fieldData.articleNotificationFourthParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationFourthParam.name,
      });

      values[fieldData.articleNotificationFifthParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationFifthParam.name,
      });

      values[fieldData.articleNotificationRemark.name] = getValueByKey({
        data: metaData,
        key: fieldData.articleNotificationRemark.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '提醒消息设置',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '消息模板设置',
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.weChatOfficialAccountArticleNotificationTemplateId,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.weChatMiniProgramArticleNotificationPagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.weChatOfficialArticleNotificationPagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '提醒设置',
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationTitle,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationFirstParam,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationSecondParam,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationThirdParam,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationFourthParam,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationFifthParam,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationRemark,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.articleNotificationRemark,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '设置文章推送相关配置。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
        <UpdateKeyValueInfoModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterOK={() => {
            this.afterUpdateKeyValueInfoModalOk();
          }}
        />
      </>
    );
  };
}

export default WeChatMessageTemplateInfo;
