export default [
  {
    target: 'node',
    cjs: { type: 'rollup' },
    disableTypeCheck: true,
    extraBabelPlugins: [
      [
        'babel-plugin-import',
        { libraryName: 'antd', libraryDirectory: 'es', style: true },
        'antd',
      ],
    ],
    target: 'node',
  },
];
