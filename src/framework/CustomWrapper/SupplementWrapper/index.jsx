import { getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import Common from '../../Common';

class SupplementWrapper extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default SupplementWrapper;
