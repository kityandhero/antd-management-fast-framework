import { dispatchModel } from 'easy-soft-dva';

import { schedulingControlAssist } from 'antd-management-fast-framework';

// export function changeTestValue() {
//   schedulingControlAssist.startRemoteLoading();
// }

export function changeTestValue() {
  schedulingControlAssist.startRemoteLoading();

  setTimeout(() => {
    dispatchModel({
      model: 'testModel',
      effect: 'changeValue',
    });
  }, 800);
}
