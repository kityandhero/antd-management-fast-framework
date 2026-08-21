/**
generate by easy-soft-develop
*/

import semver from 'semver';

import { config as configCustom } from './custom.mjs';
import { config as configEmbed } from './embed.mjs';

// 辅助函数：清理版本号，去除 ^ 或 ~ 等前缀
function cleanVersion(version) {
  if (typeof version !== 'string') return version;
  // 移除开头的 ^、~、=、v 等字符
  return version.replace(/^[~^=v]/, '');
}

export const config = {
  // 自动更新 package.json 等价于 -u
  upgrade: false,

  // 默认升级策略 latest, 允许 major 升级
  target: 'latest',

  // 交互模式下分组显示，更清晰
  format: 'group',

  // 是否检查深层依赖, 默认 false
  deep: false,

  // 是否静默输出, 默认 false
  silent: false,

  // reject: 这些包完全不升级
  reject: [...configEmbed.reject, ...configCustom.reject],

  // filterResults: 对每个可升级的包进行精细决策（返回 true 保留, false 丢弃）
  filterResults: (packageName, { currentVersion, upgradedVersion }) => {
    // 使用清理后的版本号进行比较
    const current = cleanVersion(currentVersion);
    const upgraded = cleanVersion(upgradedVersion);

    // 定义分组策略（按包名精确匹配，也支持正则前缀）
    const strategies = {
      // 只允许补丁升级（例如 bug 修复）
      patchOnly: [...configEmbed.patch, ...configCustom.patch],
      // 只允许小版本升级（例如新特性，无破坏性）
      minorOnly: [...configEmbed.minor, ...configCustom.minor],
    };

    // 策略判断：看是否在 patchOnly 列表
    if (
      strategies.patchOnly.includes(packageName) ||
      strategies.patchOnly.some(
        (pattern) => pattern.test?.(packageName) || false,
      )
    ) {
      const diff = semver.diff(current, upgraded);
      return diff === 'patch';
    }

    // 看是否在 minorOnly 列表
    if (
      strategies.minorOnly.includes(packageName) ||
      strategies.minorOnly.some(
        (pattern) => pattern.test?.(packageName) || false,
      )
    ) {
      const diff = semver.diff(current, upgraded);

      // 允许 patch 和 minor, 拒绝 major
      return diff === 'patch' || diff === 'minor';
    }

    // 不自动升级到预发布版
    // 只有当升级版本不是预发布版本时才保留
    if (semver.prerelease(upgraded) !== null) {
      return false;
    }

    // 对于未匹配的包，保留所有符合条件的升级
    return true;
  },
};
