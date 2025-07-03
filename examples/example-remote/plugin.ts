import { IApi } from '@umijs/max';

function buildPlugin(api: IApi) {
  api.addEntryImports(() => ({
    source: '../utils',
    specifier: '{ initializeDvaApplication }',
  }));

  api.addEntryCodeAhead(() => `initializeDvaApplication()`);

  api.modifyHTML(($) => {
    $('body').addClass('antd-management-fast-html-body');

    return $;
  });
}

export default buildPlugin;
