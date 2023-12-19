import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class Index extends TabPageBase {
  goToUpdateWhenProcessed = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'section/get',
      submitApiPath: 'section/setReadObtainScore',
      readArticleObtainScoreSwitch: 0,
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

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const readArticleObtainScoreSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.readArticleObtainScoreSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes
        ? whetherNumber.yes
        : whetherNumber.no;

    this.setState({ readArticleObtainScoreSwitch });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { sectionId, readArticleObtainScoreSwitch } = this.state;

    d.sectionId = sectionId;
    d.readArticleObtainScoreSwitch = readArticleObtainScoreSwitch;

    return d;
  };

  onGlobalExemptTransportationCostConditionSwitch = (v) => {
    this.setState({ readArticleObtainScoreSwitch: v ? 1 : 0 });
  };

  fillInitialValuesAfterLoad = ({
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
      values[fieldData.readArticleObtainScoreSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.readArticleObtainScoreSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;

      values[fieldData.obtainScoreWhenReadArticle.name] = getValueByKey({
        data: metaData,
        key: fieldData.obtainScoreWhenReadArticle.name,
      });

      values[fieldData.obtainFromReadArticleDailyLimit.name] = getValueByKey({
        data: metaData,
        key: fieldData.obtainFromReadArticleDailyLimit.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { readArticleObtainScoreSwitch } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '阅读时奖励积分开关',
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
                hidden: !checkHasAuthority(
                  accessWayCollection.section.setReadObtainScore.permission,
                ),
              },
            ],
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.readArticleObtainScoreSwitch,
              checked: readArticleObtainScoreSwitch === whetherNumber.yes,
              require: true,
              otherProps: {
                onChange: this.onGlobalExemptTransportationCostConditionSwitch,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '阅读时奖励积分设置',
          },

          hidden: readArticleObtainScoreSwitch === whetherNumber.no,
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.obtainScoreWhenReadArticle,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.obtainFromReadArticleDailyLimit,
              require: false,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
