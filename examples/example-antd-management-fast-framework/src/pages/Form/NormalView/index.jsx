import { connect } from 'easy-soft-dva';
import {
  formatCollection,
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
  showSimpleInfoNotification,
} from 'easy-soft-utility';

import { cardConfig, listViewConfig } from 'antd-management-fast-common';
import {
  buildButton,
  buildColorText,
  convertOptionOrRadioData,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeFormView } from './codeSource';

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

const treeListData = [
  {
    key: '1701146354262347776',
    name: '测试部门001',
    code: '1701146354262347776',
    data: {
      parentId: 0,
      name: '测试部门001',
      description: '',
      ownershipMode: 200,
      subsidiaryId: '1701146211534376960',
      sort: 10,
      departmentId: '1701146354262347776',
      channel: 0,
      status: 100,
      createOperatorId: '1683472879502626816',
      createTime: '2023-09-11 16:11:11',
      updateOperatorId: '1701146521682186240',
      updateTime: '2023-11-06 10:16:37',
      ownershipModeNote: '子公司专属',
      statusNote: '正常',
      parentName: '',
      subsidiaryShortName: '开发测试用公司',
    },
    hasChild: 1,
    children: [
      {
        key: '1721353439486808064',
        name: '测试子部门0001',
        code: '1721353439486808064',
        data: {
          parentId: '1701146354262347776',
          name: '测试子部门0001',
          description: '',
          ownershipMode: 200,
          subsidiaryId: '1701146211534376960',
          sort: 0,
          departmentId: '1721353439486808064',
          channel: 0,
          status: 100,
          createOperatorId: '1701146521682186240',
          createTime: '2023-11-06 10:26:55',
          updateOperatorId: '1701146521682186240',
          updateTime: '2023-11-06 10:26:55',
          ownershipModeNote: '子公司专属',
          statusNote: '正常',
          parentName: '测试部门001',
          subsidiaryShortName: '开发测试用公司',
        },
        hasChild: 1,
        children: [
          {
            key: '1721353646165331968',
            name: '测试子子部门00001',
            code: '1721353646165331968',
            data: {
              parentId: '1721353439486808064',
              name: '测试子子部门00001',
              description: '',
              ownershipMode: 200,
              subsidiaryId: '1701146211534376960',
              sort: 0,
              departmentId: '1721353646165331968',
              channel: 0,
              status: 100,
              createOperatorId: '1701146521682186240',
              createTime: '2023-11-06 10:27:45',
              updateOperatorId: '1701146521682186240',
              updateTime: '2023-11-06 10:27:45',
              ownershipModeNote: '子公司专属',
              statusNote: '正常',
              parentName: '测试子部门0001',
              subsidiaryShortName: '开发测试用公司',
            },
            hasChild: 0,
            children: [],
            value: {
              name: '测试子子部门00001',
              level: 2,
            },
          },
          {
            key: '1721353763484209152',
            name: '测试子子部门00002',
            code: '1721353763484209152',
            data: {
              parentId: '1721353439486808064',
              name: '测试子子部门00002',
              description: '',
              ownershipMode: 200,
              subsidiaryId: '1701146211534376960',
              sort: 0,
              departmentId: '1721353763484209152',
              channel: 0,
              status: 100,
              createOperatorId: '1701146521682186240',
              createTime: '2023-11-06 10:28:13',
              updateOperatorId: '1701146521682186240',
              updateTime: '2023-11-06 10:28:13',
              ownershipModeNote: '子公司专属',
              statusNote: '正常',
              parentName: '测试子部门0001',
              subsidiaryShortName: '开发测试用公司',
            },
            hasChild: 0,
            children: [],
            value: {
              name: '测试子子部门00002',
              level: 2,
            },
          },
        ],
        value: {
          name: '测试子部门0001',
          level: 1,
        },
      },
      {
        key: '1721353545132937216',
        name: '测试子部门0002',
        code: '1721353545132937216',
        data: {
          parentId: '1701146354262347776',
          name: '测试子部门0002',
          description: '',
          ownershipMode: 200,
          subsidiaryId: '1701146211534376960',
          sort: 0,
          departmentId: '1721353545132937216',
          channel: 0,
          status: 100,
          createOperatorId: '1701146521682186240',
          createTime: '2023-11-06 10:27:21',
          updateOperatorId: '1701146521682186240',
          updateTime: '2023-11-06 10:27:21',
          ownershipModeNote: '子公司专属',
          statusNote: '正常',
          parentName: '测试部门001',
          subsidiaryShortName: '开发测试用公司',
        },
        hasChild: 0,
        children: [],
        value: {
          name: '测试子部门0002',
          level: 1,
        },
      },
    ],
    value: {
      name: '测试部门001',
      level: 0,
    },
  },
  {
    key: '1721352774047895552',
    name: '测试部门003',
    code: '1721352774047895552',
    data: {
      parentId: 0,
      name: '测试部门003',
      description: '',
      ownershipMode: 200,
      subsidiaryId: '1701146211534376960',
      sort: 0,
      departmentId: '1721352774047895552',
      channel: 0,
      status: 100,
      createOperatorId: '1701146521682186240',
      createTime: '2023-11-06 10:24:17',
      updateOperatorId: '1701146521682186240',
      updateTime: '2023-11-06 10:24:17',
      ownershipModeNote: '子公司专属',
      statusNote: '正常',
      parentName: '',
      subsidiaryShortName: '开发测试用公司',
    },
    hasChild: 1,
    children: [
      {
        key: '1721353875199496192',
        name: '测试部门003子部门0001',
        code: '1721353875199496192',
        data: {
          parentId: '1721352774047895552',
          name: '测试部门003子部门0001',
          description: '',
          ownershipMode: 200,
          subsidiaryId: '1701146211534376960',
          sort: 0,
          departmentId: '1721353875199496192',
          channel: 0,
          status: 100,
          createOperatorId: '1701146521682186240',
          createTime: '2023-11-06 10:28:39',
          updateOperatorId: '1701146521682186240',
          updateTime: '2023-11-06 10:28:39',
          ownershipModeNote: '子公司专属',
          statusNote: '正常',
          parentName: '测试部门003',
          subsidiaryShortName: '开发测试用公司',
        },
        hasChild: 0,
        children: [],
        value: {
          name: '测试部门003子部门0001',
          level: 1,
        },
      },
    ],
    value: {
      name: '测试部门003',
      level: 0,
    },
  },
  {
    key: '1721352880704851968',
    name: '测试部门004',
    code: '1721352880704851968',
    data: {
      parentId: 0,
      name: '测试部门004',
      description: '',
      ownershipMode: 200,
      subsidiaryId: '1701146211534376960',
      sort: 0,
      departmentId: '1721352880704851968',
      channel: 0,
      status: 100,
      createOperatorId: '1701146521682186240',
      createTime: '2023-11-06 10:24:42',
      updateOperatorId: '1701146521682186240',
      updateTime: '2023-11-06 10:24:42',
      ownershipModeNote: '子公司专属',
      statusNote: '正常',
      parentName: '',
      subsidiaryShortName: '开发测试用公司',
    },
    hasChild: 0,
    children: [],
    value: {
      name: '测试部门004',
      level: 0,
    },
  },
  {
    key: '1721353218769948672',
    name: '测试部门005',
    code: '1721353218769948672',
    data: {
      parentId: 0,
      name: '测试部门005',
      description: '',
      ownershipMode: 200,
      subsidiaryId: '1701146211534376960',
      sort: 0,
      departmentId: '1721353218769948672',
      channel: 0,
      status: 100,
      createOperatorId: '1701146521682186240',
      createTime: '2023-11-06 10:26:03',
      updateOperatorId: '1701146521682186240',
      updateTime: '2023-11-06 10:26:03',
      ownershipModeNote: '子公司专属',
      statusNote: '正常',
      parentName: '',
      subsidiaryShortName: '开发测试用公司',
    },
    hasChild: 1,
    children: [
      {
        key: '1721354016107139072',
        name: '测试部门005子部门00001',
        code: '1721354016107139072',
        data: {
          parentId: '1721353218769948672',
          name: '测试部门005子部门00001',
          description: '',
          ownershipMode: 200,
          subsidiaryId: '1701146211534376960',
          sort: 0,
          departmentId: '1721354016107139072',
          channel: 0,
          status: 100,
          createOperatorId: '1701146521682186240',
          createTime: '2023-11-06 10:29:13',
          updateOperatorId: '1701146521682186240',
          updateTime: '2023-11-06 10:29:13',
          ownershipModeNote: '子公司专属',
          statusNote: '正常',
          parentName: '测试部门005',
          subsidiaryShortName: '开发测试用公司',
        },
        hasChild: 0,
        children: [],
        value: {
          name: '测试部门005子部门00001',
          level: 1,
        },
      },
    ],
    value: {
      name: '测试部门005',
      level: 0,
    },
  },
];

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class NormalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Form 交互示例',
      currentCodeTitle: 'FormView',
      currentCode: codeFormView,
    };
  }

  establishPageHeaderSubTitle = () => '复杂的组件展示';

  establishPageHeaderTagCollectionConfig = () => {
    return [
      {
        color: 'red',
        text: '标签1',
      },
      {
        color: 'green',
        text: '标签2',
        hidden: true,
      },
    ];
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[fieldData.author.name] = '张三';

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, currentCode, currentCodeTitle, parentId } = this.state;

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
                buildType:
                  listViewConfig.dataContainerExtraActionBuildType
                    .generalButton,
                // type: 'primary',
                icon: iconBuilder.plus(),
                text: '发起流程审批',
                style: {
                  backgroundColor: '#52C41A',
                  color: '#fff',
                },
                confirm: true,
                title: '这里是提示',
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
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '分隔线',
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
              listData: treeListData,
              dataConvert: (o) => {
                const { name: title, code: value, children } = o;

                return {
                  title,
                  value,
                  children: children || [],
                };
              },
              onChange: ({
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
              text: (
                <IconInfo
                  icon={iconBuilder.edit()}
                  text="分隔线"
                  ellipsis={false}
                />
              ),
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: false,
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
            text: '通用前后附加组件',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: false,
              addonBefore: buildButton({
                text: '',
                icon: iconBuilder.edit(),
                handleClick: () => {
                  showSimpleInfoNotification('click button');
                },
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: false,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  showSimpleInfoNotification('click refresh button');
                },
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: false,
              addonBefore: buildButton({
                text: '',
                icon: iconBuilder.edit(),
                handleClick: () => {
                  showSimpleInfoNotification('click button');
                },
              }),
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  showSimpleInfoNotification('click refresh button');
                },
              }),
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
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
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
                defaultValue: 'FormView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'FormView',
                    name: 'FormView',
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

                    case 'FormView': {
                      code = codeFormView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(`当前显示 ${v} 源代码`);
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
      ],
    };
  };

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default NormalView;
