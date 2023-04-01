import { dispatchModel } from 'easy-soft-dva';

import { loadingControlAssist } from 'antd-management-fast-framework';

import { testModelLoadingFlag } from '../../../customConfig';

export function changeSimpleValue() {
  dispatchModel({
    model: 'testModel',
    effect: 'changeSimpleValue',
  });
}

export function changeSimpleValueWithLoading() {
  loadingControlAssist.startLoading(testModelLoadingFlag);

  setTimeout(() => {
    dispatchModel({
      model: 'testModel',
      effect: 'changeSimpleValueWithLoading',
    });
  }, 1200);
}
