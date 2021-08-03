import { getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';

import Common from '../../../framework/Common';
// import Supplement from '@/customSpecialComponents/Supplement';

class SupplementWrapper extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default SupplementWrapper;
