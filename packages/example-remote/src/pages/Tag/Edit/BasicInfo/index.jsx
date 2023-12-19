import { ColorPicker } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
  throttle,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  getBusinessModeName,
  getTagDisplayRangeName,
  renderFormTagTypeSelect,
} from '../../../../customSpecialComponents';
import { updateColorAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.tag.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'tag/get',
      submitApiPath: 'tag/updateBasicInfo',
      tagId: null,
      image: '',
      color: '',
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
    const { tagId, image } = this.state;

    d[fieldData.tagId.name] = tagId;
    d[fieldData.image.name] = image;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
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
    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
    });

    const color = getValueByKey({
      data: metaData,
      key: fieldData.color.name,
    });

    this.setState({ image, color });
  };

  updateColor = throttle(() => {
    const { tagId, color } = this.state;

    updateColorAction({
      handleData: { tagId, color },
    });
  }, 800);

  changeColor = (color) => {
    this.setState({ color }, () => {
      this.updateColor();
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

      values[fieldData.displayName.name] = getValueByKey({
        data: metaData,
        key: fieldData.displayName.name,
      });

      values[fieldData.type.name] = getValueByKey({
        data: metaData,
        key: fieldData.type.name,
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
    const { firstLoadSuccess, metaData, image, color } = this.state;

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
                buildType: cardConfig.extraBuildType.component,
                component: (
                  <FlexBox
                    flexAuto="right"
                    left={<VerticalBox>色值：</VerticalBox>}
                    right={
                      <div
                        style={{
                          minWidth: '104px',
                        }}
                      >
                        <VerticalBox>
                          <ColorPicker
                            value={color}
                            showText
                            disabled={!firstLoadSuccess}
                            presets={[
                              {
                                label: '常用',
                                colors: [
                                  '#000000',
                                  '#000000E0',
                                  '#000000A6',
                                  '#00000073',
                                  '#00000040',
                                  '#00000026',
                                  '#0000001A',
                                  '#00000012',
                                  '#0000000A',
                                  '#00000005',
                                  '#F5222D',
                                  '#FA8C16',
                                  '#FADB14',
                                  '#8BBB11',
                                  '#52C41A',
                                  '#13A8A8',
                                  '#1677FF',
                                  '#2F54EB',
                                  '#722ED1',
                                  '#EB2F96',
                                  '#F5222D4D',
                                  '#FA8C164D',
                                  '#FADB144D',
                                  '#8BBB114D',
                                  '#52C41A4D',
                                  '#13A8A84D',
                                  '#1677FF4D',
                                  '#2F54EB4D',
                                  '#722ED14D',
                                  '#EB2F964D',
                                ],
                              },
                            ]}
                            onChange={(_, hex) => {
                              this.changeColor(hex);
                            }}
                          />
                        </VerticalBox>
                      </div>
                    }
                  />
                ),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
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
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.displayName,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormTagTypeSelect({}),
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '图片上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: image,
              action: `/tag/uploadImage`,
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
                  label: fieldData.displayName.label,
                  value: getTagDisplayRangeName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.displayName.name,
                      convert: convertCollection.number,
                    }),
                  }),
                },
                {
                  span: 1,
                  label: fieldData.businessMode.label,
                  value: getBusinessModeName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.businessMode.name,
                      convert: convertCollection.number,
                    }),
                  }),
                },
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
