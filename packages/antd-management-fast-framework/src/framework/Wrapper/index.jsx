import Common from '../../framework/Common';
import { getDerivedStateFromPropsForUrlParams } from '../../utils/tools';

class Wrapper extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Wrapper;
