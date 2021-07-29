import { getDerivedStateFromPropsForUrlParams } from '../../utils/tools';
import Common from '../../framework/Common';

class Wrapper extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Wrapper;
