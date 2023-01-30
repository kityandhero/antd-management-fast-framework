import { buildConfig as buildConfigCore } from '../../../developConfig/rollup/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.jsx',
  },
  ...{
    'customComponents/ActiveChart/index':
      'src/customComponents/ActiveChart/index.jsx',
    'customComponents/AudioUpload/index':
      'src/customComponents/AudioUpload/index.jsx',
    'customComponents/ArticleListContent/index':
      'src/customComponents/ArticleListContent/index.jsx',
    'customComponents/BaseComponent/index':
      'src/customComponents/BaseComponent/index.jsx',
    'customComponents/Canvas/index': 'src/customComponents/Canvas/index.jsx',
    'customComponents/AvatarList/index':
      'src/customComponents/AvatarList/index.jsx',

    //#region  Charts
    'customComponents/Charts/autoHeight':
      'src/customComponents/Charts/autoHeight.jsx',
    'customComponents/Charts/bizcharts':
      'src/customComponents/Charts/bizcharts.jsx',
    'customComponents/Charts/index': 'src/customComponents/Charts/index.jsx',
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
    //#endregion  Charts

    'customComponents/CenterBox/index':
      'src/customComponents/CenterBox/index.jsx',
    'customComponents/DisplayCopyData/index':
      'src/customComponents/DisplayCopyData/index.js',
    'customComponents/ColorText/index':
      'src/customComponents/ColorText/index.jsx',
    'customComponents/DecorateAvatar/index':
      'src/customComponents/DecorateAvatar/index.jsx',
    'customComponents/EditableItem/index':
      'src/customComponents/EditableItem/index.jsx',
    'customComponents/Editor/TinymceWrapper':
      'src/customComponents/Editor/TinymceWrapper/index.jsx',
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

    //#region  FormCustom
    'customComponents/FormCustom/FormCustomItem/index':
      'src/customComponents/FormCustom/FormCustomItem/index.jsx',
    'customComponents/FormCustom/FormCustomItemChildren/index':
      'src/customComponents/FormCustom/FormCustomItemChildren/index.jsx',
    //#endregion  FormCustom

    'customComponents/FromDisplayItem/index':
      'src/customComponents/FromDisplayItem/index.jsx',
    'customComponents/FunctionComponent/index':
      'src/customComponents/FunctionComponent/index.jsx',
    'customComponents/HelpBox/index': 'src/customComponents/HelpBox/index.jsx',
    'customComponents/HelpCard/index':
      'src/customComponents/HelpCard/index.jsx',
    'customComponents/GlobalFooter/index':
      'src/customComponents/GlobalFooter/index.jsx',
    'customComponents/Icon/index': 'src/customComponents/Icon/index.jsx',
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
    'customComponents/StandardTable/index':
      'src/customComponents/StandardTable/index.jsx',
    'customComponents/AnimalBox/FadeBox/index':
      'src/customComponents/AnimalBox/FadeBox/index.jsx',
    'customComponents/AnimalBox/QueueListBox/index':
      'src/customComponents/AnimalBox/QueueListBox/index.jsx',
    'customComponents/AnimalBox/QueueBox/index':
      'src/customComponents/AnimalBox/QueueBox/index.jsx',
    'customComponents/AnimalBox/RotateBox/index':
      'src/customComponents/AnimalBox/RotateBox/index.jsx',
    // Canvas start
    'customComponents/Canvas/index': 'src/customComponents/Canvas/index.jsx',
    'customComponents/Canvas/Bubbly/index':
      'src/customComponents/Canvas/Bubbly/index.jsx',
    'customComponents/Canvas/Core/index':
      'src/customComponents/Canvas/Core/index.jsx',
    'customComponents/Canvas/Spirit/index':
      'src/customComponents/Canvas/Spirit/index.jsx',
    'customComponents/Canvas/RadarScanning/index':
      'src/customComponents/Canvas/RadarScanning/index.jsx',
    // Canvas end
    'customComponents/FunctionSupplement/Whether/index':
      'src/customComponents/FunctionSupplement/Whether/index.jsx',
    'customComponents/MobileContainor/ContentView/index':
      'src/customComponents/MobileContainor/ContentView/index.jsx',
    'customComponents/MobileContainor/MobileSimulation/index':
      'src/customComponents/MobileContainor/MobileSimulation/index.jsx',
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
