import { getDvaApp } from '@umijs/max';

export function getModel(name) {
  const app = getDvaApp();

  const models = app._models;

  const list = models.filter((o) => o.namespace === name);

  if (list.length > 0) {
    return list[0];
  }

  throw new Error(
    `${name} not in dva models, current models is ${models
      .map((o) => o.namespace)
      .join(',')}`,
  );
}

export function getDispatch() {
  const app = getDvaApp();

  return app._store.dispatch;
}

export function getStore() {
  const app = getDvaApp();

  return app._store;
}

export function getModelRemoteData(name) {
  const m = getModel(name);

  const { data } = {
    data: {},
    ...m.state,
  };

  return data || {};
}

export function getModelState(name) {
  // logExecute(`getModelState(${name})`);

  const m = getModel(name);

  return m.state;
}

export function getModelNameList() {
  const app = getDvaApp();

  const models = app._models;

  return models.map((o) => o.namespace);
}
