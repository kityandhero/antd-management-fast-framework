import { IApi } from '@umijs/max';

function buildPlugin(api: IApi) {
  api.addEntryImports(() => ({
    source: '../utils',
    specifier: '{ initializeDvaApplication }',
  }));

  api.addEntryCodeAhead(() => `initializeDvaApplication()`);
}

export default buildPlugin;
