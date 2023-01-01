import {
  handleCommonDataAssist,
  handleListDataAssist,
  handlePageListDataAssist,
} from '../requestAssistor';

export const reducerCommonNameCollection = {
  handleCommonData: 'handleCommonData',
  handleListData: 'handleListData',
  handlePageListData: 'handlePageListData',
};

export const reducerCommonCollection = {
  handleCommonData(state, action) {
    return handleCommonDataAssist(state, action);
  },
  handleListData(state, action) {
    return handleListDataAssist(state, action);
  },
  handlePageListData(state, action) {
    return handlePageListDataAssist(state, action);
  },
};

/**
 * 初始化state
 */
export const tacitlyState = {
  data: {
    code: 0,
    message: 'tacitly state scene',
    dataSuccess: false,
    data: {},
    list: [],
    extra: {},
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
