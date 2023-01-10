import { buildConfig as buildConfigCore } from '../../antd-management-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.jsx',
  },
  ...{
    'customComponents/ComponentBase/index':
      'src/customComponents/ComponentBase/index.jsx',
  },
  ...{
    'utils/actionAssist': 'src/utils/actionAssist.js',
    'utils/appConfiguration': 'src/utils/appConfiguration.js',
    'utils/authority': 'src/utils/authority.js',
    'utils/cacheAssist': 'src/utils/cacheAssist.js',
    'utils/constants': 'src/utils/constants.js',
    'utils/core': 'src/utils/core.js',
    'utils/dynamicSetting': 'src/utils/dynamicSetting.js',
    'utils/developAssist': 'src/utils/developAssist.js',
    'utils/dva': 'src/utils/dva.js',
    'utils/globalModel': 'src/utils/globalModel.js',
    'utils/globalStorageAssist': 'src/utils/globalStorageAssist.js',
    'utils/localStorageAssist': 'src/utils/localStorageAssist.js',
    'utils/log': 'src/utils/log.js',
    'utils/mediaDefault': 'src/utils/mediaDefault.js',
    'utils/proLayoutCollection': 'src/utils/proLayoutCollection.jsx',
    'utils/request': 'src/utils/request.js',
    'utils/requestAssistor': 'src/utils/requestAssistor.js',
    'utils/sessionStorageAssist': 'src/utils/sessionStorageAssist.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/typeCheck': 'src/utils/typeCheck.js',
    'utils/typeConvert': 'src/utils/typeConvert.js',
    'utils/virtualRequest': 'src/utils/virtualRequest.js',
    'utils/routeAssist': 'src/utils/routeAssist.js',
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
