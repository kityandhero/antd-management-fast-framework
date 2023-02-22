import { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.addEntryImports(() => ({
    source: 'antd-management-fast-framework',
    specifier: '{configEnvironment}',
  }));

  api.addEntryCodeAhead(() => `configEnvironment()`);
};
