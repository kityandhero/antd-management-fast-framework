import { connect } from 'easy-soft-dva';
import {
  getValueByKey,
  toString,
  whetherNumber,
  zeroInt,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { singleTreeListAction as categorySingleTreeListAction } from '../../CallCenterCategory/Assist/action';
import { fieldData } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ callCenter, schedulingControl }) => ({
  callCenter,
  schedulingControl,
}))
class AddBasicInfo extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '新增展示图',
      submitApiPath: 'callCenter/addBasicInfo',
      categoryTreeData: [],
      categoryId: '',
    };
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

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { categoryId } = this.state;

    d[fieldData.categoryId.name] = categoryId;

    return d;
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
    const callCenterId = getValueByKey({
      data: singleData,
      key: fieldData.callCenterId.name,
    });

    this.goToPath(
      `/assistTools/callCenter/edit/load/${callCenterId}/1/basicInfo`,
    );
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.sort.name] = zeroInt;

    return initialValues;
  };

  establishCardCollectionConfig = () => {
    const { categoryId, categoryTreeData } = this.state;

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
              value: categoryId,
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
