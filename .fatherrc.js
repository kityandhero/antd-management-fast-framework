export default [
  {
    target: 'node',
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
