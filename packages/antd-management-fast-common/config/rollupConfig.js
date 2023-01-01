import { buildConfig as buildConfigCore } from '../../antd-management-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    'utils/appConfiguration': 'src/utils/appConfiguration.js',
    'utils/cacheAssist': 'src/utils/cacheAssist.js',
    'utils/constants': 'src/utils/constants.js',
    'utils/core': 'src/utils/core.js',
    'utils/defaultSettingsSpecial': 'src/utils/defaultSettingsSpecial.js',
    'utils/developAssist': 'src/utils/developAssist.js',
    'utils/globalModel': 'src/utils/globalModel.js',
    'utils/globalStorageAssist': 'src/utils/globalStorageAssist.js',
    'utils/localStorageAssist': 'src/utils/localStorageAssist.js',
    'utils/mediaDefault': 'src/utils/mediaDefault.js',
    'utils/sessionStorageAssist': 'src/utils/sessionStorageAssist.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/typeCheck': 'src/utils/typeCheck.js',
    'utils/typeConvert': 'src/utils/typeConvert.js',
    'utils/authority': 'src/utils/authority.js',
    'utils/requestAssistor': 'src/utils/requestAssistor.js',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({ inputFile, terser: whetherTerser });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
