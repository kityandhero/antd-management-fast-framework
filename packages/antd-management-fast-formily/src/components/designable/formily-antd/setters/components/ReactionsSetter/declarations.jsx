import {
  getNpmCDNRegistry,
  MonacoInput,
} from 'antd-management-fast-design-react';

const loadDependencies = async (deps) => {
  return Promise.all(
    deps.map(async ({ name, path }) => ({
      name,
      path,
      library: await fetch(`${getNpmCDNRegistry()}/${name}/${path}`).then(
        (response) => response.text(),
      ),
    })),
  );
};

// eslint-disable-next-line unicorn/prefer-top-level-await
MonacoInput.loader?.init().then(async (monaco) => {
  const deps = await loadDependencies([
    {
      name: '@formily/core',
      path: 'dist/formily.core.all.d.ts',
    },
  ]);

  if (deps) {
    for (const { name, library } of deps) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare module '${name}'{ ${library} }`,
        `file:///node_modules/${name}/index.d.ts`,
      );
    }
  }

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
    import { Form, Field } from '@formily/core'
    declare global {
      /*
       * Form Model
       **/
      declare var $form: Form
      /*
       * Form Values
       **/
      declare var $values: any
      /*
       * Field Model
       **/
      declare var $self: Field
      /*
       * create an persistent observable state object
       **/
      declare var $observable: <T>(target: T, deps?: any[]) => T
      /*
       * create a persistent data
       **/
      declare var $memo: <T>(callback: () => T, deps?: any[]) => T
      /*
       * handle side-effect logic
       **/
      declare var $effect: (callback: () => void | (() => void), deps?: any[]) => void
      /*
       * set initial component props to current field
       **/
      declare var $props: (props: any) => void
    }
    `,
    `file:///node_modules/formily_global.d.ts`,
  );

  return;
});
