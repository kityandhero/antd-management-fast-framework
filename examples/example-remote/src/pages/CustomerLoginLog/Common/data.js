import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  customerLoginLogId: {
    label: '数据标识',
    name: 'customerLoginLogId',
    helper: '',
  },
  customerId: {
    label: '顾客标识',
    name: 'customerId',
    helper: '',
  },
  account: {
    label: '登录账户',
    name: 'account',
    helper: '',
  },
  ip: {
    label: '登录IP',
    name: 'ip',
    helper: '',
  },
  location: {
    label: '登录位置',
    name: 'location',
    helper: '',
  },
  ...fieldExtraData,
};
