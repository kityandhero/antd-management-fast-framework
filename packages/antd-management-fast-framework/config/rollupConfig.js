import { buildConfig as buildConfigCore } from '../../antd-management-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    'configGroup/configGeneral': 'src/configGroup/configGeneral.js',
    'configGroup/themeCollection': 'src/configGroup/themeCollection.js',
    'configGroup/webpackPlugin': 'src/configGroup/webpackPlugin.js',
  },
  ...{
    'customComponents/DataPreviewDrawer/index':
      'src/customComponents/DataPreviewDrawer/index.jsx',
    'customComponents/MobileContainor/MobilePreviewArea/index':
      'src/customComponents/MobileContainor/MobilePreviewArea/index.jsx',
    'customComponents/MobileContainor/MobilePreviewDrawer/index':
      'src/customComponents/MobileContainor/MobilePreviewDrawer/index.jsx',
    'customComponents/Bootstrap/index':
      'src/customComponents/Bootstrap/index.jsx',
  },
  ...{
    'framework/AuthorizationWrapper/index':
      'src/framework/AuthorizationWrapper/index.jsx',
    'framework/Common/index': 'src/framework/Common/index.jsx',
    'framework/Core/index': 'src/framework/Core/index.jsx',
    'framework/DataMenuContainer/index':
      'src/framework/DataMenuContainer/index.jsx',
    'framework/DataTabContainer/index':
      'src/framework/DataTabContainer/index.jsx',
    'framework/Wrapper/index': 'src/framework/Wrapper/index.jsx',
    'framework/CustomWrapper/SupplementWrapper/index':
      'src/framework/CustomWrapper/SupplementWrapper/index.jsx',
    'framework/CustomWrapper/SupplementCore/index':
      'src/framework/CustomWrapper/SupplementCore/index.jsx',
    'framework/CustomWrapper/Supplement/index':
      'src/framework/CustomWrapper/Supplement/index.jsx',
    'framework/DataDrawer/Base/index':
      'src/framework/DataDrawer/Base/index.jsx',
    'framework/DataDrawer/BaseAddDrawer/index':
      'src/framework/DataDrawer/BaseAddDrawer/index.jsx',
    'framework/DataDrawer/BaseNeedlessLoadDrawer/index':
      'src/framework/DataDrawer/BaseNeedlessLoadDrawer/index.jsx',
    'framework/DataDrawer/BaseLoadDrawer/index':
      'src/framework/DataDrawer/BaseLoadDrawer/index.jsx',
    'framework/DataDrawer/BaseSaveDrawer/index':
      'src/framework/DataDrawer/BaseSaveDrawer/index.jsx',
    'framework/DataDrawer/BaseUpdateDrawer/index':
      'src/framework/DataDrawer/BaseUpdateDrawer/index.jsx',
    'framework/DataListView/BatchAction/index':
      'src/framework/DataListView/BatchAction/index.jsx',
    'framework/DataListView/DensityAction/index':
      'src/framework/DataListView/DensityAction/index.jsx',
    'framework/DataListView/ColumnSetting/DndItem':
      'src/framework/DataListView/ColumnSetting/DndItem.jsx',
    'framework/DataListView/ColumnSetting/index':
      'src/framework/DataListView/ColumnSetting/index.jsx',
    'framework/DataListView/Base/index':
      'src/framework/DataListView/Base/index.jsx',
    'framework/DataForm/BaseAddForm/index':
      'src/framework/DataForm/BaseAddForm/index.jsx',
    'framework/DataForm/BaseUpdateForm/index':
      'src/framework/DataForm/BaseUpdateForm/index.jsx',
    'framework/DataForm/BaseUpdateFormContent/index':
      'src/framework/DataForm/BaseUpdateFormContent/index.jsx',
    'framework/DataForm/BaseUpdateFormTab/index':
      'src/framework/DataForm/BaseUpdateFormTab/index.jsx',
    'framework/DataModal/Base/index': 'src/framework/DataModal/Base/index.jsx',
    'framework/DataModal/BaseAddModal/index':
      'src/framework/DataModal/BaseAddModal/index.jsx',
    'framework/DataModal/BaseSelectModal/index':
      'src/framework/DataModal/BaseSelectModal/index.jsx',
    'framework/DataModal/BaseLoadModal/index':
      'src/framework/DataModal/BaseLoadModal/index.jsx',
    'framework/DataModal/BaseNeedlessLoadModal/index':
      'src/framework/DataModal/BaseNeedlessLoadModal/index.jsx',
    'framework/DataModal/BaseUpdateModal/index':
      'src/framework/DataModal/BaseUpdateModal/index.jsx',
    'framework/DataModal/BaseUpdateTransferModal/index':
      'src/framework/DataModal/BaseUpdateTransferModal/index.jsx',
    'framework/DataMultiPageView/InnerMultiPage/index':
      'src/framework/DataMultiPageView/InnerMultiPage/index.jsx',
    'framework/DataMultiPageView/MultiPage/index':
      'src/framework/DataMultiPageView/MultiPage/index.jsx',
    'framework/DataMultiPageView/MultiPageDrawer/index':
      'src/framework/DataMultiPageView/MultiPageDrawer/index.jsx',
    'framework/DataMultiPageView/MultiPageSelectDrawer/index':
      'src/framework/DataMultiPageView/MultiPageSelectDrawer/index.jsx',
    'framework/DataOperation/BaseView/index':
      'src/framework/DataOperation/BaseView/index.jsx',
    'framework/DataOperation/BaseWindow/index':
      'src/framework/DataOperation/BaseWindow/index.jsx',
    'framework/DataOperation/Base/index':
      'src/framework/DataOperation/Base/index.jsx',
    'framework/DataSinglePageView/SinglePage/index':
      'src/framework/DataSinglePageView/SinglePage/index.jsx',
    'framework/DataSinglePageView/SinglePageDrawer/index':
      'src/framework/DataSinglePageView/SinglePageDrawer/index.jsx',
    'framework/DataSinglePageView/InnerSinglePage/index':
      'src/framework/DataSinglePageView/InnerSinglePage/index.jsx',
    'framework/DataSinglePageView/SinglePageSelectDrawer/index':
      'src/framework/DataSinglePageView/SinglePageSelectDrawer/index.jsx',
    'framework/DataSingleView/DataCore/index':
      'src/framework/DataSingleView/DataCore/index.jsx',
    'framework/DataSingleView/DataLoad/index':
      'src/framework/DataSingleView/DataLoad/index.jsx',
    'framework/ButtonExtension/SelectButton/Base/index':
      'src/framework/ButtonExtension/SelectButton/Base/index.jsx',
    'framework/ButtonExtension/SelectButton/InteractiveBase/index':
      'src/framework/ButtonExtension/SelectButton/InteractiveBase/index.jsx',
    'framework/FieldExtension/SelectFieldDrawer/SelectFieldDrawerBase/index':
      'src/framework/FieldExtension/SelectFieldDrawer/SelectFieldDrawerBase/index.jsx',
    'framework/FieldExtension/SelectFieldDrawer/SelectFieldBase/index':
      'src/framework/FieldExtension/SelectFieldDrawer/SelectFieldBase/index.jsx',
  },
  ...{
    'models/schedulingControl': 'src/models/schedulingControl.js',
  },
  ...{
    'services/schedulingControl': 'src/services/schedulingControl.js',
  },
  ...{
    'utils/metaDataAssist': 'src/utils/metaDataAssist.js',
    'utils/storageAssist': 'src/utils/storageAssist.js',
    'utils/bootstrap': 'src/utils/bootstrap.js',
    'utils/settingAssist': 'src/utils/settingAssist.js',
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
