import {
  isFunction,
  showError,
} from 'antd-management-fast-common/es/utils/tools';

export function handleItem({ target, dataId, compareDataIdHandler, handler }) {
  const { metaOriginalData } = target.state;
  let indexData = -1;

  if (!isFunction(compareDataIdHandler)) {
    const text = `compareDataIdHandler mast be function`;

    showRuntimeError({
      message: text,
    });

    return;
  }

  if (!isFunction(handler)) {
    const text = `handler mast be function`;

    showError(text);

    return;
  }

  metaOriginalData.list.forEach((o, index) => {
    const compareDataId = compareDataIdHandler(o);

    if (compareDataId === dataId) {
      indexData = index;
    }
  });

  if (indexData >= 0) {
    metaOriginalData.list[indexData] = handler(
      metaOriginalData.list[indexData],
    );

    target.setState({ metaOriginalData });
  }
}
