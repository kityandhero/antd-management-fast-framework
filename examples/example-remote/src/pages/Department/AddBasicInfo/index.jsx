import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormDepartmentOwnershipModeSelect,
} from '../../../customSpecialComponents';
import { fieldData as fieldDataSubsidiary } from '../../Subsidiary/Common/data';
import { SubsidiarySelectDrawerField } from '../../Subsidiary/SelectDrawerField';
import { fieldData } from '../Common/data';
import { DepartmentSelectField } from '../SelectField';

const { BaseAddForm } = DataForm;

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class AddBasicInfo extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '新增部门',
      submitApiPath: 'department/addBasicInfo',
      parentId: '',
      parentName: '',
      subsidiaryId: '',
      subsidiaryShortName: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { parentId, subsidiaryId } = this.state;

    d[fieldData.parentId.name] = parentId;
    d[fieldData.subsidiaryId.name] = subsidiaryId;

    return d;
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

  doAfterSubmitSuccess = ({
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
    const departmentId = getValueByKey({
      data: singleData,
      key: fieldData.departmentId.name,
    });

    this.goToPath(
      `/organization/department/edit/load/${departmentId}/1/basicInfo`,
    );
  };

  establishCardCollectionConfig = () => {
    const { parentName, subsidiaryShortName } = this.state;

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
              type: cardConfig.contentItemType.customSelect,
              component: renderFormDepartmentOwnershipModeSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: (
                <DepartmentSelectField
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
              type: cardConfig.contentItemType.component,
              component: (
                <SubsidiarySelectDrawerField
                  label={fieldData.subsidiaryShortName.label}
                  defaultValue={subsidiaryShortName || null}
                  helper={fieldData.subsidiaryShortName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterSubsidiarySelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterSubsidiaryClearSelect();
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
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default AddBasicInfo;
