import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  buildUpdateTimeAndOperatorFieldItem,
  getDepartmentOwnershipModeName,
} from '../../../../customSpecialComponents';
import { fieldData as fieldDataSubsidiary } from '../../../Subsidiary/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData, ownershipModeCollection } from '../../Common/data';
import { DepartmentSelectField } from '../../SelectField';
import { TabPageBase } from '../../TabPageBase';

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.department.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'department/get',
      submitApiPath: 'department/updateBasicInfo',
      departmentId: null,
      logo: '',
      parentId: '',
      parentName: '',
      subsidiaryId: '',
      subsidiaryShortName: '',
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
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const parentId = getValueByKey({
      data: metaData,
      key: fieldData.parentId.name,
    });

    const parentName = getValueByKey({
      data: metaData,
      key: fieldData.parentName.name,
    });

    const subsidiaryId = getValueByKey({
      data: metaData,
      key: fieldData.subsidiaryId.name,
    });

    const subsidiaryShortName = getValueByKey({
      data: metaData,
      key: fieldData.subsidiaryShortName.name,
    });

    this.setState({ parentId, parentName, subsidiaryId, subsidiaryShortName });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { departmentId, parentId, subsidiaryId } = this.state;

    d[fieldData.departmentId.name] = departmentId;
    d[fieldData.parentId.name] = parentId;
    d[fieldData.subsidiaryId.name] = subsidiaryId;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ logo: image });
  };

  afterDepartmentSelect = (d) => {
    const departmentId = getValueByKey({
      data: d,
      key: fieldData.departmentId.name,
    });

    const name = getValueByKey({
      data: d,
      key: fieldData.name.name,
    });

    this.setState({
      parentId: departmentId,
      parentName: name,
    });
  };

  afterDepartmentClearSelect = () => {
    this.setState({
      parentId: '',
      parentName: '',
    });
  };

  afterSubsidiarySelect = (d) => {
    const subsidiaryId = getValueByKey({
      data: d,
      key: fieldDataSubsidiary.subsidiaryId.name,
    });

    const shortName = getValueByKey({
      data: d,
      key: fieldDataSubsidiary.shortName.name,
    });

    this.setState({
      subsidiaryId: subsidiaryId,
      subsidiaryShortName: shortName,
    });
  };

  afterSubsidiaryClearSelect = () => {
    this.setState({
      subsidiaryId: '',
      subsidiaryShortName: '',
    });
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.ownershipMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.ownershipMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, parentName } = this.state;

    const ownershipMode = getValueByKey({
      data: metaData,
      key: fieldData.ownershipMode.name,
      convert: convertCollection.number,
    });

    const searchParameters = {
      ownershipMode,
    };

    if (ownershipMode === ownershipModeCollection.subsidiaryLevel) {
      const subsidiaryId = getValueByKey({
        data: metaData,
        key: fieldData.subsidiaryId.name,
      });

      searchParameters.subsidiaryId = subsidiaryId;
    }

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
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.ownershipMode,
              value: getDepartmentOwnershipModeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.ownershipMode.name,
                }),
              }),
            },
            {
              lg:
                ownershipMode === ownershipModeCollection.subsidiaryLevel
                  ? 12
                  : 18,
              type: cardConfig.contentItemType.component,
              component: (
                <DepartmentSelectField
                  searchParams={searchParameters}
                  label={fieldData.parentName.label}
                  defaultValue={parentName || null}
                  helper={fieldData.parentName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterDepartmentSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterDepartmentClearSelect();
                  }}
                />
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.subsidiaryShortName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.subsidiaryShortName.name,
              }),
              hidden: ownershipMode !== ownershipModeCollection.subsidiaryLevel,
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
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export default BasicInfo;
