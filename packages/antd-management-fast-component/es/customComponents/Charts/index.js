import numeral from 'numeral';
import Bar from './Bar/index.js';
import ChartCard from './ChartCard/index.js';
import Field from './Field/index.js';
import Gauge from './Gauge/index.js';
import MiniArea from './MiniArea/index.js';
import MiniBar from './MiniBar/index.js';
import MiniProgress from './MiniProgress/index.js';
import Pie from './Pie/index.js';
import TagCloud from './TagCloud/index.js';
import TimelineChart from './TimelineChart/index.js';
import WaterWave from './WaterWave/index.js';
import '../../getPrototypeOf.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import 'bizcharts';
import 'react';
import '../../index.js';
import '../../extends.js';
import '../../objectWithoutProperties.js';
import '../../defineProperty.js';
import 'antd';
import 'classnames';
import './autoHeight.js';
import '../../objectSpread2.js';
import '../../slicedToArray.js';
import '../../unsupportedIterableToArray.js';
import 'lodash';
import '@antv/data-set';
import '../../toConsumableArray.js';

var yuan = function yuan(val) {
  return "\xA5 ".concat(numeral(val).format('0,0'));
};
var Charts = {
  yuan: yuan,
  Bar: Bar,
  Pie: Pie,
  Gauge: Gauge,
  MiniBar: MiniBar,
  MiniArea: MiniArea,
  MiniProgress: MiniProgress,
  ChartCard: ChartCard,
  Field: Field,
  WaterWave: WaterWave,
  TagCloud: TagCloud,
  TimelineChart: TimelineChart
};

export { Bar, ChartCard, Field, Gauge, MiniArea, MiniBar, MiniProgress, Pie, TagCloud, TimelineChart, WaterWave, Charts as default, yuan };
