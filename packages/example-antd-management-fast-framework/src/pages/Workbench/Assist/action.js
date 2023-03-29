import { dispatchModel } from 'easy-soft-dva';

import { remoteLoadingControlAssist } from 'antd-management-fast-framework';

export function changeSimpleValue() {
  dispatchModel({
    model: 'testModel',
    effect: 'changeSimpleValue',
  });
}

export function changeSimpleValueWithLoading() {
  remoteLoadingControlAssist.startRemoteLoading();

  setTimeout(() => {
    dispatchModel({
      model: 'testModel',
      effect: 'changeSimpleValueWithLoading',
    });
  }, 1200);
}
