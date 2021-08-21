import { isFunction, showRuntimeError } from 'antd-management-fast-framework/lib/utils/tools';

export function handleItem({ target, dataId, compareDataIdHandler, handler }) {
  const { metaOriginalData } = target.state;
  let indexData = -1;

  if (!isFunction(compareDataIdHandler)) {
    showRuntimeError(`compareDataIdHandler mast be function`);

    return;
  }

  if (!isFunction(handler)) {
    showRuntimeError(`handler mast be function`);

    return;
  }

  metaOriginalData.list.forEach((o, index) => {
    const compareDataId = compareDataIdHandler(o);

    if (compareDataId === dataId) {
      indexData = index;
    }
  });

  if (indexData >= 0) {
    metaOriginalData.list[indexData] = handler(metaOriginalData.list[indexData]);

    target.setState({ metaOriginalData });
  }
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
