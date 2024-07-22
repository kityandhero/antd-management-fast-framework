import { buildModel as buildApplicationSourceModel } from './applicationSource';
import { buildModel as buildCurrentAccountModel } from './currentAccount';

export function listModelBuilder() {
  const list = [];

  list.push(buildApplicationSourceModel, buildCurrentAccountModel);

  return list;
}
