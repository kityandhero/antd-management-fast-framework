import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  subsidiaryShortName: {
    label: '归属公司',
    name: 'subsidiaryShortName',
    helper: '',
  },
  customerPhone: {
    label: '联系电话',
    name: 'customerPhone',
    helper: '',
  },
  customerNickname: {
    label: '人员昵称',
    name: 'customerNickname',
    helper: '',
  },
  customerRealName: {
    label: '人员姓名',
    name: 'customerRealName',
    helper: '',
  },
  customerFriendlyName: {
    label: '人员称呼',
    name: 'customerFriendlyName',
    helper: '',
  },
  whetherConfirmNote: {
    label: '是否核实',
    name: 'whetherConfirmNote',
    helper: '',
  },
  whetherReplyNote: {
    label: '是否回复',
    name: 'whetherReplyNote',
    helper: '',
  },
  listAttachment: {
    label: '附件列表',
    name: 'listAttachment',
    helper: '',
  },
};

export const fieldDataBaseSubsidiaryMessage = {
  ...formNameCollection,
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
    helper: '',
  },
  customerId: {
    label: '人员标识',
    name: 'customerId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  whetherConfirm: {
    label: '是否核实',
    name: 'whetherConfirm',
    helper: '',
  },
  whetherReply: {
    label: '是否回复',
    name: 'whetherReply',
    helper: '',
  },
  replyContent: {
    label: '回复内容',
    name: 'replyContent',
    helper: '',
  },
  replyTime: {
    label: '回复时间',
    name: 'replyTime',
    helper: '',
  },
  ...fieldExtraData,
};
