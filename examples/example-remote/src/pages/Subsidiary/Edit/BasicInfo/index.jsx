import { connect } from 'easy-soft-dva';
import { formatCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { SubsidiarySelectDrawerField } from '../../SelectDrawerField';
import { TabPageBase } from '../../TabPageBase';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.subsidiary.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'subsidiary/get',
      submitApiPath: 'subsidiary/updateBasicInfo',
      subsidiaryId: null,
      logo: '',
      parentId: '',
      parentShortName: '',
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
    const d = { ...o };

    const { subsidiaryId, logo, parentId } = this.state;

    d[fieldData.subsidiaryId.name] = subsidiaryId;
    d[fieldData.logo.name] = logo;
    d[fieldData.parentId.name] = parentId;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ logo: image });
  };

  afterSubsidiarySelect = (d) => {
    const subsidiaryId = getValueByKey({
      data: d,
      key: fieldData.subsidiaryId.name,
    });

    const shortName = getValueByKey({
      data: d,
      key: fieldData.shortName.name,
    });

    this.setState({
      parentId: subsidiaryId,
      parentShortName: shortName,
    });
  };

  afterSubsidiaryClearSelect = () => {
    this.setState({
      parentId: '',
      parentShortName: '',
    });
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
    const logo = getValueByKey({
      data: metaData,
      key: fieldData.logo.name,
    });

    const parentId = getValueByKey({
      data: metaData,
      key: fieldData.parentId.name,
    });

    const parentShortName = getValueByKey({
      data: metaData,
      key: fieldData.parentShortName.name,
    });

    this.setState({ logo, parentId, parentShortName });
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
      values[fieldData.shortName.name] = getValueByKey({
        data: metaData,
        key: fieldData.shortName.name,
      });

      values[fieldData.fullName.name] = getValueByKey({
        data: metaData,
        key: fieldData.fullName.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.code.name] = getValueByKey({
        data: metaData,
        key: fieldData.code.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, logo, parentShortName } = this.state;

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
              fieldData: fieldData.shortName,
              require: true,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.fullName,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.code,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <SubsidiarySelectDrawerField
                  label={fieldData.parentShortName.label}
                  defaultValue={parentShortName || null}
                  helper={fieldData.parentShortName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterSubsidiarySelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterSubsidiaryClearSelect();
                  }}
                />
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: 'Logo上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: logo,
              action: `/subsidiary/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
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
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '操作信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateTime.name,
                    format: formatCollection.datetime,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 4,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '80px',
                },
              },
            },
          ],
        },
      ],
    };
  };
}

export default BasicInfo;
