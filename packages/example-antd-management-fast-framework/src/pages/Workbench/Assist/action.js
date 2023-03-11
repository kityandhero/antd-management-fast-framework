import { dispatchModel } from 'easy-soft-dva';

import { schedulingControlAssist } from 'antd-management-fast-framework';

export function changeSimpleValue() {
  dispatchModel({
    model: 'testModel',
    effect: 'changeSimpleValue',
  });
}

export function changeSimpleValueWithLoading() {
  schedulingControlAssist.startRemoteLoading();

  setTimeout(() => {
    dispatchModel({
      model: 'testModel',
      effect: 'changeSimpleValueWithLoading',
    });
  }, 1200);
}
