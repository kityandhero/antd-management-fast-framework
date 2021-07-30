export default [
  {
    target: 'node',
    cjs: { type: 'rollup' },
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
