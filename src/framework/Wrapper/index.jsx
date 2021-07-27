import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import Supplement from '@/customSpecialComponents/Supplement';

class Wrapper extends Supplement {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Wrapper;
