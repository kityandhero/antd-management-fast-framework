export const code = `import { Radio, Select } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  formatCollection,
  formatTarget,
  getValueByKey,
  logDebug,
  mergeArrowText,
  showInfoMessage,
  showSimpleInfoMessage,
  to,
} from 'easy-soft-utility';

import { cardConfig, getCorsDomain } from 'antd-management-fast-common';
import {
  buildButton,
  buildColorText,
  buildCustomGrid,
  ColorText,
  convertOptionOrRadioData,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  renderCustomSimpleStatusRadio,
  renderCustomSimpleStatusSelect,
} from '../../../customSpecialComponents';
import BaseView from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';
import { fieldData } from '../Common/data';

import { code as codeAnimalView } from './codeSource';

const optionList = [
  {
    flag: '1',
    name: '选项1',
    description: '描述1',
  },
  {
    flag: '2',
    name: '选项2',
    description: '描述3',
  },
  {
    flag: '3',
    name: '选项3',
    disabled: true,
    description: '描述3',
  },
];

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class FormView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Animal 交互示例',
      currentCodeTitle: 'AnimalView',
      currentCode: codeAnimalView,
      attachmentBase64: '',
      image: '',
      rectangleImage: '',
    };
  }

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: buildButton({
            text: '按钮1',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: buildButton({
            text: '按钮4',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            confirm: true,
            placement: 'topRight',
            title: '将要进行操作，确定吗？',
            okText: '确定',
            cancelText: '取消',
          }),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const {
      metaData,
      currentCode,
      currentCodeTitle,
      image,
      rectangleImage,
      video,
      audio,
      attachment,
      attachmentBase64,
      imageList,
      fileList,
      initContent,
      listTreeData,
      parentId,
    } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '基本信息',
            subText: buildColorText({
              textPrefix: '文本前缀',
              text: '附属文本',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>【{c}】</>;
              },
            }),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '一些说明',
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomSimpleStatusRadio({}),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomSimpleStatusSelect({}),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: '一般按钮',
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: true,
                icon: iconBuilder.form(),
                text: '隐藏按钮',
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
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.simpleId,
              value: getValueByKey({
                data: metaData,
                key: fieldData.simpleId.name,
              }),
              canCopy: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.datePicker,
              fieldData: fieldData.datePicker,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.timePicker,
              fieldData: fieldData.timePicker,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.parentId,
              value: parentId,
              require: true,
              listData: listTreeData,
              dataConvert: (o) => {
                const { label, code: value, children } = o;

                return {
                  title: label,
                  value,
                  children: children || [],
                };
              },
              onChangeCallback: ({
                value,
                // eslint-disable-next-line no-unused-vars
                label,
                // eslint-disable-next-line no-unused-vars
                extra,
                treeData,
                // eslint-disable-next-line no-unused-vars
                listData,
              }) => {
                console.log(treeData);

                this.setState({
                  parentId: value,
                });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '分隔线',
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio1,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v, event) => {
                logDebug(event, \`selectValue -> \${v}\`);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio4,
              listData: optionList,
              dataConvert: (o, index) => {
                const { flag, name } = o;

                return {
                  label: name,
                  value: flag,
                  disabled: false,
                  alias: \`alias\${index}\`,
                  ...o,
                };
              },
              renderItem: (item, index) => {
                const { label, value, disabled = false } = item;

                return (
                  <Radio
                    key={\`radio_\${index}\`}
                    value={value}
                    disabled={disabled}
                  >
                    <ColorText
                      text={label}
                      color={buildRandomHexColor({ seed: index * 10 })}
                    />
                  </Radio>
                );
              },
              onChange: (v) => {
                logDebug({ selectValue: v });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio2,
              button: true,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v) => {
                logDebug({ selectValue: v });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio3,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v) => {
                logDebug({ selectValue: v });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.select1,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v, option) => {
                logDebug(option, \`selectValue -> \${v}\`);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.select2,
              listData: optionList,
              dataConvert: dataConvert,
              renderItem: (item, index) => {
                const { label, value, disabled = false } = item;

                return (
                  <Select.Option
                    key={\`radio_\${index}\`}
                    value={value}
                    disabled={disabled}
                  >
                    <ColorText
                      text={label}
                      color={buildRandomHexColor({ seed: index * 10 })}
                    />
                  </Select.Option>
                );
              },
              onChange: (v, option) => {
                logDebug(option, \`selectValue -> \${v}\`);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.selectWhether,
              // listData: optionList,
              // dataConvert: dataConvert,
              // onChange: (v, option) => {
              //   logDebug(option, \`selectValue -> \${v}\`);
              // },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: (
                <IconInfo
                  icon={iconBuilder.edit()}
                  text="分隔线"
                  ellipsis={false}
                />
              ),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video,
              showPreview: true,
              action: \`\${getCorsDomain()}/simple/uploadVideo\`,
              afterChangeSuccess: (data) => {
                this.afterVideoChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: fieldData.audio,
              audio,
              showPreview: true,
              action: \`\${getCorsDomain()}/simple/uploadAudio\`,
              afterChangeSuccess: (data) => {
                this.afterAudioChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileBase64Upload,
              fieldData: fieldData.fileBase64,
              fileBase64: attachmentBase64,
              action: \`\${getCorsDomain()}/application/uploadFileBase64\`,
              afterUploadSuccess: (data) => {
                this.afterFileBase64UploadSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.file,
              file: attachment,
              action: \`\${getCorsDomain()}/application/uploadFile\`,
              afterUploadSuccess: (data) => {
                this.afterFileUploadSuccess(data);
              },
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存！]',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.picture(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: \`\${getCorsDomain()}/simple/uploadImage\`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存！]',
          },

          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.picture(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: \`\${getCorsDomain()}/simple/uploadImage\`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.picture(),
              title: fieldData.rectangleImage.label,
              helper: fieldData.rectangleImage.helper,
              image: rectangleImage,
              action: \`\${getCorsDomain()}/simple/uploadImage\`,
              afterUploadSuccess: (imageData) => {
                this.afterRectangleImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: '图片相册',
            subText:
              '[相册最大容量为8张图片，大小必须统一640*640（800*800），图片相册的添加和删除将自动保存，产品其他信息请在修改后点击保存按钮!]',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: !checkHasAuthority(
                  accessWayCollection.simple.updateImageSort.permission,
                ),
                text: '调整图片顺序',
                icon: iconBuilder.sortAscending(),
                handleClick: (event) => this.showChangeImageSortModal(event),
                disabled: this.checkInProgress(),
              },
            ],
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              action: \`\${getCorsDomain()}/simple/uploadImage\`,
              disabled: !checkHasAuthority(
                accessWayCollection.simple.addImage.permission,
              ),
              multiple: true,
              fileList,
              showUploadList: {
                showPreviewIcon: true,
                showDownloadIcon: true,
                showRemoveIcon: checkHasAuthority(
                  accessWayCollection.simple.removeImage.permission,
                ),
              },
              onItemChange: this.handleGalleryUploadChange,
              onItemRemove: this.onGalleryRemove,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '单配图纯展示',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageShow,
              image,
              imageBoxContainorStyle: {
                width: '120px',
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图集合纯展示',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageListShow,
              imageList,
            },
          ],
        },
        {
          title: {
            text: '自构建表格展示',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    label: fieldData.simpleId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.simpleId.name,
                    }),
                    canCopy: true,
                  },
                  {
                    span: 2,
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    label: fieldData.sort.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.sort.name,
                      convert: convertCollection.string,
                    }),
                  },
                  {
                    label: fieldData.subtitle.label,
                    value: '',
                    emptyValue: '空白值演示',
                  },
                  {
                    label: '百分比转换',
                    value: formatTarget({
                      target: 0.24,
                      format: formatCollection.percentage,
                    }),
                  },
                  {
                    label: '中文金额',
                    value: formatTarget({
                      target: 451.31,
                      format: formatCollection.chineseMoney,
                    }),
                  },
                  {
                    label: '日期格式化',
                    value: formatTarget({
                      target: new Date('2023-03-01 10:35:54'),
                      format: formatCollection.datetime,
                    }),
                  },
                  {
                    label: '金额格式化',
                    value: formatTarget({
                      target: 451.31,
                      format: formatCollection.money,
                    }),
                  },
                  {
                    label: '类型转换',
                    value: to({
                      target: 0.24,
                      convert: convertCollection.string,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 3,
                  emptyStyle: {
                    color: '#cccccc',
                  },
                  emptyValue: '待完善',
                  labelStyle: {
                    width: '140px',
                  },
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '内嵌表格展示',
          },

          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                title: '标题标题',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '140px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                title: '标题标题',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: false,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: false,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video: video,
              showPreview: true,
              action: \`\${getCorsDomain()}/simple/uploadVideo\`,
              afterChangeSuccess: (videoData) => {
                this.afterVideoChangeSuccess(videoData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: fieldData.audio,
              audio: audio,
              showPreview: true,
              action: \`\${getCorsDomain()}/simple/uploadAudio\`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.attachment,
              file: attachment,
              action: \`\${getCorsDomain()}/simple/uploadFile\`,
              afterChangeSuccess: (file) => {
                this.afterAttachmentChangeSuccess(file);
              },
            },
          ],
          instruction: [
            {
              title: '局部操作说明1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
            {
              title: '局部操作说明2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: fieldData.switch.label,
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.switch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: (v) => {
                  this.handleSwitchChange(v);
                },
              },
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.description.name,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '空白数据',
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: '',
            },
          ],
          instruction: [
            {
              title: '说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html数据展示, 空白将替换为Empty',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: 'syntaxHighlighter',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: fieldData.syntaxHighlighter,
              value: \`SELECT * FROM (SELECT row_number() over (ORDER BY [simple].[sort] DESC, [simple].[create_time] DESC) AS rowId, ISNULL([simple].[id],0) AS [SimpleId] FROM simple WHERE 1=1 AND [simple].[platform_id] = 1504634917793959936 AND [simple].[business_mode] = 400 AND [simple].[status] IN ('0','10') ) as t where rowId between 1 and 10\`,
              language: 'sql',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
          instruction: [
            {
              title: '说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html数据展示，空白将替换为Empty',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '富文本编辑',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tinymce,
              content: initContent,
              afterChange: this.afterHtmlChange,
            },
          ],
          instruction: [
            {
              title: '说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html数据展示，空白将替换为Empty',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '其他信息',
          },

          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.save,
              config: {
                text: '底部单行保存按钮',
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.button,
              config: {
                text: '底部一般单行按钮',
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.actionList,
              config: [
                {
                  buildType: cardConfig.extraBuildType.refresh,
                  text: '底部刷新按钮',
                },
                {
                  buildType: cardConfig.extraBuildType.save,
                  text: '底部保存按钮',
                },
                {
                  buildType: cardConfig.extraBuildType.generalButton,
                  text: '底部一般按钮',
                },
              ],
            },
          ],
        },

        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                label: '显示源代码',
                size: 'small',
                defaultValue: 'AnimalView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'AnimalView',
                    name: 'AnimalView',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'BaseView': {
                      code = codeBaseView;
                      break;
                    }

                    case 'AnimalView': {
                      code = codeAnimalView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(\`当前显示 \${v} 源代码\`);
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: currentCode,
              language: 'js',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
        },
      ],
    };
  };

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default FormView;
`;
