import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common/es/utils/tools';

import SupplementCore from '../SupplementCore';

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
