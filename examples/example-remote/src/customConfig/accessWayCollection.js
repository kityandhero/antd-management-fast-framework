import { accessWayCustomCollection } from './custom/accessWayCollection';
import { accessWayInfrastructureCollection } from './general/accessWayCollection';

export const accessWayCollection = {
  ...accessWayInfrastructureCollection,
  ...accessWayCustomCollection,
};
