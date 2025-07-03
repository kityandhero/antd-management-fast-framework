import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { CenterBox } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData, fieldDataDefaultImage } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'b3d27e3e2d0e4ae1a7f642ca8d878a55';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class UpdateDefaultImageModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置键值信息',
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
      submitApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection
          .updateKeyValueInfo,
      image: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const { image } = this.state;
    const d = this.supplementRequestParams(o);

    d.value = image;

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d.tag = getValueByKey({
      data: externalData,
      key: fieldDataDefaultImage.tag.name,
      defaultValue: '',
    });

    return d;
  }

  buildFormLayout = () => {
    return 'vertical';
  };

  buildTitleSubTextPrefix = () => {
    return '当前应用';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
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
    const { externalData } = this.props;

    const values = {};

    if (externalData != null) {
      values.value = getValueByKey({
        data: externalData,
        key: fieldDataDefaultImage.value.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { externalData } = this.props;
    const { image } = this.state;

    const title = getValueByKey({
      data: externalData,
      key: fieldDataDefaultImage.title.name,
    });

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ marginBottom: '14px' }}>
                  <CenterBox>
                    <span style={{ fontSize: '16px' }}>{title}</span>
                  </CenterBox>
                </div>
              ),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              fieldData: {
                label: getValueByKey({
                  data: externalData,
                  key: fieldDataDefaultImage.title.name,
                }),
                name: fieldDataDefaultImage.value.name,
                helper: '',
              },
              image,
              uploadProps: {
                singleMode: {
                  width: '100%',
                  emptyImage: '',
                },
              },
              action: `/currentManagementInfrastructure/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
      ],
    };
  };
}

export { UpdateDefaultImageModal };
