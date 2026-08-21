/**
generate by easy-soft-develop
*/

export default {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-pnpm-scopes',
  ],
  parserPreset: 'conventional-changelog-conventionalcommits',
  prompt: {
    useEmoji: true,
    customScopesAlias: '以上都不是？我要自定义',
    emptyScopesAlias: '跳过',
    emptyIssuePrefixAlias: '跳过',
    customIssuePrefixAlias: '自定义前缀',
    messages: {
      type: '择要提交的更改类型:',
      scope: '此更改的范围是什么(例如:组件或文件名):',
      customScope: '此更改的范围是什么(例如:组件或文件名):',
      subject: '用简短的祈使语句描述变化:',
      body: '对变更提供更详细的描述, "|" 为多行间隔符 (可空):',
      breaking: '有什么破坏性的变化吗, "|" 为多行间隔符 (可空):',
      footerPrefixesSelect: '通过下列选择变更列表的ISSUES类型 (可空):',
      customFooterPrefix: '输入 ISSUES 前缀:',
      footer: '列出此更改引起的任何 ISSUES. 例如: #31, #34:',
      generatingByAI: '通过AI生成你提交主题...',
      generatedSelectByAI: '通过AI生成合适的主题:',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨  含有新功能', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  Bug修复', emoji: ':bug:' },
      {
        value: 'docs',
        name: 'docs:     📝  仅文档更改',
        emoji: ':memo:',
      },
      {
        value: 'style',
        name: 'style:    💄  不影响代码含义的更改',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️  既不修复错误也不增加功能的代码更改',
        emoji: ':recycle:',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️ 改进性能的代码更改',
        emoji: ':zap:',
      },
      {
        value: 'test',
        name: 'test:     ✅  添加缺失的测试或更正现有的测试',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️ 影响构建系统或外部依赖的更改',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       🎡  对CI配置文件和脚本的更改',
        emoji: ':ferris_wheel:',
      },
      {
        value: 'chore',
        name: 'chore:    🔨  其他不修改src或测试文件的更改',
        emoji: ':hammer:',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️ 恢复之前的提交',
        emoji: ':rewind:',
      },
    ],
    issuePrefixes: [
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
    ],
  },
};
