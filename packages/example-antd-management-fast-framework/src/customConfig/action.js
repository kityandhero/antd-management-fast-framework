import {
  isFunction,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
} from 'easy-soft-utility';

export function handleItem({ target, dataId, compareDataIdHandler, handler }) {
  const { metaOriginalData } = target.state;
  let indexData = -1;

  if (!isFunction(compareDataIdHandler)) {
    const text = `compareDataIdHandler mast be function`;

    showSimpleRuntimeError(text);

    return;
  }

  if (!isFunction(handler)) {
    const text = `handler mast be function`;

    showSimpleErrorMessage(text);

    return;
  }

  for (const [index, o] of metaOriginalData.list.entries()) {
    const compareDataId = compareDataIdHandler(o);

    if (compareDataId === dataId) {
      indexData = index;
    }
  }

  if (indexData >= 0) {
    metaOriginalData.list[indexData] = handler(
      metaOriginalData.list[indexData],
    );

    target.setState({ metaOriginalData });
  }
}
