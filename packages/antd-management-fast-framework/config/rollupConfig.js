const path = require('path');
const fs = require('fs');

import { buildConfig as buildConfigCore } from '../../antd-management-fast-rollup/rollupAssist/configBuilder';

var filePath = path.resolve('./src');

const rootPath = filePath.replace('/', '\\') + '/';

var inputFiles = {};

// console.log({ filePath, rootPath });

function readDirRecur(folder, callback) {
  fs.readdir(folder, function (err, files) {
    var count = 0;
    var checkEnd = function () {
      ++count == files.length && callback();
    };

    files.forEach(function (file) {
      var fullPath = folder + '/' + file;

      fs.stat(fullPath, function (err, stats) {
        if (stats.isDirectory()) {
          return readDirRecur(fullPath, checkEnd);
        } else {
          const p = fullPath.replace(rootPath, '');

          const f = p.split('.');

          if (f.length == 2) {
            if (f[1] == 'js' || f[1] == 'jsx') {
              inputFiles[f[0]] = `src/${p}`;

              // console.log(inputFiles);
            }
          }

          /*not use ignore files*/
          if (file[0] == '.') {
          } else {
            fileList.push(fullPath);
          }
          checkEnd();
        }
      });
    });

    //为空时直接回调
    files.length === 0 && callback();
  });
}

var fileList = [];

// var timeStart = new Date();

readDirRecur(filePath, function (filePath) {
  fileList.push(filePath);
});

// console.log('__dirname : ' + __dirname);
// console.log('resolve   : ' + resolve('./src/utils'));

// let files = fs.readdirSync('./src/utils');

// files.forEach((o) => {
//   const f = o.split('.');

//   inputFiles[`utils/${f[0]}`] = `src/utils/${o}`;
// });

// files = fs.readdirSync('./src/style');

// files.forEach((o) => {
//   const f = o.split('.');

//   inputFiles[`style/${f[0]}`] = `src/style/${o}`;
// });

// files = fs.readdirSync('./src/style');

// files.forEach((o) => {
//   const f = o.split('.');

//   inputFiles[`style/${f[0]}`] = `src/style/${o}`;
// });

// console.log(inputFiles);

