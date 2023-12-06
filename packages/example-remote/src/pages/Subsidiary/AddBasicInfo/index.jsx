import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';
import { SubsidiarySelectDrawerField } from '../SelectDrawerField';

const { BaseAddForm } = DataForm;

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class AddBasicInfo extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '新增公司',
      submitApiPath: 'subsidiary/addBasicInfo',
      logo: '',
      parentId: '',
      parentShortName: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { logo, parentId } = this.state;

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
    const subsidiaryId = getValueByKey({
      data: singleData,
      key: fieldData.subsidiaryId.name,
    });

    this.goToPath(
      `/organization/subsidiary/edit/load/${subsidiaryId}/1/basicInfo`,
    );
  };

  establishCardCollectionConfig = () => {
    const { logo, parentShortName } = this.state;

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
          instruction: {
            title: '操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '如不填写公司全称，将自动使用简称补充',
              },
            ],
          },
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
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default AddBasicInfo;
