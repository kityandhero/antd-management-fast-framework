import { getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import Supplement from '../Supplement';

class SupplementWrapper extends Supplement {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default SupplementWrapper;