const inputFile = {
  ...{
    'utils/actionAssist': 'src/utils/actionAssist.js',
    'utils/appConfiguration': 'src/utils/appConfiguration.js',
    'utils/authority': 'src/utils/authority.js',
    'utils/Authorized': 'src/utils/Authorized.js',
    'utils/cacheAssist': 'src/utils/cacheAssist.js',
    'utils/constants': 'src/utils/constants.js',
    'utils/core': 'src/utils/core.js',
    'utils/defaultSettingsSpecial': 'src/utils/defaultSettingsSpecial.js',
    'utils/developAssist': 'src/utils/developAssist.js',
    'utils/dva': 'src/utils/dva.js',
    'utils/globalModel': 'src/utils/globalModel.js',
    'utils/globalStorageAssist': 'src/utils/globalStorageAssist.js',
    'utils/localStorageAssist': 'src/utils/localStorageAssist.js',
    'utils/mediaDefault': 'src/utils/mediaDefault.js',
    'utils/proLayoutCollection': 'src/utils/proLayoutCollection.jsx',
    'utils/request': 'src/utils/request.js',
    'utils/requestAssistor': 'src/utils/requestAssistor.js',
    'utils/sessionStorageAssist': 'src/utils/sessionStorageAssist.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/typeCheck': 'src/utils/typeCheck.js',
    'utils/typeConvert': 'src/utils/typeConvert.js',
    'utils/utils': 'src/utils/utils.js',
    'utils/virtualRequest': 'src/utils/virtualRequest.js',
    'utils/Yuan': 'src/utils/Yuan.js',
    // 'style/bezierEasing': 'src/style/bezierEasing.less',
    // 'style/colorPalette': 'src/style/colorPalette.less',
    // 'style/tinyColor': 'src/style/tinyColor.less',
    // 'style/utils': 'src/style/utils.less',
    // 'style/variable': 'src/style/variable.less',
    'configGroup/configGeneral': 'src/configGroup/configGeneral.js',
    'configGroup/themeCollection': 'src/configGroup/themeCollection.js',
    'configGroup/webpackPlugin': 'src/configGroup/webpackPlugin.js',
    'framework/index': 'src/framework/index.js',
    'customComponents/index': 'src/customComponents/index.js',
    'framework/AuthorizationWrapper/index':
      'src/framework/AuthorizationWrapper/index.jsx',
    'framework/Common/index': 'src/framework/Common/index.jsx',
    'framework/Base/index': 'src/framework/Base/index.jsx',
    'framework/CustomBase/index': 'src/framework/CustomBase/index.jsx',
    'framework/Core/index': 'src/framework/Core/index.jsx',
    'framework/DataMenuContainer/index':
      'src/framework/DataMenuContainer/index.jsx',
    'framework/DataTabContainer/index':
      'src/framework/DataTabContainer/index.jsx',
    'framework/Wrapper/index': 'src/framework/Wrapper/index.jsx',
    'customComponents/AMap/UIPoiPicker':
      'src/customComponents/AMap/UIPoiPicker.js',
    'customComponents/AMap/UIPositionPicker':
      'src/customComponents/AMap/UIPositionPicker.js',
    'customComponents/ActiveChart/index':
      'src/customComponents/ActiveChart/index.jsx',
    'customComponents/AudioUpload/index':
      'src/customComponents/AudioUpload/index.jsx',
    'customComponents/ArticleListContent/index':
      'src/customComponents/ArticleListContent/index.jsx',
    'customComponents/Canvas/index': 'src/customComponents/Canvas/index.jsx',
    'customComponents/AvatarList/index':
      'src/customComponents/AvatarList/index.jsx',
    'customComponents/Authorized/Authorized':
      'src/customComponents/Authorized/Authorized.jsx',
    'customComponents/Authorized/AuthorizedRoute':
      'src/customComponents/Authorized/AuthorizedRoute.jsx',
    'customComponents/Authorized/index':
      'src/customComponents/Authorized/index.jsx',
    'customComponents/Authorized/PromiseRender':
      'src/customComponents/Authorized/PromiseRender.jsx',
    'customComponents/Authorized/CheckPermissions':
      'src/customComponents/Authorized/CheckPermissions.jsx',
    'customComponents/Authorized/renderAuthorize':
      'src/customComponents/Authorized/renderAuthorize.js',
    'customComponents/Authorized/Secured':
      'src/customComponents/Authorized/Secured.jsx',
    'customComponents/Charts/autoHeight':
      'src/customComponents/Charts/autoHeight.jsx',
    'customComponents/Charts/bizcharts':
      'src/customComponents/Charts/bizcharts.jsx',
    'customComponents/Charts/index': 'src/customComponents/Charts/index.jsx',
    'customComponents/CenterBox/index':
      'src/customComponents/CenterBox/index.jsx',
    'customComponents/DataPreviewDrawer/index':
      'src/customComponents/DataPreviewDrawer/index.jsx',
    'customComponents/Countdown/index':
      'src/customComponents/Countdown/index.jsx',
    'customComponents/DisplayCopyData/index':
      'src/customComponents/DisplayCopyData/index.js',
    'customComponents/ColorText/index':
      'src/customComponents/ColorText/index.jsx',
    'customComponents/DecorateAvatar/index':
      'src/customComponents/DecorateAvatar/index.jsx',
    'customComponents/EditableItem/index':
      'src/customComponents/EditableItem/index.jsx',
    'customComponents/EllipsisCustom/index':
      'src/customComponents/EllipsisCustom/index.jsx',
    'customComponents/Ellipsis/index':
      'src/customComponents/Ellipsis/index.jsx',
    'customComponents/EditableLinkGroup/index':
      'src/customComponents/EditableLinkGroup/index.jsx',
    'customComponents/EverySpace/index':
      'src/customComponents/EverySpace/index.jsx',
    'customComponents/Exception/index':
      'src/customComponents/Exception/index.jsx',
    'customComponents/FileUpload/index':
      'src/customComponents/FileUpload/index.jsx',
    'customComponents/Exception/typeConfig':
      'src/customComponents/Exception/typeConfig.js',
    'customComponents/FigureRange/index':
      'src/customComponents/FigureRange/index.jsx',
    'customComponents/FlexBox/index': 'src/customComponents/FlexBox/index.jsx',
    'customComponents/FileBase64Upload/index':
      'src/customComponents/FileBase64Upload/index.jsx',
    'customComponents/FlexText/index':
      'src/customComponents/FlexText/index.jsx',
    'customComponents/FooterToolbar/index':
      'src/customComponents/FooterToolbar/index.jsx',
    'customComponents/FromDisplayItem/index':
      'src/customComponents/FromDisplayItem/index.jsx',
    'customComponents/FunctionComponent/index':
      'src/customComponents/FunctionComponent/index.jsx',
    'customComponents/HelpBox/index': 'src/customComponents/HelpBox/index.jsx',
    'customComponents/HelpCard/index':
      'src/customComponents/HelpCard/index.jsx',
    'customComponents/GlobalFooter/index':
      'src/customComponents/GlobalFooter/index.jsx',
    'customComponents/IconFont/index': 'src/customComponents/IconFont/index.js',
    'customComponents/IconInfo/index':
      'src/customComponents/IconInfo/index.jsx',
    'customComponents/ImageBox/index':
      'src/customComponents/ImageBox/index.jsx',
    'customComponents/HtmlBox/index': 'src/customComponents/HtmlBox/index.jsx',
    'customComponents/ImageUpload/index':
      'src/customComponents/ImageUpload/index.jsx',
    'customComponents/NoticeIconCustom/index':
      'src/customComponents/NoticeIconCustom/index.jsx',
    'customComponents/ImageContentPreview/index':
      'src/customComponents/ImageContentPreview/index.jsx',
    'customComponents/NoticeIconCustom/NoticeList':
      'src/customComponents/NoticeIconCustom/NoticeList.js',
    'customComponents/NumberInfo/index':
      'src/customComponents/NumberInfo/index.jsx',
    'customComponents/PageLoading/index':
      'src/customComponents/PageLoading/index.jsx',
    'customComponents/PercentageBox/index':
      'src/customComponents/PercentageBox/index.jsx',
    'customComponents/PriceBox/index':
      'src/customComponents/PriceBox/index.jsx',
    'customComponents/StandardFormRow/index':
      'src/customComponents/StandardFormRow/index.jsx',
    'customComponents/Result/index': 'src/customComponents/Result/index.jsx',
    'customComponents/StandardTableCustom/index':
      'src/customComponents/StandardTableCustom/index.jsx',
    'customComponents/StatusBar/index':
      'src/customComponents/StatusBar/index.jsx',
    'customComponents/TagSelect/index':
      'src/customComponents/TagSelect/index.jsx',
    'customComponents/TimeLineCustom/index':
      'src/customComponents/TimeLineCustom/index.jsx',
    'customComponents/Trend/index': 'src/customComponents/Trend/index.jsx',
    'customComponents/VerticalBox/index':
      'src/customComponents/VerticalBox/index.jsx',
    'customComponents/VideoUpload/index':
      'src/customComponents/VideoUpload/index.jsx',
    'customComponents/_utils/pathTools':
      'src/customComponents/_utils/pathTools.js',
    'customComponents/StandardTable/index':
      'src/customComponents/StandardTable/index.jsx',
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
    'customComponents/AnimalBox/FadeBox/index':
      'src/customComponents/AnimalBox/FadeBox/index.jsx',
    'customComponents/AnimalBox/QueueListBox/index':
      'src/customComponents/AnimalBox/QueueListBox/index.jsx',
    'customComponents/AnimalBox/QueueBox/index':
      'src/customComponents/AnimalBox/QueueBox/index.jsx',
    'customComponents/AnimalBox/RotateBox/index':
      'src/customComponents/AnimalBox/RotateBox/index.jsx',
    'customComponents/Canvas/Bubbly/index':
      'src/customComponents/Canvas/Bubbly/index.jsx',
    'customComponents/Canvas/Core/index':
      'src/customComponents/Canvas/Core/index.jsx',
    'customComponents/Canvas/Spirit/index':
      'src/customComponents/Canvas/Spirit/index.jsx',
    'customComponents/Canvas/RadarScanning/index':
      'src/customComponents/Canvas/RadarScanning/index.jsx',
    'customComponents/Charts/Bar/index':
      'src/customComponents/Charts/Bar/index.jsx',
    'customComponents/Charts/ChartCard/index':
      'src/customComponents/Charts/ChartCard/index.jsx',
    'customComponents/Charts/Field/index':
      'src/customComponents/Charts/Field/index.jsx',
    'customComponents/Charts/Gauge/index':
      'src/customComponents/Charts/Gauge/index.jsx',
    'customComponents/Charts/MiniArea/index':
      'src/customComponents/Charts/MiniArea/index.jsx',
    'customComponents/Charts/MiniBar/index':
      'src/customComponents/Charts/MiniBar/index.jsx',
    'customComponents/Charts/MiniProgress/index':
      'src/customComponents/Charts/MiniProgress/index.jsx',
    'customComponents/Charts/Pie/index':
      'src/customComponents/Charts/Pie/index.jsx',
    'customComponents/Charts/TagCloud/index':
      'src/customComponents/Charts/TagCloud/index.jsx',
    'customComponents/Charts/TimelineChart/index':
      'src/customComponents/Charts/TimelineChart/index.jsx',
    'customComponents/Charts/WaterWave/index':
      'src/customComponents/Charts/WaterWave/index.jsx',
    'customComponents/Editor/TinymceWrapper/index':
      'src/customComponents/Editor/TinymceWrapper/index.jsx',
    'customComponents/FunctionSupplement/Whether/index':
      'src/customComponents/FunctionSupplement/Whether/index.jsx',
    'customComponents/MobileContainor/ContentView/index':
      'src/customComponents/MobileContainor/ContentView/index.jsx',
    'customComponents/MobileContainor/MobileHtmlPreviewBox/index':
      'src/customComponents/MobileContainor/MobileHtmlPreviewBox/index.jsx',
    'customComponents/MobileContainor/MobilePreviewDrawer/index':
      'src/customComponents/MobileContainor/MobilePreviewDrawer/index.jsx',
    'customComponents/MobileContainor/MobileSimulation/index':
      'src/customComponents/MobileContainor/MobileSimulation/index.jsx',
    'customComponents/MobileContainor/MobilePreviewArea/index':
      'src/customComponents/MobileContainor/MobilePreviewArea/index.jsx',
    'framework/ButtonExtension/SelectButton/Base/index':
      'src/framework/ButtonExtension/SelectButton/Base/index.jsx',
    'framework/ButtonExtension/SelectButton/InteractiveBase/index':
      'src/framework/ButtonExtension/SelectButton/InteractiveBase/index.jsx',
    'framework/FieldExtension/SelectFieldDrawer/SelectFieldDrawerBase/index':
      'src/framework/FieldExtension/SelectFieldDrawer/SelectFieldDrawerBase/index.jsx',
    'framework/FieldExtension/SelectFieldDrawer/SelectFieldBase/index':
      'src/framework/FieldExtension/SelectFieldDrawer/SelectFieldBase/index.jsx',
    'customComponents/MobileContainor/Devices/GalaxyNote8/index':
      'src/customComponents/MobileContainor/Devices/GalaxyNote8/index.jsx',
    'customComponents/MobileContainor/Devices/IPhone5S/index':
      'src/customComponents/MobileContainor/Devices/IPhone5S/index.jsx',
    'customComponents/MobileContainor/Devices/Iphone8/index':
      'src/customComponents/MobileContainor/Devices/Iphone8/index.jsx',
    'customComponents/MobileContainor/Devices/Iphone8plus/index':
      'src/customComponents/MobileContainor/Devices/Iphone8plus/index.jsx',
    'customComponents/MobileContainor/Devices/RoughSketch/index':
      'src/customComponents/MobileContainor/Devices/RoughSketch/index.jsx',
    'customComponents/MobileContainor/Devices/IphoneX/index':
      'src/customComponents/MobileContainor/Devices/IphoneX/index.jsx',
  },
  // ...{
  //   'customComponents/index': 'src/customComponents/index.jsx',
  // },
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
