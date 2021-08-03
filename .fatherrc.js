export default [
  {
    target: 'node',
    esm: { type: 'babel', importLibToEs: true },
    cjs: { type: 'babel', lazy: true },
    extraBabelPlugins: [
      [
        'babel-plugin-import',
        { libraryName: 'antd', libraryDirectory: 'es', style: true },
        'antd',
      ],
    ],
    disableTypeCheck: true,
  },
];
