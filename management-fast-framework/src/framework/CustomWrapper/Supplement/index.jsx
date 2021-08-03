import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  isUndefined,
  isNull,
} from '../../../utils/tools';
import { unlimitedWithStringFlag } from '../../../utils/constants';

import SupplementCore from '../SupplementCore';

const unknownLabel = '未知';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 *
 * @class Index
 * @extends {Common}
 */
class Supplement extends SupplementCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Supplement;
