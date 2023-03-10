import { getDispatch } from 'easy-soft-dva';

import { schedulingControlAssist } from 'antd-management-fast-framework';

// export function changeTestValue() {
//   schedulingControlAssist.startRemoteLoading();
// }

export function changeTestValue() {
  schedulingControlAssist.startRemoteLoading();

  setTimeout(() => {
    const dispatch = getDispatch;
    console.log(1_111_111);
    dispatch({
      type: 'testModel/changeValue',
    });
  }, 400);
}
