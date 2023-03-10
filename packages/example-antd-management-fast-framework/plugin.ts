import { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.addEntryImports(() => ({
    source: '../utils/init',
    specifier: '{ initializeDvaApplication }',
  }));

  api.addEntryCodeAhead(() => `initializeDvaApplication()`);
};
