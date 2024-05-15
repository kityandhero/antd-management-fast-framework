import { dispatchModel } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { testModelLoadingFlag } from '../../../customConfig';

export function changeSimpleValue() {
  dispatchModel({
    model: 'testModel',
    effect: 'changeSimpleValue',
  });
}

export function changeSimpleValueWithLoading() {
  switchControlAssist.open(testModelLoadingFlag);

  setTimeout(() => {
    dispatchModel({
      model: 'testModel',
      effect: 'changeSimpleValueWithLoading',
    });
  }, 1200);
}
