import Authorized, { setAuthority } from './Authorized';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
import Secured from './Secured';

Authorized.Secured = Secured;
Authorized.check = check;
Authorized.setAuthority = setAuthority;
const RenderAuthorize = renderAuthorize(Authorized);

export { setAuthority };

export default RenderAuthorize;
